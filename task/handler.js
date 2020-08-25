const { log, progress, cleanScreen, fn } = require('yyl-print')
const { cost } = fn
const { envStringify } = require('yyl-util')
const { getYarnVersion } = require('yyl-os')
const { Runner } = require('yyl-server')
const Hander = require('yyl-hander')
const extFs = require('yyl-fs')
const Lang = require('../lang/index')
const pkg = require('../package.json')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

log.lite()

const yh = new Hander({
  log: function (type, status, args) {
    switch (type) {
    case 'msg':
      if (log[status]) {
        log[status](args)
      } else {
        log.info(args)
      }
      break

    default:
      break
    }
  },
  vars: {
    PROJECT_PATH: process.cwd()
  }
})

function printHeader ({ env, type }) {
  log.info(`yyl-requirejs ${chalk.yellow(pkg.version)}`)
  log.cmd(`yyl-requirejs ${type} ${envStringify(env)}`)
}

async function parseConfig ({ env }) {
  env.workflow = 'gulp-requirejs'
  let configPath = ''
  if (env.config) {
    configPath = path.resolve(process.cwd(), env.config)
    if (!fs.existsSync(configPath)) {
      throw new Error(Lang.Handler.CONFIG_NOT_EXSITS)
    }
  } else {
    configPath = path.resolve(process.cwd(), 'yyl.config.js')
    if (!fs.existsSync(configPath)) {
      configPath = path.resolve(process.cwd(), 'config.js')
    }
  }
  return {
    config: await yh.parseConfig(configPath, env),
    root: path.dirname(configPath)
  }
}

