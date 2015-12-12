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
    throw Error('Not implemented');
    return {};
  }
  if (account.provider === 'google') {
    console.log(account);
    throw Error('Not implemented');
    return {};
  }
}

//Handler functions used by the routes.
exports.sessionManagement = function(req, reply) {
  var userService = req.server.plugins.user;

  async.waterfall([
    function(cb) {
      var loggedUser = req.pre.session && req.pre.session.user &&
        req.pre.session.user.id ? { id: req.pre.session.user.id } : null;

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

    req.login({
      id: user.id
    }, function(err) {
      if (err) {
        console.log(err);
        return;
      }

      reply.redirect('/');
    });
  });
};
