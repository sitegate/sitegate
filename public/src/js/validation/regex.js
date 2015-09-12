/* jshint browser:true, jquery:true */
'use strict';

function regexValidation(value, pattern) {
  var regexp = new RegExp(pattern);
  return regexp.test(value);
}
regexValidation.rule = 'regex';

module.exports =
  $.fn.form.settings.rules[regexValidation.rule] = regexValidation;
