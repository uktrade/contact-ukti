'use strict';

var util = require('util');
var path = require('path');
var hof = require('hof');
var i18n = hof.i18n;
var BaseController = require('hof').controllers.base;

var locali18n = i18n({
  path: path.resolve(
    __dirname, '..', 'translations', '__lng__', '__ns__.json'
  )
});

var PersonalDetailsController = function PersonalDetailsController() {
  BaseController.apply(this, arguments);
};

util.inherits(PersonalDetailsController, BaseController);

PersonalDetailsController.prototype.locals = function personalDetailsLocals(req) {
  var locals = BaseController.prototype.locals.apply(this, arguments);
  var reason = req.form.values['enquiry-reason'];

  if (reason && reason === locali18n.translate('fields.enquiry-reason.options.export.label')) {
    locals.backLink = '/previously-sold-overseas';
  }

  return locals;
};

module.exports = PersonalDetailsController;
