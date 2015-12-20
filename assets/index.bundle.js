'use strict';

var Bundler = require('foso-dtm').Bundler;
var __package = 'sitegate-assets';

/* somewhere in the head section of the page */
let bottomBundler =
window.bottomBundler = new Bundler('js', {
  id: 'bottom'
});
let stylesBundler =
window.stylesBundler = new Bundler('css', {
  id: 'styles-bundle'
});

bottomBundler.addPackage({
  name: __package,
  files: 'dist/js/shared/validation-config'
});
stylesBundler.addPackage({
  name: __package,
  files: 'dist/css/style'
});

if (location.pathname === '/signin') {
  bottomBundler.addPackage({
    name: __package,
    files: 'dist/js/signin'
  });

  stylesBundler.addPackage({
    name: __package,
    files: 'dist/css/signin'
  });
}
if (location.pathname === '/signup') {
  bottomBundler.addPackage({
    name: __package,
    files: 'dist/js/signup'
  });

  stylesBundler.addPackage({
    name: __package,
    files: 'dist/css/signin'
  });
}
if (location.pathname === '/reset-password') {
  bottomBundler.addPackage({
    name: __package,
    files: 'dist/js/reset-password'
  });

  stylesBundler.addPackage({
    name: __package,
    files: 'dist/css/reset-password'
  });
}
if (location.pathname === '/settings/profile') {
  bottomBundler.addPackage({
    name: __package,
    files: 'dist/js/settings/profile'
  });
}
if (location.pathname === '/settings/accounts') {
  stylesBundler.addPackage({
    name: __package,
    files: 'dist/css/settings/accounts'
  });
}
if (location.pathname === '/settings/password') {
  bottomBundler.addPackage({
    name: __package,
    files: 'dist/js/settings/password'
  });
}
if (location.pathname === '/settings/applications') {
  bottomBundler.addPackage({
    name: __package,
    files: 'dist/js/settings/applications'
  });
  stylesBundler.addPackage({
    name: __package,
    files: 'dist/css/settings/applications'
  });
}
if (location.pathname === '/settings/applications/new') {
  bottomBundler.addPackage({
    name: __package,
    files: 'dist/js/settings/applications-new'
  });
}
if (location.pathname === '/settings/applications/new') {
  bottomBundler.addPackage({
    name: __package,
    files: 'dist/js/settings/applications-new'
  });
}
