'use strict';

var config = require('../../../config/config');
var createMicroservice = require('sitegate-session').createMicroservice;

module.exports = createMicroservice({
  mongoURI: config.get('sessionServiceMongodbUrl')
});
