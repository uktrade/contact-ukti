'use strict';

var util = require('util');
var BaseController = require('hof').controllers.base;

var PersonalDetailsController = function PersonalDetailsController() {
  BaseController.apply(this, arguments);
};

util.inherits(PersonalDetailsController, BaseController);

PersonalDetailsController.prototype.locals = function personalDetailsLocals(req) {
  var locals = BaseController.prototype.locals.apply(this, arguments);
  var reason = req.form.values['enquiry-reason'];

  if (reason && reason.toLowerCase().indexOf('exporting from the uk') !== -1) {
    locals.backLink = '/previously-sold-overseas';
  }

  return locals;
};

module.exports = PersonalDetailsController;
