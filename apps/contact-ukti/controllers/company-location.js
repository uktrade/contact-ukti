'use strict';

var util = require('util');
var BaseController = require('hof').controllers.base;

var CompanyLocationController = function CompanyLocationController() {
  BaseController.apply(this, arguments);
};

util.inherits(CompanyLocationController, BaseController);

function getValue(req, key) {
  if (req.form && req.form.values) {
    return req.form.values[key];
  }
}

CompanyLocationController.prototype.saveValues = function saveValues(req) {
  if (getValue(req, 'inside-uk') === 'yes') {
    req.sessionModel.set('country', 'United Kingdom');
  } else {
    req.sessionModel.set('country', getValue(req, 'outside-uk'));
  }

  return BaseController.prototype.saveValues.apply(this, arguments);
};

module.exports = CompanyLocationController;
