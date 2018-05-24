const Hook = require('before-after-hook')
const deepmerge = require('deepmerge')

const request = require('./libs/request')
const clientDefaults = require('./libs/defaults').CLIENT
const { validateMode, validateService } = require('./libs/helpers')

const Plugins = [
  require('./libs/plugins/authentication'),
  require('./libs/plugins/endpoint-methods')
]

class BKash {
  constructor(options = {}) {
    let clientOptions = deepmerge(clientDefaults, options)
    let { mode, service, version, headers, timeout } = clientOptions

    this.mode = validateMode(mode)
    this.service = validateService(service)
    this.version = version

    this.options = {
      baseUrl: `https://${this.service}.${this.mode}.bka.sh/v${this.version}`,
      headers,
      request: { timeout }
    }

    this.hook = new Hook()

    Plugins.forEach(Plugin => this.addPlugin(Plugin))

    this.request = this.request.bind(this)
  }

  addPlugin(Plugin) {
    new Plugin(this).inject()
  }

  request(options) {
    return this.hook('request', deepmerge(this.options, options), request)
  }
}

module.exports = BKash
