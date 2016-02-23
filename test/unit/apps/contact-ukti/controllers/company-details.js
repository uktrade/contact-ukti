'use strict';

var Controller = require('../../../../../apps/contact-ukti/controllers/company-details');
var BaseController = require('hof').controllers.base;
var analytics = require('../../../../../lib/analytics');

describe('apps/contact-ukti/controllers/company-details', function() {

  describe('.validateField()', function() {

    var controller;
    var key = 'sector';
    var req = {
      form: {
        values: {
          'sector': ''
        }
      }
    };

    beforeEach(function() {
      analytics.event = sinon.stub();
      controller = new Controller({template: 'index'});
    });

    it('validates empty if no value submitted', function() {
      BaseController.prototype.validateField = sinon.stub().returns({
        key: key,
        type: 'equal'
      });

      controller.validateField(key, req);

      analytics.event.should.not.have.been.called;
      BaseController.prototype.validateField.should.have.been.called;
    });

    it('sends a tracking event if country is invalid', function() {
      req.form.values.sector = 'Industry not in list';
      BaseController.prototype.validateField = sinon.stub().returns({
        key: key,
        type: 'equal'
      });

      controller.validateField(key, req);

      analytics.event.should.have.been.called;
      BaseController.prototype.validateField.should.have.been.called;
    });

    it('doesn\'t send a tracking event if country is valid', function() {
      req.form.values.sector = 'Industry in list';
      BaseController.prototype.validateField = sinon.stub().returns(undefined);

      controller.validateField(key, req);

      analytics.event.should.not.have.been.called;
      BaseController.prototype.validateField.should.have.been.called;
    });

  });

});
