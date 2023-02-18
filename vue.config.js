
module.exports = {
  publicPath: './',
  devServer: {
    port: 10086
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', '@vue/compat')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        const compilerOptions = { compatConfig: { MODE: 2 } }
        return { ...options, compilerOptions }
      })
  }
}
