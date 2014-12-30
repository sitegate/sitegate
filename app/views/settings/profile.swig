{% extends '../settings-layout.swig' %}

{% block settingsContent %}
<form class="ui form">
	<div class="field">
        <label>Username</label>
        <div class="ui left icon input">
          <input type="text" placeholder="Username" name="username">
          <i class="user icon"></i>
        </div>
      </div>
      <div class="field">
        <label>Email</label>
        <div class="ui left icon input">
          <input type="text" placeholder="Email" name="email">
          <i class="mail icon"></i>
        </div>
      </div>
      <button class="ui blue submit button" type="submit">Save changes</button>
</form>
{% endblock %}