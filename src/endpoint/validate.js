const BKashError = require('../bkash-error.js')

const validate = (paramsSpecs = {}, params) => {
  Object.entries(paramsSpecs).forEach(([paramName, spec]) => {
    const param = params[paramName]

    const valueIsPresent = typeof param !== 'undefined'

    if (!spec.required && !valueIsPresent) {
      return
    }

    if (spec.required && !valueIsPresent) {
      throw new BKashError(`Parameter required: ${paramKey}`, {
        status: 400
      })
    }
  })

  return params
}

module.exports = validate
