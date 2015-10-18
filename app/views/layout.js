'use strict';

var h = require('virtual-dom/h');
var vtag = require('vtag')(h);
var config = require('../../config/config');

module.exports = function(vm, partials) {
  var title = (vm.title ? vm.title + ' | ' : '') + config.get('app.title');

  return h('html', { lang: 'en' }, [
    h('head', [
      vtag.meta.charset('UTF-8'),
      h('meta', { name: 'viewport', content: 'width=device-width' }),
      h('title', title),
      h('link', { type: 'text/plain', rel: 'author', href: '/humans.txt' }),
      vtag.css('//oss.maxcdn.com/semantic-ui/2.1.3/semantic.min.css'),
      vtag.css('/dist/css/style.css'),
      partials.styles
    ]),
    h('body', [
      partials.coreContent,
      vtag.js('//oss.maxcdn.com/jquery/2.1.4/jquery.min.js'),
      vtag.js('//oss.maxcdn.com/semantic-ui/2.1.3/semantic.min.js'),
      vtag.js('/dist/js/shared/validation-config.js'),
      partials.scripts
    ])
  ]);
};
