'use strict';

var signinView = require('../../views/signin');
var toHTML = require('vdom-to-html');

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/signin',
    handler: function(request, reply) {
      var vtree = signinView({});
      var html = '<!DOCTYPE html>' + toHTML(vtree);
      reply(html);
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/home'
};
