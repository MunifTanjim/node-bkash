const authBeforeRequest = (state, options) => {
  if (!state.auth) {
    return
  }

  switch (state.auth.type) {
    case 'simple':
      options.headers['username'] = state.auth.username
      options.headers['password'] = state.auth.password
      break
    case 'token':
      options.headers['authorization'] = state.auth.token
      options.headers['x-app-key'] = state.auth.appkey
      break
  }

  return
}

module.exports = authBeforeRequest
