const _ = require('lodash')
const validate = require('./validate')

const endpointMethod = (
  bKash,
  endpointDefaults,
  endpointParams,
  options,
  callback
) => {
  let endpointOptions = _.defaultsDeep({}, options, endpointDefaults)

  let promise = Promise.resolve(endpointOptions)
    .then(validate.bind(null, endpointParams))
    .then(bKash.request)

  if (callback) {
    promise.then(callback.bind(null, null), callback)
    return
  }

  return promise
}

module.exports = endpointMethod
