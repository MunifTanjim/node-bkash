const checkoutService = require('./checkout')
const directService = require('./direct')

const routes = {
  checkout: checkoutService,
  direct: directService
}

module.exports = routes
