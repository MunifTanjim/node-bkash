const pkg = require('../package.json')

module.exports.ENDPOINT = {
  method: 'GET',
  headers: {
    'user-agent': `Node bKash v${pkg.version}`
  }
}

module.exports.CLIENT = {
  mode: 'sandbox',
  service: 'checkout',
  version: '0.40.0',
  timeout: 0
}
