const _ = require('lodash')
const Hook = require('before-after-hook')

const request = require('./libs/request')
const clientDefaults = require('./libs/defaults').CLIENT
const { validateMode, validateService } = require('./libs/helpers')

const Plugins = [
  require('./libs/plugins/authentication'),
  require('./libs/plugins/endpoint-methods')
]

class bKashAPI {
  constructor(options = {}) {
    let clientOptions = _.defaultsDeep(options, clientDefaults)
    let { mode, service, version, timeout } = clientOptions

    this.mode = validateMode(mode)
    this.service = validateService(service)
    this.version = version

    this.options = {
      baseUrl: `https://${this.service}.${this.mode}.bka.sh/v${this.version}`,
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
    return this.hook('request', _.defaultsDeep(options, this.options), request)
  }
}

module.exports = bKashAPI
