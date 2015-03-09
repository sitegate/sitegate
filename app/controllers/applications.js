'use strict';

var i18n = require('i18next');
var uid = require('../helpers/uid');
var Client = require('../models/client');

exports.applications = function (req, res) {
  Client.find({
    userId: req.user._id
  }, function (err, clients) {
    if (err) {
      //
    }
    
    res.render('settings/applications', {
      title: i18n.t('app.apps'),
      clients: clients
    });
  });
};

exports.getNewApplication = function (req, res) {
  res.render('settings/applications-new');
};

exports.postNewApplication = function (req, res) {
  var client = new Client();

  client.name = req.body.name;
  client.description = req.body.description;
  client.homepageUrl = req.body.homepageUrl;
  client.authCallbackUrl = req.body.authCallbackUrl;
  client.id = uid(20);
  client.secret = uid(40);
  client.userId = req.user._id;

  client.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.redirect('/settings/applications/' + client._id);
  });
};

exports.getApplication = function (req, res) {
  Client.findOne({
    userId: req.user._id,
    _id: req.params.id
  }, function (err, client) {
    if (err) {
      res.send(err);
    }

    res.render('settings/applications-edit', client);
  });
};

exports.postApplication = function (req, res) {
  Client.findOne({
    _id: req.params.id
  }, function (err, client) {
    if (err) {
      return res.send(err);
    }
    
    if (client.userId !== req.user._id.toString()) {
      return res.send('You cannot edit a client that was not created by you!');
    }
    
    client.name = req.body.name;
    client.description = req.body.description;
    client.homepageUrl = req.body.homepageUrl;
    client.authCallbackUrl = req.body.authCallbackUrl;
    
    client.save(function (err) {
      if (err) {
        return res.send(err);
      }
      
      res.redirect('/settings/applications');
    });
  });
};

exports.deleteApplication = function (req, res) {
  Client.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send('Success');
  });
};