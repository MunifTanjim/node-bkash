const urlTemplate = require('url-template')

const extractUrlVariableNames = require('../utils/extract-url-variable-names.js')

const getRequestOptions = endpointOptions => {
  let {
    baseUrl,
    body,
    headers,
    method,
    url,
    options: otherOptions,
    ...params
  } = endpointOptions

  // replace {varname} with {+varname} to make it RFC 6570 compatible
  url = url.replace(/\{([a-z]\w+)\}/gi, '{+$1}')

  // extract variable names from URL to calculate remaining variables later
  const urlVariableNames = extractUrlVariableNames(url)

  url = urlTemplate.parse(url).expand(params)

  if (!/^http/.test(url)) {
    url = `${baseUrl}${url}`
  }

  urlVariableNames.forEach(key => {
    delete params[key]
  })

  if (
    Object.keys(params).length &&
    !['GET', 'HEAD'].includes(method.toUpperCase())
  ) {
    body = JSON.stringify(params)
  }

  return {
    ...otherOptions,
    method,
    url,
    headers,
    body
  }
}

module.exports = getRequestOptions
