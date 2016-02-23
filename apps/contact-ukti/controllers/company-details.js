'use strict';

var util = require('util');
var BaseController = require('hof').controllers.base;
var analytics = require('../../../lib/analytics');
var logger = require('../../../lib/logger');

var CompanyDetailsController = function CompanyDetailsController() {
  BaseController.apply(this, arguments);
};

util.inherits(CompanyDetailsController, BaseController);

function getValue(req, key) {
  if (req.form && req.form.values) {
    return req.form.values[key];
  }
}

CompanyDetailsController.prototype.validateField = function validateField(key, req) {
  var industryValue = getValue(req, 'sector');

  if (industryValue && industryValue !== '') {
    var valid = BaseController.prototype.validateField.apply(this, arguments);

    if (valid !== undefined) {
      analytics.event({
        category: 'Invalid autocomplete',
        action: 'industry',
        label: industryValue
      }, function cb() {
        logger.verbose('Invalid industry tracking event sent');
      });
    }

    return valid;
  }

  return BaseController.prototype.validateField.apply(this, arguments);
};

module.exports = CompanyDetailsController;
