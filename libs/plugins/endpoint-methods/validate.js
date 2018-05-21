const HTTPError = require('../../request/http-error')

const validate = (endpointParams, options) => {
  Object.keys(endpointParams).forEach(paramKey => {
    let param = endpointParams[paramKey]
    let expectedType = param.type

    let value = options[paramKey]

    let valueIsPresent = typeof value !== 'undefined'
    let valueIsNull = value === null

    if (!param.required && !valueIsPresent) {
      return
    }

    if (param.required && !valueIsPresent) {
      throw new HTTPError(`Parameter required: ${paramKey}`, 400)
    }
  })

  return options
}

module.exports = validate
