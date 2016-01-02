'use strict';

const async = require('async');

function getProfile(account) {
  let profile = account.profile;
  if (account.provider === 'github') {
    return {
      displayName: profile.displayName,
      username: profile.username,
      email: profile.email,
      provider: account.provider,
      providerIdentifierField: 'id',
      providerData: profile.raw,
    };
  }

  if (account.provider === 'facebook') {
    return {
      firstName: profile.name.first,
      lastName: profile.name.last,
      displayName: profile.displayName,
      email: profile.email,
      username: profile.username,
      provider: account.provider,
      providerIdentifierField: 'id',
      providerData: profile.raw,
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
      let loggedUser = req.pre.session && req.pre.session.user &&
        req.pre.session.user.id ? { id: req.pre.session.user.id } : null;

      let providerUserProfile = getProfile(req.auth.credentials);

      userService.saveOAuthUserProfile({
        loggedUser: loggedUser,
        providerUserProfile: providerUserProfile,
      }, cb);
    },
  ], function(err, user) {
    if (err) {
      console.log(err);
      return;
    }

    reply.login({
      id: user.id,
    }, function(err) {
      if (err) {
        console.log(err);
        return;
      }

      reply.redirect('/');
    });
  });
};
