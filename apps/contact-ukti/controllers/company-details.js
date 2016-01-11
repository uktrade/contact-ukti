'use strict';

var util = require('util');
var _ = require('underscore');
var BaseController = require('hof').controllers.base;

var CompanyDetailsController = function CompanyDetailsController() {
  BaseController.apply(this, arguments);
};

util.inherits(CompanyDetailsController, BaseController);

CompanyDetailsController.prototype.locals = function contactDetailsLocals(req) {
  var locals = BaseController.prototype.locals.apply(this, arguments);
  return (req.form.values['inside-uk'] === 'yes') ? _.extend({}, locals, {
    insideUk: true
  }) : locals;
};

CompanyDetailsController.prototype.validateField = function validateField(key, req) {
  if (key === 'org-type' && req.session['hmpo-wizard-0']['inside-uk'] === 'no') {
    return true;
  }

  return BaseController.prototype.validateField.apply(this, arguments);
};

module.exports = CompanyDetailsController;
