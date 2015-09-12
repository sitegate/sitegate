/* jshint browser:true, jquery:true */
'use strict';

var regexValidation = require('./regex');

function username(value) {
  return regexValidation(value, '^[a-zA-Z0-9]+([-_\.][a-zA-Z0-9]+)*$');
}
username.rule = 'username';

module.exports = $.fn.form.settings.rules[username.rule] = username;
