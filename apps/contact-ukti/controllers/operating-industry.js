'use strict';

var util = require('util');
var BaseController = require('hof').controllers.base;

var IndustryController = function IndustryController() {
  BaseController.apply(this, arguments);
};

util.inherits(IndustryController, BaseController);

IndustryController.prototype.saveValues = function saveValues(req) {
  var reason = req.sessionModel.get('enquiry-reason');

  if (reason && reason.toLowerCase().indexOf('export') !== -1) {
    this.options.next = '/previously-sold-overseas';
  } else {
    this.options.next = '/company-address';
  }

  return BaseController.prototype.saveValues.apply(this, arguments);
};

module.exports = IndustryController;
