const checkoutNamespace = require('./checkout')
const paymentsNamespace = require('./payments')

const directService = {
  checkout: checkoutNamespace,
  payments: paymentsNamespace
}

module.exports = directService
