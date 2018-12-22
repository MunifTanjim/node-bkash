const endpointMethod = require('../../endpoint/method.js')

class EndpointMethodsPlugin {
  constructor(apiClient) {
    this.core = apiClient

    const { mode, type, version } = this.core

    this.baseUrl = require(`../../routes/${type}-${version}-info.json`).baseUrl[
      mode
    ]

    this.endpoints = require(`../../routes/${type}-${version}.json`)
  }

  inject() {
    this.endpoints.forEach(endpoint => {
      const { name, method, params: paramsSpecs = {}, url } = endpoint
      this.core[name] = endpointMethod.bind(
        null,
        this.core,
        { baseUrl: this.baseUrl, method, url },
        paramsSpecs
      )
    })
  }
}

module.exports = EndpointMethodsPlugin