module.exports.optimize = async function ({ env, type }) {
  printHeader({ env, type })
  cost.start()

  // 加载 seed
  progress.start(Lang.Handler.LOAD_SEED_START)
  const seed = require('yyl-seed-gulp-requirejs')
  progress.finished(Lang.Handler.LOAD_SEED_FINISHED)

  // 解析 config
  progress.start(Lang.Handler.PARSE_CONFIG_START)
  let yylConfig = {}
  let root = process.cwd()
  try {
    let configObj = await parseConfig({ env })
    yylConfig = configObj.config
    root = configObj.root
    progress.finished(Lang.Handler.PARSE_CONFIG_FINSHED)
  } catch (er) {
    progress.error(`${Lang.Handler.PARSE_CONFIG_FAIL}: ${er}`)
    throw er
  }

  // TODO: 版本检查 ?

  // yh 初始化
  yh.setVars({ PROJECT_PATH: root })
  yh.optimize.init({ config: yylConfig, iEnv: env })

  // 配置中的 插件初始化
  if (yylConfig.plugins) {
    progress.start(Lang.Handler.INIT_PLUGIN_START)
    try {
      await yh.optimize.initPlugins()
    } catch (er) {
      progress.error(`${Lang.Handler.INIT_PLUGIN_FAIL}: ${er.message}`)
      throw er
    }
  }
  
  // yarn 安装检查
  if (yylConfig.yarn) {
    progress.start(Lang.Handler.CHECK_YARN)
    const yarnVersion = await getYarnVersion()
    if (yarnVersion) {
      progress.finished(`${Lang.Handler.YARN_VERSION}: ${chalk.green(yarnVersion)}`)
    } else {
      progress.error(Lang.Handler.INSTALL_YARN)
      throw new Error(`${Lang.Handler.INSTALL_YARN}: ${chalk.yellow('npm i yarn -g')}`)
    }
  }

  // 清空 输出目录
  progress.start(Lang.Handler.CLEAN_DEST_START)
  const delFiles = await extFs.removeFiles(yylConfig.alias.destRoot)
  delFiles.forEach((filePath) => {
    progress.log(filePath)
  })
  const delFiles2 = await extFs.removeFiles(yylConfig.resource)
  delFiles2.forEach((filePath) => {
    progress.log(filePath)
  })
  progress.finished(`${Lang.Handler.CLEAN_DEST_FINISHED}: ${delFiles.length + delFiles2.length}`)

  // optimize
  progress.start(Lang.Handler.OPTIMIZE_START)
  const IS_WATCH = type === 'watch'
  const curMsg = {
    success: [],
    warn: [],
    error: []
  }

  const opzer = await seed.optimize({
    config: yylConfig,
    iEnv: env,
    ctx: type,
    root
  })

  if (IS_WATCH) {
    const htmlSet = new Set()
    const runner = new Runner({
      config: yylConfig,
      env,
      log(type, argu) {
        progress.log(type, ...argu)
        if (type === 'warn') {
          curMsg.warn.push(argu)
        } else if (type === 'success') {
          curMsg.success.push(argu)
        } else if (type === 'error') {
          curMsg.error.push(argu)
        }
      },
      cwd: root
    })
    try {
      await runner.start()
    } catch (er) {
      progress.error(er.message)
      throw er
    }
    await new Promise((next) => {
      let isUpdate = false
      opzer.watch(env)
        .on('clear', () => {
          if (env.logLevel !== 2) {
            cleanScreen()
          }
          cost.start()
          progress.start(Lang.Handler.OPTIMIZE_START)
        })
        .on('msg', (type, ...argv) => {
          progress.log(type, ...argv)
          if (type === 'warn') {
            curMsg.warn.push(argv)
          } else if (type === 'success') {
            curMsg.success.push(argv)
          } else if (type === 'error') {
            curMsg.error.push(argv)
          }
          if (['create', 'update'].indexOf(type) !== -1) {
            if (/\.html$/.test(argv[0])) {
              htmlSet.add(argv[0])
            }
          }
        })
        .on('finished', async() => {
          cost.end()
          if (!isUpdate) {
            if (!env.silent) {
              yh.optimize.openHomePage()
            }
          }

          if (curMsg.error.length) {
            progress.error(`${Lang.Handler.OPTIMIZE_FAIL} ${chalk.green(cost.format())}`)
            curMsg.error.forEach((errArgv) => {
              log.error(...errArgv)
            })
          } else if (curMsg.warn.length) {
            progress.warn(`${Lang.Handler.OPTIMIZE_FINISHED} ${chalk.green(cost.format())}`)
            curMsg.warn.forEach((warnArgv) => {
              log.warn(...warnArgv)
            })
            curMsg.success.forEach((succArgv) => {
              log.success(...succArgv)
            })
          } else {
            progress.finished(`${Lang.Handler.OPTIMIZE_FINISHED} ${chalk.green(cost.format())}`)
            curMsg.success.forEach((succArgv) => {
              log.success(...succArgv)
            })
          }
          curMsg.success = []
          curMsg.warn = []
          curMsg.error = []
          isUpdate = true
          const homePage = await yh.optimize.getHomePage({
            files: (() => {
              const r = []
              htmlSet.forEach((item) => {
                r.push(item)
              })
              return r
            })()
          })
          log.success(`${Lang.Handler.PRINT_HOME_PAGE}: ${chalk.yellow.bold(homePage)}`)
          next()
        })
    })
  } else {
    await new Promise((next) => {
      let isError = false
      opzer.all(env)
        .on('msg', (type, ...argv) => {
          let iType = type
          if (!log[type]) {
            iType = 'info'
          }
          log[iType](...argv)
          if (type === 'error') {
            isError = argv
          }
        })
        .on('clear', () => {
          // print.cleanScreen();
        })
        .on('loading', (pkgName) => {
          progress.log(`loading module ${chalk.green(pkgName)}`)
        })
        .on('finished', async() => {
          cost.end()
          if (isError) {
            progress.error(Lang.Handler.OPTIMIZE_FAIL, ...isError)
          } else {
            progress.finished(`${Lang.Handler.OPTIMIZE_FINISHED} ${chalk.green(cost.format())}`)
          }
          next()
        })
    })

  }
}
