'use strict';

var util = require('util');
var BaseController = require('hof').controllers.base;
var analytics = require('../../../lib/analytics');
var logger = require('../../../lib/logger');
var companiesHouse = require('../../../lib/companies-house');

var CompanyLocationController = function CompanyLocationController() {
  BaseController.apply(this, arguments);
};

util.inherits(CompanyLocationController, BaseController);

function getValue(req, key) {
  if (req.form && req.form.values) {
    return req.form.values[key];
  }
}

CompanyLocationController.prototype.validate = function(req, res, cb) {

  var errors = null;
  var key = 'company-number';
  var companyNumber;
  var error;

  function handleCompanyResponse(err) {

    var message = 'Company not found. Please check the number.';

    if (err && err.code === 404) {

      errors = (errors || {});
      error = new this.Error(key, {message: message}, req, res);
      errors[key] = error;
    }

    cb(errors);
  }

  if (key in req.form.values) {

    companyNumber = req.form.values[key];
    companiesHouse.getCompany(companyNumber, handleCompanyResponse.bind(this));

  } else {
    cb(errors);
  }
};

CompanyLocationController.prototype.validateField = function validateField(key, req) {
  var countryValue = getValue(req, 'outside-uk');

  if (countryValue && countryValue !== '') {
    var valid = BaseController.prototype.validateField.apply(this, arguments);

    if (valid !== undefined) {
      analytics.event({
        category: 'Invalid autocomplete',
        action: 'country',
        label: countryValue
      }, function cb() {
        logger.verbose('Invalid country tracking event sent');
      });
    }

    return valid;
  }

  return BaseController.prototype.validateField.apply(this, arguments);
};

CompanyLocationController.prototype.saveValues = function saveValues(req) {
  if (getValue(req, 'inside-uk') === 'yes') {
    req.sessionModel.set('country', 'United Kingdom');
  } else {
    req.sessionModel.set('country', getValue(req, 'outside-uk'));
  }

  return BaseController.prototype.saveValues.apply(this, arguments);
};

module.exports = CompanyLocationController;
