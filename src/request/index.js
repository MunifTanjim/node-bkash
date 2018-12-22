const fetch = require('./fetch.js')
const getRequestOptions = require('./get-request-options.js')

const request = endpointOptions => {
  let requestOptions = getRequestOptions(endpointOptions)
  return fetch(requestOptions)
}

module.exports = request
