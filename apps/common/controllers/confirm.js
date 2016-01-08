'use strict';

var util = require('util');
var _ = require('underscore');

var BaseController = require('../../../lib/base-controller');
var Model = require('../models/email');

var ConfirmController = function ConfirmController() {
  BaseController.apply(this, arguments);
};

util.inherits(ConfirmController, BaseController);

var serviceMap = {
  '/contact-ukti/confirm': function notArrived() {
    return {
      template: 'contact-ukti',
      subject: 'Form submitted: Contact UK Trade & Investment'
    };
  }
};

ConfirmController.prototype.saveValues = function saveValues(req, res, callback) {

  BaseController.prototype.saveValues.call(this, req, res, function saveModel() {
    var data = _.pick(req.sessionModel.toJSON(), _.identity);
    var model = new Model(data);
    var service = serviceMap[req.originalUrl] && serviceMap[req.originalUrl](data);

    if (service) {
      model.set('template', service.template);
      model.set('subject', service.subject);
    } else {
      throw new Error('no service found');
    }

    model.save(callback);
  });

};

module.exports = ConfirmController;
