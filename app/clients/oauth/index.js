'use strict';

var config = require('../../../config/config');
var createMicroservice = require('sitegate-oauth').createMicroservice;

module.exports = createMicroservice({
  mongoURI: config.get('oauthServiceMongodbUrl'),
  clients: {
    user: require('../user'),
    client: require('../client')
  }
});
