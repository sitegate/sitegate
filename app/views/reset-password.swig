{% extends 'layout.swig' %}

{% block content %}
  <h1 id="sign-header" class="ui icon center aligned header">
    <i class="lock icon"></i>
    <div class="content">
      Reset Password
    </div>
  </h1>
  
  <form class="ui form segment">
    <div class="field">
      <label>Email</label>
      <div class="ui left icon input">
        <input type="text" placeholder="Email" name="email">
        <i class="mail icon"></i>
      </div>
    </div>
    <button class="ui blue submit button" type="submit">Reset password</button>
    <a class="ui button" href="/signin">Cancel</a>
  </form>
{% endblock %}

{% block styles %}
<link rel="stylesheet" href="/css/signin.css">
{% endblock %}
{% block scripts %}
<script type="text/javascript" src="/js/reset-password.js"></script>
{% endblock %}
