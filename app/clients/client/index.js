'use strict';

var config = require('../../../config/config');
var createMicroservice = require('sitegate-client').createMicroservice;

module.exports = createMicroservice({
  mongoURI: config.get('clientServiceMongodbUrl'),
});
