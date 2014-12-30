{% extends 'layout.swig' %}

{% block content %}
  <h1 id="sign-header" class="ui icon center aligned header">
    <i class="signup icon"></i>
    <div class="content">
      Sign Up
      <div class="sub header">Already have an account? <a href="/signin">Sign in now</a></div>
    </div>
  </h1>
  <div class="signin options ui two column middle aligned relaxed fitted stackable grid">
  <div class="column">
    <h2>Using your credentials</h2>
    <form class="ui form segment">
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
      <div class="field">
        <label>Password</label>
        <div class="ui left icon input">
          <input type="password" name="password">
          <i class="lock icon"></i>
        </div>
      </div>
      <button class="ui blue submit button" type="submit">Create account</button>
      <div class="ui button">Cancel</div>
    </form>
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
{% block scripts %}
<script type="text/javascript" src="/js/signin.js"></script>
{% endblock %}
