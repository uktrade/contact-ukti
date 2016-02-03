'use strict';

var util = require('util');
var BaseController = require('hof').controllers.base;

var CompanyAddressController = function CompanyAddressController() {
  BaseController.apply(this, arguments);
};

util.inherits(CompanyAddressController, BaseController);

CompanyAddressController.prototype.validateField = function validateField(key, req) {
  if (key === 'org-address-postcode' &&
      req.body['org-address-postcode'] !== '' &&
      req.sessionModel.get('inside-uk') === 'no') {
    return undefined;
  }

  return BaseController.prototype.validateField.apply(this, arguments);
};

module.exports = CompanyAddressController;
