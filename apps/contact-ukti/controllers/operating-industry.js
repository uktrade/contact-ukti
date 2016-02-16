'use strict';

var util = require('util');
var BaseController = require('hof').controllers.base;
var analytics = require('../../../lib/analytics');
var logger = require('../../../lib/logger');

var OperatingIndustryController = function OperatingIndustryController() {
  BaseController.apply(this, arguments);
};

util.inherits(OperatingIndustryController, BaseController);

function getValue(req, key) {
  if (req.form && req.form.values) {
    return req.form.values[key];
  }
}

OperatingIndustryController.prototype.validateField = function validateField(key, req) {
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

module.exports = OperatingIndustryController;
