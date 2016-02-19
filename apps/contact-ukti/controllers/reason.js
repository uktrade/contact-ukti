'use strict';

var util = require('util');
var path = require('path');
var hof = require('hof');
var i18n = hof.i18n;
var BaseController = hof.controllers.base;

var locali18n = i18n({
  path: path.resolve(
    __dirname, '..', 'translations', '__lng__', '__ns__.json'
  )
});

var EnquiryReasonController = function EnquiryReasonController() {
  BaseController.apply(this, arguments);
};

util.inherits(EnquiryReasonController, BaseController);

EnquiryReasonController.prototype.saveValues = function saveValues(req) {
  var reason = req.form.values['enquiry-reason'];

  if (reason && reason === locali18n.translate('fields.enquiry-reason.options.export.label')) {
    this.options.next = '/previously-sold-overseas';
  } else {
    this.options.next = '/personal-details';
  }

  return BaseController.prototype.saveValues.apply(this, arguments);
};

module.exports = EnquiryReasonController;
