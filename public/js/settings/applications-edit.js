/* jshint browser:true, jquery:true */

(function ($) {
  'use strict';

  $('#appDelete').click(function () {
    var $this = $(this);
    
    if (window.confirm($.t('app.deleteConfirmation'))) {
      $.ajax({
        method: 'DELETE',
        url: '/settings/applications/' + $this.data('client-id'),
        success: function () {
          window.location.href = window.location.origin +
            '/settings/applications';
        }
      });
    }
  });
})(window.$);