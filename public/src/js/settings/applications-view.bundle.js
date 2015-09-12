/* jshint browser:true, jquery:true */
'use strict';

var t = require('../shared/t');

$('.revoke.button').click(function() {
  var $this = $(this);

  if (window.confirm(t('app.revokeConfirmation'))) {
    $.ajax({
      method: 'POST',
      url: '/settings/applications/revoke/' + $this.data('client-id'),
      success: function() {
        window.location.href = window.location.origin +
          '/settings/applications';
      }
    });
  }
});
