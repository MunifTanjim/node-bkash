const urlVariableRegex = /\{[^}]+\}/g

const trimNonWordChars = string => string.replace(/^\W+|\W+$/g, '')

const extractUrlVariableNames = url => {
  let matches = url.match(urlVariableRegex)

  return matches ? matches.map(trimNonWordChars) : []
}

module.exports = extractUrlVariableNames
