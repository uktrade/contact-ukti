'use strict';

var logger = require('../../lib/logger');
var nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;
var config = require('../../config');
var jadeCompiler = require('../../lib/jade-compiler');
var i18n = require('hof').i18n;
var i18nLookup = require('hof').i18nLookup;
var Q = require('q');
var path = require('path');

var transport = config.email.auth.user === '' ?
  require('nodemailer-stub-transport') : require('nodemailer-smtp-transport');

var attachments = [
  {
    filename: 'govuk_logotype_email.png',
    path: path.resolve(__dirname, 'images', 'govuk_logotype_email.png'),
    cid: 'govuk_logotype_email'
  },
  {
    filename: 'org_crest.png',
    path: path.resolve(__dirname, 'images', 'org_crest.png'),
    cid: 'org_crest'
  },
  {
    filename: 'spacer.gif',
    path: path.resolve(__dirname, 'images', 'spacer.gif'),
    cid: 'spacer_image'
  }
];

function Emailer() {
  this.transporter = nodemailer.createTransport(transport({
    host: config.email.host,
    port: config.email.port,
    secure: false,
    auth: config.email.auth,
    ignoreTLS: false
  }));
  this.transporter.use('compile', htmlToText());

  this.lookup = null;
}

Emailer.prototype.send = function send(email, callback) {
  var locali18n = i18n({
    path: path.resolve(
      __dirname, '..', '..', 'apps', email.template, 'translations', '__lng__', '__ns__.json'
    )
  });

  locali18n.on('ready', function locali18nLoaded() {
    this.lookup = i18nLookup(locali18n.translate.bind(locali18n));

    this
      .sendToCaseworker(email)
      .then(function success() {
        if (email.to) {
          this
            .sendToCustomer(email)
            .then(callback, callback);
        } else {
          callback();
        }
      }.bind(this), callback);
  }.bind(this));
};

Emailer.prototype.sendToCaseworker = function sendCaseworker(email) {
  var deferred = Q.defer();

  logger.info('Emailing caseworker: ', email.subject);
  jadeCompiler.compile(
    path.resolve(__dirname, 'templates', 'caseworker', email.template),
    {
      data: email.dataToSend,
      t: this.lookup
    },
    function compileCb(error, html) {
      if (error) {
        return deferred.reject(error);
      }

      this.sendEmail(config.email.caseworker[email.template], email.subject, html)
        .then(deferred.resolve, deferred.reject);
    }.bind(this)
  );
  return deferred.promise;
};

Emailer.prototype.sendToCustomer = function sendCustomer(email) {
  var deferred = Q.defer();

  logger.info('Emailing customer: ', email.subject);
  jadeCompiler.compile(
    path.resolve(__dirname, 'templates', 'customer', email.template),
    {
      data: email.dataToSend,
      t: this.lookup
    },
    function compileCb(error, html) {
      if (error) {
        return deferred.reject(error);
      }

      this.sendEmail(email.to, email.subject, html)
        .then(deferred.resolve, deferred.reject);
    }.bind(this)
  );
  return deferred.promise;
};

Emailer.prototype.sendEmail = function sendEmail(to, subject, html) {
  var deferred = Q.defer();

  this.transporter.sendMail({
    from: config.email.from,
    to: to,
    subject: subject,
    html: html,
    attachments: attachments
  }, function errorHandler(err) {
    if (err) {
      return deferred.reject(err);
    }
    return deferred.resolve();
  });

  return deferred.promise;
};

module.exports = new Emailer();
