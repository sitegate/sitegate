'use strict';

import t from '../shared/t';

$('#appDelete').click(function() {
  let $this = $(this);

  if (window.confirm(t('app.deleteConfirmation'))) {
    $.ajax({
      method: 'DELETE',
      url: '/settings/applications/' + $this.data('client-id'),
      success: function() {
        window.location.href = window.location.origin +
          '/settings/applications';
      }
    });
  }
});
