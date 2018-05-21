const getRequestOptions = require('./helpers')
const request = require('./request')

const restRequest = endpointOptions => {
  let requestOptions = getRequestOptions(endpointOptions)
  return request(requestOptions)
}

module.exports = restRequest
