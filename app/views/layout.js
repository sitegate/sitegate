'use strict'
const h = require('virtual-dom/h')
const hh = require('hyperscript-helpers')(h)
const vtag = require('vtag')(h)
const config = require('../../config/config')

const html = hh.html
const head = hh.head
const body = hh.body
const meta = hh.meta
const title = hh.title
const link = hh.link

function livereloadTag () {
  if (!process.env.LR_PORT) return ''
  return vtag.js('http://localhost:' + process.env.LR_PORT + '/livereload.js')
}

module.exports = function (vm, partials) {
  const titleContent = (vm.title ? vm.title + ' | ' : '') +
    config.get('app.title')

  return html({ lang: 'en' }, [
    head([
      vtag.meta.charset('UTF-8'),
      meta({ name: 'viewport', content: 'width=device-width' }),
      title([titleContent]),
      link({ type: 'text/plain', rel: 'author', href: '/humans.txt' }),
      vtag.css('//oss.maxcdn.com/semantic-ui/2.1.3/semantic.min.css'),
      livereloadTag(),
      vtag.js(config.get('mainJS')),
      vtag.js.inline('window.stylesBundler && stylesBundler.load()'),
    ]),
    body([
      partials.coreContent,
      vtag.js('//oss.maxcdn.com/jquery/2.1.4/jquery.min.js'),
      vtag.js('//oss.maxcdn.com/semantic-ui/2.1.3/semantic.min.js'),
      //vtag.js('//cdn.foso.me/bundle/sitegate-assets(dist/js/shared/validation-config).js'),
      vtag.js.inline('window.bottomBundler && bottomBundler.load(true)'),
    ]),
  ])
}
