/* jshint browser:true, jquery:true */

(function () {
  'use strict';

  $.fn.form.settings.inline = true;

  function regexValidation(value, pattern) {
    var regexp = new RegExp(pattern);
    return regexp.test(value);
  };

  $.fn.form.settings.rules.regex = regexValidation;

  $.fn.form.settings.rules.username = function (value) {
    return regexValidation(value, '^[a-zA-Z0-9]+([-_\.][a-zA-Z0-9]+)*$');
  };
})();