'use strict';

var config = require('../../../config/config');
var createMicroservice = require('sitegate-user').createMicroservice;

module.exports = createMicroservice({
  mongoURI: config.get('userServiceMongodbUrl'),
  clients: {
    mailer: require('../mailer'),
    client: require('../client')
  }
});
