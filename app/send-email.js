var config = require('../config/config'),
  i18n = require('i18next'),
  nodemailer = require('nodemailer'),
  emailTemplates = require('email-templates');

function sendEmail(options) {
  emailTemplates('./app/views/email-templates', function (err, template) {
    if (err) {
      console.log(err);
    } else {
      options.locals = options.locals || {};
      options.locals.t = i18n.t;
      template(options.templateName, options.locals, function (err, html, text) {
        if (err) {
          console.log(err);
        } else {
          var smtpTransport = nodemailer.createTransport(config.mailer.options);
          var mailOptions = {
            to: options.to,
            from: config.mailer.from,
            subject: options.subject,
            html: html,
            text: text
          };
          smtpTransport.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Message sent: ' + info.response);
            }
          });
        }
      });
    }
  });
}

module.exports = sendEmail;