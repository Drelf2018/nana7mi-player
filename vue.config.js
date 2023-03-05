module.exports = {
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration:true,
      builderOptions: {
        appId: 'link.nana7mi.player',
        productName: 'player',
        asar: false,
        win: {
          target: 'nsis',
          icon: './public/favicon.ico'
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
        },
        extraResources: {
          // 拷贝静态文件到指定位置,否则打包之后出现找不到资源的问题.将整个resources目录拷贝到 发布的根目录下
          from: './public/',
          to: './'
        }
      },
    },
  },
  configureWebpack: {
    resolve: {
      fallback: { path: require.resolve("path-browserify") },
    },
  }
};