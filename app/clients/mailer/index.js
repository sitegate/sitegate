'use strict';

var config = require('../../../config/config');
var createMicroservice = require('sitegate-mailer');

module.exports = createMicroservice({
  config: config.get('mailerService')
});
