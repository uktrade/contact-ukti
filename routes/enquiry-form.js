var express = require('express');
var expressValidator = require('express-validator');
var router = express.Router();

/* GET form page. */
router.get('/', function(req, res, next) {
  res.render('enquiry-form', { title: 'Contact UK Trade & Investment' });
});

/* POST handler. */
router.post('/', function(req, res, next) {
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
    res.send(req.body);
  }

});

module.exports = router;
