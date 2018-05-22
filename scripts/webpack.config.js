const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bkash.js',
    library: 'BKash'
  },
  resolve: {
    alias: {
      deepmerge$: path.resolve(
        __dirname,
        '..',
        'node_modules/deepmerge/dist/umd.js'
      )
    }
  }
}
