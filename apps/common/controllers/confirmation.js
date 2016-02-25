'use strict';

var util = require('util');
var BaseController = require('../../../lib/base-controller');

var ConfirmationController = function ConfirmationController() {
  BaseController.apply(this, arguments);
};

util.inherits(ConfirmationController, BaseController);

ConfirmationController.prototype.getValues = function getValues(req, res, callback) {
  var json = req.sessionModel.toJSON();
  delete json.errorValues;
  req.sessionModel.reset();
  callback(null, json);
};

module.exports = ConfirmationController;
