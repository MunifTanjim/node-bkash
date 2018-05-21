const validateMode = mode => {
  if (['sandbox', 'pay'].includes(mode)) return mode
  else {
    throw new Error("Invalid mode, must be 'sandbox' or 'pay'")
  }
}

const validateService = service => {
  if (['checkout', 'direct'].includes(service)) return service
  else {
    throw new Error("Invalid service, must be 'checkout' or 'direct'")
  }
}

module.exports.validateMode = validateMode
module.exports.validateService = validateService
