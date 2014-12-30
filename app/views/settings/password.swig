{% extends '../settings-layout.swig' %}

{% block settingsContent %}
<form class="ui form">
	<div class="field">
        <label>Current password</label>
        <div class="ui left icon input">
          <input type="password" name="currentPassword" autocomplete="off">
          <i class="lock icon"></i>
        </div>
      </div>
      <div class="field">
        <label>New password</label>
        <div class="ui left icon input">
          <input type="password" name="newPassword" autocomplete="off">
          <i class="lock icon"></i>
        </div>
      </div>
      <div class="field">
        <label>Repeat password</label>
        <div class="ui left icon input">
          <input type="password" name="repeatPassword" autocomplete="off">
          <i class="lock icon"></i>
        </div>
      </div>
      <button class="ui blue submit button" type="submit">Save changes</button>
</form>
{% endblock %}