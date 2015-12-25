'use strict';

var h = require('virtual-dom/h');
var vtag = require('vtag')(h);
var config = require('../../config/config');

function livereloadTag() {
  if (!process.env.LR_PORT) return '';
  return vtag.js('http://localhost:' + process.env.LR_PORT + '/livereload.js');
}

module.exports = function(vm, partials) {
  var title = (vm.title ? vm.title + ' | ' : '') + config.get('app.title');

  return h('html', { lang: 'en' }, [
    h('head', [
      vtag.meta.charset('UTF-8'),
      h('meta', { name: 'viewport', content: 'width=device-width' }),
      h('title', title),
      h('link', { type: 'text/plain', rel: 'author', href: '/humans.txt' }),
      vtag.css('//oss.maxcdn.com/semantic-ui/2.1.3/semantic.min.css'),
      livereloadTag(),
      vtag.js(config.get('mainJS')),
      vtag.js.inline('window.stylesBundler && stylesBundler.load();')
    ]),
    h('body', [
      partials.coreContent,
      vtag.js('//oss.maxcdn.com/jquery/2.1.4/jquery.min.js'),
      vtag.js('//oss.maxcdn.com/semantic-ui/2.1.3/semantic.min.js'),
      //vtag.js('//cdn.foso.me/bundle/sitegate-assets(dist/js/shared/validation-config).js'),
      vtag.js.inline('window.bottomBundler && bottomBundler.load(true);')
    ])
  ]);
};
