/* jshint node:true */
'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  root: rootPath,
  app: {
    title: 'sitegate',
    description: 'An authentication and account management website',
    keywords: 'MongoDB, Express, Node.js'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'ssoApp',
  sessionCollection: 'sessions',
  sitegateClient: {
    domain: 'http://sitegatedev.com:3001',
    privateHomepage: '/',
    publicHomepage: '/'
  }
};