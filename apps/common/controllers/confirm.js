'use strict';

var util = require('util');
var _ = require('underscore');
var async = require('async');

var BaseController = require('../../../lib/base-controller');
var analytics = require('../../../lib/analytics');
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


    model.save(function modelSaved(err) {
      if (err) {
        callback(err);
      }

      var isCustomReason = data['enquiry-reason-other'] !== undefined;
      var events = [
        {
          category: 'Enquiry type',
          action: isCustomReason ? 'custom' : 'standard',
          label: isCustomReason ? data['enquiry-reason-other'] : data['enquiry-reason']
        },
        {
          category: 'Enquiry description',
          action: 'length',
          label: Math.ceil(data['enquiry-description'].length / 50) * 50
        },
      ];

      async.each(events, function eachEvent(params, next) {
        analytics.event(params, next);
      }, callback);
    });
  });

};

module.exports = ConfirmController;
