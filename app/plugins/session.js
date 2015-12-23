'use strict';

var session = require('../clients/session');

exports.register = function(server, opts, next) {
  server.expose({
    get: function(sid, cb) {
      session.get(sid, function(err, sessionDoc) {
        cb(err, sessionDoc);
      });
    },
    set: function(sid, sessionDoc, cb) {
      session.set(sid, sessionDoc, cb);
    }
  });
  next();
};

exports.register.attributes = {
  name: 'session'
};
