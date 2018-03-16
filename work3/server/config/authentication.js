const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

module.exports.ensureLoggedIn = () => {
  console.log('exporting ensureLoggedIn')
  return ensureLoggedIn
}
