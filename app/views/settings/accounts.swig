{% extends '../settings-layout.swig' %}

{% block settingsContent %}
<h1 class="ui header">Add a login using any of the following services</h1>
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
{% endblock %}