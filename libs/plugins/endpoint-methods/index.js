const ENDPOINT_ROUTES = require('../../routes')

const endpointMethod = require('./method')

class EndpointMethodsPlugin {
  constructor(bKash) {
    this.core = bKash
  }

  inject() {
    let service = ENDPOINT_ROUTES[this.core.service]

    Object.keys(service).forEach(namespace => {
      this.core[namespace] = {}

      Object.keys(service[namespace]).forEach(section => {
        this.core[namespace][section] = {}

        Object.keys(service[namespace][section]).forEach(api => {
          let apiOptions = service[namespace][section][api]

          let { method, params, url, ...rest } = apiOptions

          this.core[namespace][section][api] = endpointMethod.bind(
            null,
            this.core,
            { method, url, ...rest },
            params
          )
        })
      })
    })
  }
}

module.exports = EndpointMethodsPlugin
