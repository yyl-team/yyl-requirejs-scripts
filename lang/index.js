module.exports = {
  Description: {
    Dev: '运行',
    Optimize: '打包',
  },
  Option: {
    Version: '打印版本',
    Verbose: '输出详细日志',
    Port: '启动/设置本地服务器端口',
    Proxy: '启动/设置反向代理端口',
    Remote: '启动远程调试模式',
    Https: '启动 https 模式',
    Config: '配置 yyl.config 路径',
    IsCommit: '开启压缩'
  },
  Handler: {
    PARSE_CONFIG_START: '正在解析 yyl 配置',
    PARSE_CONFIG_FINSHED: '正在解析 yyl 配置 完成',
    PARSE_CONFIG_FAIL: '解析 yyl 配置 出错',
    CONFIG_NOT_EXSITS: '配置文件不存在',

    INIT_PLUGIN_START: '正在初始化配置中插件',
    INIT_PLUGIN_FINISHED: '初始化配置中插件完成',
    INIT_PLUGIN_FAIL: '初始化配置中插件出错',

    CLEAN_DEST_START: '正在清空输出目录',
    CLEAN_DEST_FINISHED: '清空输出目录完成',

    CHECK_YARN: '检查 yarn 安装情况',
    INSTALL_YARN: '请先安装 yarn',
    YARN_VERSION: 'yarn 版本',

    OPTIMIZE_START: '正在构建',
    OPTIMIZE_FINISHED: '构建完成',
    OPTIMIZE_FAIL: '构建失败',

    PRINT_HOME_PAGE: '主页地址',

    LOAD_SEED_START: '正在加载 seed 包',
    LOAD_SEED_FINISHED: '加载 seed 包 完成'
  }
}