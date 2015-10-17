'use strict';

var h = require('virtual-dom/h');
var config = require('../../config/config');

function script(src) {
  return h('script', { src: src });
}

function stylesheet(src) {
  return h('link', { rel: 'stylesheet', href: src });
}

module.exports = function(opts, partials) {
  var title = (opts.title ? opts.title + ' | ' : '') + config.get('app.title');

  return h('html', { lang: 'en' }, [
    h('head', [
      h('meta', { charset: 'UTF-8' }),
      h('meta', { name: 'viewport', content: 'width=device-width' }),
      h('title', title),
      h('link', { type: 'text/plain', rel: 'author', href: '/humans.txt' }),
      stylesheet('//oss.maxcdn.com/semantic-ui/2.1.3/semantic.min.css'),
      stylesheet('/dist/css/style.css'),
      partials.styles
    ]),
    h('body', [
      partials.coreContent,
      script('//oss.maxcdn.com/jquery/2.1.4/jquery.min.js'),
      script('//oss.maxcdn.com/semantic-ui/2.1.3/semantic.min.js'),
      script('/dist/js/shared/validation-config.js'),
      partials.scripts
    ])
  ]);
};
