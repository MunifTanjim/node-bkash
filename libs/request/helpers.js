const urlVariableRegex = /\{[^}]+\}/g

const removeNonChars = variableName => variableName.replace(/^\W+|\W+$/g, '')

const extractUrlVariableNames = url => {
  let matches = url.match(urlVariableRegex)
  return matches ? matches.map(removeNonChars) : []
}

module.exports.extractUrlVariableNames = extractUrlVariableNames
