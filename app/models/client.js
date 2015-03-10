'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  id: {
    type: String,
    unique: true,
    required: true
  },
  secret: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  homepageUrl: {
    type: String,
    unique: true,
    required: true
  },
  authCallbackUrl: {
    type: String,
    unique: true,
    required: true
  },
  trusted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Client', ClientSchema);