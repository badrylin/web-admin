const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const svgoConfig = require('./svgo.config')

module.exports = {
  configureWebpack: config => {
    var configMerge = {}
    if (process.env.NODE_ENV === 'development') {
      // vscode chrome debug
      // configMerge.devtool = 'source-map';
    }
    if (process.env.NODE_ENV === 'production') {
      // 添加打包分析
      configMerge.plugins = [
        new BundleAnalyzerPlugin()
      ]
    }
    return configMerge
  },
  chainWebpack: config => {
    // 保存原有的file-loader配置, 不处理src/icons的svg文件
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, './src/icons'))
    // 使用svg-sprite-loader和svgo-loader处理src/icons下的svg文件
    config.module
      .rule('svg-sprite-loader')
      .test(/\.(svg)(\?.*)?$/)
      .include.add(path.join(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .options(svgoConfig)
  }
}