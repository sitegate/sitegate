'use strict';

var config = require('../config/config');
var i18n = require('i18next');
var nodemailer = require('nodemailer');
var emailTemplates = require('email-templates');
var TEMPLATES_DIR = './app/views/email-templates';

function sendEmail(options) {
  emailTemplates(TEMPLATES_DIR, function (err, template) {
    if (err) {
      console.log(err);
      return;
    }

    options.locals = options.locals || {};
    options.locals.t = i18n.t;

    template(options.templateName, options.locals, function (err, html, text) {
      if (err) {
        console.log(err);
        return;
      }

      var smtpTransport = nodemailer.createTransport(config.mailer.options);
      var mailOptions = {
        to: options.to,
        from: config.mailer.from,
        subject: options.subject,
        html: html,
        text: text
      };

      smtpTransport.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          return;
        }

        console.log('Message sent: ' + info.response);
      });
    });
  });
}

module.exports = sendEmail;