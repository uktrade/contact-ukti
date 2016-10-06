'use strict';

var util = require('util');
var _ = require('underscore');
var async = require('async');
var analytics = require('../../../lib/analytics');
var referenceGenerator = require('../../../lib/reference-generator');

var BaseController = require('hof').controllers.base;
var Model = require('../models/email');

var ConfirmController = function ConfirmController() {
  BaseController.apply(this, arguments);
};

util.inherits(ConfirmController, BaseController);

var serviceMap = {
  '/enquiry/confirm': function contactUkti() {
    return {
      template: 'contact-ukti',
      reference: referenceGenerator.generate(),
      subject: 'Form submitted: Contact Department for International Trade'
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
      model.set('reference', service.reference);
    } else {
      throw new Error('no service found');
    }


    model.save(function modelSaved(err) {
      if (err) {
        callback(err);
      }

      req.sessionModel.set('reference', service.reference);

      var isCustomReason = data['enquiry-reason-other'] !== undefined;
      var isCustomType = data['org-type-other'] !== undefined;
      var events = [
        {
          category: 'Enquiry type',
          action: isCustomReason ? 'custom' : 'standard',
          label: isCustomReason ? data['enquiry-reason-other'] : data['enquiry-reason']
        },
        {
          category: 'Organisation type',
          action: isCustomType ? 'custom' : 'standard',
          label: isCustomType ? data['org-type-other'] : data['org-type']
        },
        {
          category: 'Enquiry description',
          action: 'length',
          label: Math.ceil(data['enquiry-description'].length / 50) * 50
        },
      ];

      if (data.sector) {
        events.push({
          category: 'Sector',
          action: 'standard',
          label: data.sector
        });
      }

      async.each(events, function eachEvent(params, next) {
        analytics.event(params, next);
      }, callback);
    });
  });

};

module.exports = ConfirmController;
