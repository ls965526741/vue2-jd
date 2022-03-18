const path = require('path')
// less文件的路径
const myTheme = path.join(__dirname, './src/assets/css/vantTheme.less')

const defaultSettings = require('./src/config/settings.js')
const name = defaultSettings.title || 'JD' // page title

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/img': {
        target: 'http://localhost:8888',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/img': '/img'
        }
      }
    }
  },

  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${myTheme}";`
        }
      }
    }
  }
}
