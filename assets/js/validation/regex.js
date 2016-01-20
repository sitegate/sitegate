'use strict'
function regexValidation(value, pattern) {
  let regexp = new RegExp(pattern)
  return regexp.test(value)
}
regexValidation.rule = 'regex'

export default $.fn.form.settings.rules[regexValidation.rule] = regexValidation
