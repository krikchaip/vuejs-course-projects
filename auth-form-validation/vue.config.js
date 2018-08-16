const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'lib': path.join(__dirname, 'lib')
      }
    }
  }
}