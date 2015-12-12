'use strict';

import t from '../shared/t';

$('.revoke.button').click(function() {
  var $this = $(this);

  if (window.confirm(t('app.revokeConfirmation'))) {
    $.ajax({
      method: 'POST',
      url: '/settings/applications/revoke/' + $this.data('client-id'),
      success: function() {
        $this.parents('.item').remove();
      }
    });
  }
});

$('.revoke-all.button').click(function() {
  if (window.confirm(t('app.revokeAllConfirmation'))) {
    $.ajax({
      method: 'POST',
      url: '/settings/applications/revoke-all',
      success: function() {
        $('.trusted.clients').remove();
      }
    });
  }
});
