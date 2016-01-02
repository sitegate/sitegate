'use strict';

import t from '../shared/t';

$('.revoke.button').click(function() {
  let $this = $(this);

  if (window.confirm(t('app.revokeConfirmation'))) {
    $.ajax({
      method: 'POST',
      url: `/settings/applications/revoke/${$this.data('client-id')}`,
      success: function() {
        window.location.href = window.location.origin +
          '/settings/applications';
      },
    });
  }
});
