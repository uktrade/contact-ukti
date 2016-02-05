'use strict';

var util = require('util');
var BaseController = require('hof').controllers.base;

var EnquiryReasonController = function EnquiryReasonController() {
  BaseController.apply(this, arguments);
};

util.inherits(EnquiryReasonController, BaseController);

EnquiryReasonController.prototype.saveValues = function saveValues(req) {
  var reason = req.form.values['enquiry-reason'];

  if (reason && reason.toLowerCase().indexOf('exporting from the uk') !== -1) {
    this.options.next = '/previously-sold-overseas';
  } else {
    this.options.next = '/personal-details';
  }

  return BaseController.prototype.saveValues.apply(this, arguments);
};

module.exports = EnquiryReasonController;
