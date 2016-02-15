'use strict';

var path = require('path');
var config = require('../../config');
var logger = require('../../lib/logger');
var regionFinder = require('../../lib/region-finder');
var EmailTemplate = require('email-templates').EmailTemplate;
var nodemailer = require('nodemailer');
var async = require('async');
var i18n = require('hof').i18n;

var templatesDir = path.resolve(__dirname, 'templates');

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
    auth: config.email.auth.user && config.email.auth.pass ? config.email.auth : null,
    ignoreTLS: config.email.auth.user && config.email.auth.pass ? false : true,
  }));
}

Emailer.prototype = {

  send: function send(email, callback) {
    var locali18n = i18n({
      path: path.resolve(
        __dirname, '..', '..', 'apps', email.template, 'translations', '__lng__', '__ns__.json'
      )
    });

    locali18n.on('ready', function locali18nLoaded() {
      var locals = {
        data: email.dataToSend,
        t: function t(text) {
          return locali18n.translate(text);
        }
      };
      var batch = [
        {
          template: new EmailTemplate(path.join(templatesDir, email.template, 'customer')),
          to: email.to,
          subject: email.subject,
          locals: locals
        }
      ];

      this.getCaseworkerEmail(email.dataToSend['enquiry-reason'], email.dataToSend['org-address-postcode'],
        function caseworkerEmailCb(error, caseworkerEmail) {
          if (error) {
            return callback(error);
          }

          batch.push({
            template: new EmailTemplate(path.join(templatesDir, email.template, 'caseworker')),
            to: caseworkerEmail,
            subject: email.subject,
            locals: locals
          });

          this.sendBatch(batch, callback);
        }.bind(this)
      );
    }.bind(this));
  },

  sendBatch: function sendBatch(batch, callback) {
    async.each(batch, this.sendBatchItem.bind(this), function allSent(err) {
      if (err) {
        return callback(err);
      }
      callback();
    });
  },

  sendBatchItem: function sendBatchItem(item, next) {
    logger.verbose('Sending email:', item.subject);
    item.template.render(item.locals, function templateRender(err, results) {
      if (err) {
        return next(err);
      }

      this.transporter.sendMail({
        from: config.email.from,
        to: item.to,
        subject: item.subject,
        html: results.html,
        text: results.text,
        attachments: attachments
      }, function transportCallback(error, responseStatus) {
        if (error) {
          return next(error);
        }
        logger.info('Email sent:', item.subject);
        next(null, responseStatus);
      });
    }.bind(this));
  },

  getCaseworkerEmail: function getCaseworkerEmail(reason, postcode, callback) {
    if (reason.toLowerCase().indexOf('inward investment') !== -1) {
      return callback(null, config.email.caseworker.investment);
    }

    if (reason.toLowerCase().indexOf('business opportunities') !== -1) {
      return callback(null, config.email.caseworker.bizops);
    }

    if (reason.toLowerCase().indexOf('defence & security organisation') !== -1) {
      return callback(null, config.email.caseworker.dso);
    }

    if (reason.toLowerCase().indexOf('events') !== -1) {
      return callback(null, config.email.caseworker.events);
    }

    if (reason.toLowerCase().indexOf('export') !== -1 && postcode) {
      return regionFinder
        .getByPostcode(postcode)
        .then(function regionSuccess(region) {
          if (!region.email) {
            return callback(new Error('No email contact for region'));
          }

          callback(null, region.email);
        }, callback);
    }

    callback(null, config.email.caseworker.default);
  }

};

module.exports = new Emailer();
