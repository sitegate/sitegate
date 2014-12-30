{% extends 'layout.swig' %}

{% block content %}
  <h1 class="ui center aligned header">Sigin In</h1>
  <div class="signin options ui two column middle aligned relaxed fitted stackable grid">
  <div class="column">
    <h2>Using your credentials</h2>
    <div class="ui form segment">
      <div class="field">
        <label>Username</label>
        <div class="ui left icon input">
          <input type="text" placeholder="Username">
          <i class="user icon"></i>
        </div>
      </div>
      <div class="field">
        <label>Password</label>
        <div class="ui left icon input">
          <input type="password">
          <i class="lock icon"></i>
        </div>
      </div>
      <div class="ui blue submit button">Login</div>
      <div class="ui button">Cancel</div>
    </div>
  </div>
  <div class="ui vertical divider">
    Or
  </div>
  <div class="center aligned column">
    <h2>Using your social account</h2>
    <div class="ui facebook button">
      <i class="facebook icon"></i>
      Facebook
    </div>
    <div class="ui twitter button">
      <i class="twitter icon"></i>
      Twitter
    </div>
    <div class="ui google plus button">
      <i class="google plus icon"></i>
      Google Plus
    </div>
  </div>
</div>
{% endblock %}

{% block styles %}
<link rel="stylesheet" href="/css/signin.css">
{% endblock %}