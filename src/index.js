const Hook = require('before-after-hook')

const deepmerge = require('./utils/deepmerge')
const request = require('./request')

const Plugins = [
  require('./plugins/authentication'),
  require('./plugins/endpoint-methods')
]

const { version: CLIENT_VERSION } = require('../package.json')

const defaultClientOptions = {
  mode: 'sandbox',
  type: 'checkout',
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'user-agent': `NodeBKash/${CLIENT_VERSION}`
  },
  options: {
    timeout: 0
  }
}

const API_VERSION = '1.1.0-beta'
const VALID_MODES = ['sandbox', 'pay']
const VALID_TYPES = ['checkout', 'payments']

class BKash {
  constructor(clientOptions = defaultClientOptions) {
    let { mode, type, headers, options } = deepmerge(
      defaultClientOptions,
      clientOptions
    )

    if (!VALID_MODES.includes(mode)) {
      throw new Error(`Invalid mode, must be one of: ${VALID_MODES.join('/')}`)
    }

    if (!VALID_TYPES.includes(type)) {
      throw new Error(`Invalid type, must be one of: ${VALID_TYPES.join('/')}`)
    }

    this.mode = mode
    this.type = type
    this.version = API_VERSION

    this.options = { headers, options }

    this.hook = new Hook()

    this.request = this.request.bind(this)

    Plugins.forEach(Plugin => this.addPlugin(Plugin))
  }

  addPlugin(Plugin) {
    new Plugin(this).inject()
  }

  request(options) {
    return this.hook('request', deepmerge(this.options, options), request)
  }
}

module.exports = BKash
