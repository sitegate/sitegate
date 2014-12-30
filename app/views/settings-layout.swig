{% extends 'private-layout.swig' %}

{% block content %}
	<div class="ui grid">
		<div class="four wide column">
			<div class="ui vertical menu">
				<a class="item {% if url == '/settings/profile' %}active{% endif %}" href="/settings/profile">Account</a>
				<a class="item {% if url == '/settings/accounts' %}active{% endif %}" href="/settings/accounts">Social accounts</a>
				<a class="item {% if url == '/settings/password' %}active{% endif %}" href="/settings/password">Password</a>
			</div>
		</div>
	<div class="ui twelve wide column segment">
		{% block settingsContent %}{% endblock %}
	</div>
	</div>
{% endblock %}