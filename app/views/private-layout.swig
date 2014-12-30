{% extends 'layout.swig' %}

{% block coreContent %}
	<div class="main container">
		<div class="ui menu">
			<a class="item" href="/settings">
				<i class="settings icon"></i>
				Settings
			</a>
			<a class="item" href="/signout">
				<i class="sign out icon"></i>
				Sign Out
			</a>
		</div>
		{% block content %}{% endblock %}
	</div>
{% endblock %}