const fetch = require('node-fetch')
const debug = require('debug')('bKash')

const BKashError = require('../bkash-error.js')
// const BKashErrorCodes = require('../bkash-error-codes.json')

const getResponseData = res => {
  const contentType = res.headers.get('content-type')
  return /application\/json/.test(contentType) ? res.json() : res.text()
}

const responseFormatter = res => {
  const Response = {
    headers: {},
    meta: {}
  }

  for (let [field, value] of res.headers.entries()) {
    Response.headers[field] = value
  }

  Response.meta.status = res.status

  if (res.status === 204) {
    return Response
  }

  return getResponseData(res).then(responseData => {
    if (res.status >= 500) {
      throw new BKashError(responseData, Response.meta, Response.headers)
    }

    if (res.status >= 400) {
      Response.error = responseData
    } else {
      Response.data = responseData
    }

    return Response
  })
}

const request = requestOptions => {
  debug('requestOptions:', requestOptions)

  let { method, url, headers, body, ...otherOptions } = requestOptions

  // https://fetch.spec.whatwg.org/#methods
  method = method.toUpperCase()

  const options = {
    method,
    headers,
    body,
    ...otherOptions
  }

  return fetch(url, options)
    .then(responseFormatter)
    .catch(error => {
      if (error instanceof BKashError) {
        throw error
      }

      throw new BKashError(error.message)
    })
}

module.exports = request
