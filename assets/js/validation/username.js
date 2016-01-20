'use strict'
import regexValidation from './regex'

function username(value) {
  return regexValidation(value, '^[a-zA-Z0-9]+([-_\.][a-zA-Z0-9]+)*$')
}
username.rule = 'username'

export default $.fn.form.settings.rules[username.rule] = username
