const fetch = require('node-fetch')
const debug = require('debug')('bKash')

const HTTPError = require('./http-error')

const request = requestOptions => {
  debug('REQUEST:', requestOptions)

  let { method, url, headers, body, timeout } = requestOptions

  let responseHeaders = {}

  let options = {
    method: method.toUpperCase(),
    headers,
    body: body ? JSON.stringify(body) : null,
    timeout
  }

  return fetch(url, options)
    .then(response => {
      for (let [key, value] of response.headers.entries()) {
        responseHeaders[key] = value
      }

      if (response.status >= 400) {
        return response.text().then(message => {
          throw new HTTPError(message, response.status, responseHeaders)
        })
      }

      return response.json()
    })
    .then(data => ({
      data,
      meta: responseHeaders
    }))
    .catch(error => {
      if (error instanceof HTTPError) throw error
      throw new HTTPError(error.message, 500, responseHeaders)
    })
}

module.exports = request
