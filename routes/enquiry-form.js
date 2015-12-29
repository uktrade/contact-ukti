var express = require('express');
var expressValidator = require('express-validator');
var S = require('string');
var mapKeys = require('lodash/object/mapKeys');
var mailer = require('../lib/mailer');
var jadeCompiler = require('../lib/jadeCompiler');
var router = express.Router();

/* GET form page. */
router.get('/', function(req, res, next) {
  res.render('enquiry-form', { title: 'Contact UK Trade & Investment' });
});

/* POST handler. */
router.post('/', function(req, res, next) {
  req.sanitizeBody();
  req.checkBody({
   'name': {
      notEmpty: true,
      errorMessage: 'is required'
    },
   'job-title': {
      notEmpty: true,
      errorMessage: 'is required'
    },
   'email': {
      notEmpty: true,
      errorMessage: 'is required',
      isEmail: true
    },
   'phone': {
      notEmpty: true,
      errorMessage: 'is required'
    },
   'company-name': {
      notEmpty: true,
      errorMessage: 'is required'
    },
   'company-address': {
      notEmpty: true,
      errorMessage: 'is required'
    },
   'company-type': {
      notEmpty: true,
      errorMessage: 'is required'
    },
   'company-based': {
      notEmpty: true,
      errorMessage: 'is required'
    },
   'industry': {
      notEmpty: true,
      errorMessage: 'is required'
    },
   'enquiry-summary': {
      notEmpty: true,
      errorMessage: 'is required'
    },
   'heard-about': {
      notEmpty: true,
      errorMessage: 'is required'
    },
  });

  var errors = req.validationErrors(true);
  if (errors) {
    res.render('enquiry-form', { title: 'Contact UK Trade & Investment', errors: errors });
  } else {
    var fields = mapKeys(req.body, function (value, key) {
      return S(key).humanize().s;
    });

    jadeCompiler.compile('emails/inward-enquiry', { fields: fields }, function (error, html) {
      var send = mailer.sendInwardEnquiry({
        html: html
      });

      send.then(function (info) {
        res.redirect('/enquire/complete');
      }, function (error) {
        res.render('error', {
          message: 'Enquiry not be sent',
          description: 'There was a problem sending your enquiry. Please try completing your enquiry again.'
        });
      });
    });
  }

});

/* GET success page. */
router.get('/complete', function(req, res, next) {
  res.render('enquiry-success');
});

module.exports = router;
