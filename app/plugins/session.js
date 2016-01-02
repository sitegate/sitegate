'use strict';

const session = require('../clients/session');

exports.register = function(server, opts, next) {
  server.expose({
    get(sid, cb) {
      session.get(sid, function(err, sessionDoc) {
        cb(err, sessionDoc);
      });
    },
    set(sid, sessionDoc, cb) {
      session.set(sid, sessionDoc, cb);
    },
  });
  next();
};

exports.register.attributes = {
  name: 'session',
};
