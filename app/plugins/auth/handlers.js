'use strict';

var async = require('async');
var bro = require('brototype');

function getProfile(account) {
  var profile = account.profile;
  if (account.provider === 'facebook') {
    return {
      firstName: profile.name.first,
      lastName: profile.name.last,
      displayName: profile.displayName,
      email: profile.email,
      username: profile.username,
      provider: account.provider,
      providerIdentifierField: 'id',
      providerData: profile.raw
    };
  }
  if (account.provider === 'twitter') {
    console.log(account);
    return {};
  }
  if (account.provider === 'google') {
    console.log(account);
    return {};
  }
}

//Handler functions used by the routes.
exports.sessionManagement = function(req, reply) {
  var sessionService = req.server.plugins.session;
  var userService = req.server.plugins.user;

  async.waterfall([
    function(cb) {
      var sid = bro(req).iCanHaz('auth.credentials.session.sid');
      if (!sid) {
        cb(null, null);
      }
      sessionService.get(sid, cb);
    },
    function(sessionDoc, cb) {
      if (arguments.length === 1) {
        cb = sessionDoc;
      }
      var loggedUser = sessionDoc ? {
        id: sessionDoc.userId
      } : null;

      var providerUserProfile = getProfile(req.auth.credentials);

      userService.saveOAuthUserProfile({
        loggedUser: loggedUser,
        providerUserProfile: providerUserProfile
      }, cb);
    }
  ], function(err, user) {
    if (err) {
      console.log(err);
      return;
    }

    var sid = bro(req).iCanHaz('auth.credentials.session.sid');
    if (!sid) {
      sid = Math.random();
    }
    sessionService.set(sid, {
      userId: user.id
    }, {
      ttl: 60 * 60 * 24 * 14 // 2 weeks
    }, function(err, sessionDoc) {
      if (err) {
        console.log(err);
        return;
      }

      req.auth.session.set({ sid: sid });

      reply.redirect('/');
    });
  });
};
