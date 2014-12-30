<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>{{ title }}</title>
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/components/semantic-ui/dist/semantic.css">
  {% block styles %}{% endblock %}
  <script src="http://localhost:35729/livereload.js"></script>
</head>
<body>
	<div class="main container">
		{% block coreContent %}{% endblock %}
	</div>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script type="text/javascript" src="/components/semantic-ui/dist/semantic.js"></script>
  {% block scripts %}{% endblock %}
</body>
</html>
