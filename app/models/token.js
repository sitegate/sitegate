'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our token schema
var TokenSchema = new Schema({
  value: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  }
});

// Export the Mongoose model
module.exports = mongoose.model('Token', TokenSchema);