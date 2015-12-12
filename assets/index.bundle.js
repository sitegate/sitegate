'use strict';

var Bundler = require('../../../foso/dtm').Bundler;

/* somewhere in the head section of the page */
let bottomBundler =
window.bottomBundler = new Bundler('js', {
  id: 'bottom'
});

if (location.pathname === '/signin') {
  bottomBundler.addPackage({
    name: 'sitegate-assets',
    local: true,
    files: ['dist/js/signin']
  });
}
