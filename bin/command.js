#!/usr/bin/env node
const cmder = require('commander')
const print = require('yyl-print')
const Lang = require('../lang/index')
const pkg = require('../package.json')
const util = require('yyl-util')
const { log } = require('yyl-print')
const { optimize } = require('../task/handler')

cmder
  .usage('yyl-requirejs')
  .version(pkg.version, '-v, --version', Lang.Option.Version)

cmder
  .option('--verbose', Lang.Option.Verbose)

function getOption (cmder) {
  let env = {}
  if (cmder.args && cmder.args.length) {
    env = util.cmdParse(cmder.args).env
  }
  const keys = Object.keys(cmder).filter((key) => {
    if (/^_/.test(key)) {
      return false
    } else if (['options', 'parent', 'commands', 'rawArgs', 'program', 'args', 'Command', 'Option', 'CommanderError'].includes(key)) {
      return false
    } else {
      return true
    }
  })
  const r = {}
  keys.forEach((key) => {
    r[key] = cmder[key]
  })
  return Object.assign(env, r)
}

cmder
  .command('dev')
  .alias('d')
  .description(Lang.Description.Dev)
  .allowUnknownOption()
  .option('--port [value]', Lang.Option.Port)
  .option('--proxy [value]', Lang.Option.Proxy)
  .option('--remote', Lang.Option.Remote)
  .option('--https', Lang.Option.Https)
  .option('-c, --config <path>', Lang.Option.Config)
  .option('--isCommit', Lang.Option.IsCommit)
  .action((child) => {
    const env = Object.assign(
      {
        proxy: true
      },
      getOption(child),
      getOption(cmder)
    )
    optimize({ env, type: 'watch' })
      .catch((er) => {
        if (env.logLevel === 2) {
          log.error(er)
        }
        process.exit(1)
      })
  })


cmder
  .command('watch')
  .alias('w')
  .description(Lang.Description.Dev)
  .allowUnknownOption()
  .option('--port [value]', Lang.Option.Port)
  .option('--proxy [value]', Lang.Option.Proxy)
  .option('--remote', Lang.Option.Remote)
  .option('--https', Lang.Option.Https)
  .option('-c, --config <path>', Lang.Option.Path)
  .option('--isCommit', Lang.Option.IsCommit)
  .action((child) => {
    const env = Object.assign(
      getOption(child),
      getOption(cmder)
    )
    optimize({ env, type: 'watch' })
      .catch((er) => {
        if (env.logLevel === 2) {
          log.error(er)
        }
        process.exit(1)
      })
  })

cmder
  .command('optimize')
  .alias('o')
  .description(Lang.Description.Optimize)
  .allowUnknownOption()
  .option('-c, --config <path>', Lang.Option.Path)
  .option('--isCommit', Lang.Option.IsCommit)
  .action((child) => {
    const env = Object.assign(
      getOption(child),
      getOption(cmder)
    )
    optimize({ env, type: 'all' })
      .catch((er) => {
        if (env.logLevel === 2) {
          log.error(er)
        }
        process.exit(1)
      })
  })

cmder.parse(process.argv)