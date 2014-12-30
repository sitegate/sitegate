{% extends 'public-layout.swig' %}

{% block content %}
  <h1 id="sign-header" class="ui icon center aligned header">
    <i class="sign in icon"></i>
    <div class="content">
      Sign In
      <div class="sub header">Don't have an account? <a href="/signup">Sign up now</a></div>
    </div>
  </h1>
  <div class="signin options ui two column middle aligned relaxed fitted stackable grid">
  <div class="column">
    <h2>Using your credentials</h2>
    <form class="ui form segment" method="post">
      <div class="field">
        <label>Username</label>
        <div class="ui left icon input">
          <input type="text" placeholder="Username" name="username">
          <i class="user icon"></i>
        </div>
      </div>
      <div class="field">
        <label>Password</label>
        <div class="ui left icon input">
          <input type="password" name="password">
          <i class="lock icon"></i>
        </div>
      </div>
      <button class="ui blue submit button" type="submit">Login</button>
      <div class="ui button">Cancel</div>
      <a href="/reset-password">Can't access your account?</a>
    </form>
  </div>
  <div class="ui vertical divider">
    Or
  </div>
  <div class="center aligned column">
    <h2>Using your social account</h2>
    <a class="ui facebook button" href="/auth/facebook">
      <i class="facebook icon"></i>
      Facebook
    </a>
    <a class="ui twitter button" href="/auth/twitter">
      <i class="twitter icon"></i>
      Twitter
    </a>
    <a class="ui google plus button" href="/auth/google">
      <i class="google plus icon"></i>
      Google Plus
    </a>
  </div>
</div>
{% endblock %}

{% block styles %}
<link rel="stylesheet" href="/css/signin.css">
{% endblock %}
{% block scripts %}
<script type="text/javascript" src="/js/signin.js"></script>
{% endblock %}
