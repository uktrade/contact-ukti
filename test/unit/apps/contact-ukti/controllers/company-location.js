'use strict';

var CompanyLocationController = require('../../../../../apps/contact-ukti/controllers/company-location');
var BaseController = require('hof').controllers.base;
var analytics = require('../../../../../lib/analytics');

describe('apps/contact-ukti/controllers/company-location', function() {

  describe('.saveValues()', function() {

    var controller;
    var req = {
      form: {
        values: {}
      },
      sessionModel: {
        set: sinon.stub()
      }
    };

    beforeEach(function() {
      BaseController.prototype.saveValues = sinon.stub();
      controller = new CompanyLocationController({template: 'index'});
    });

    it('sets country to United Kingdom if inside the UK', function() {
      req.form.values['inside-uk'] = 'yes';
      controller.saveValues(req);

      req.sessionModel.set.should.have.been.calledWith('country', 'United Kingdom');
    });

    it('sets country to selected country if outside of the UK', function() {
      req.form.values['inside-uk'] = 'no';
      req.form.values['outside-uk'] = 'Other country';
      controller.saveValues(req);

      req.sessionModel.set.should.have.been.calledWith('country', 'Other country');
    });

    it('calls the base controller saveValues', function() {
      controller.saveValues(req);

      BaseController.prototype.saveValues.should.have.been.called;
    });

    it('sends a tracking event if country is invalid', function() {
      controller.saveValues(req);

      BaseController.prototype.saveValues.should.have.been.called;
    });

  });

  describe('.validateField()', function() {

    var controller;
    var key = 'outside-uk';
    var req = {
      form: {
        values: {
          'outside-uk': ''
        }
      }
    };

    beforeEach(function() {
      analytics.event = sinon.stub();
      controller = new CompanyLocationController({template: 'index'});
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

    it('sends a tracking event if country is not in the list', function() {
      req.form.values['outside-uk'] = 'Country not in list';
      BaseController.prototype.validateField = sinon.stub().returns({
        key: key,
        type: 'equal'
      });

      controller.validateField(key, req);

      analytics.event.should.have.been.called;
      BaseController.prototype.validateField.should.have.been.called;
    });

    it('does not send a tracking event if country is in the list', function() {
      req.form.values['outside-uk'] = 'Country in list';
      BaseController.prototype.validateField = sinon.stub().returns(undefined);

      controller.validateField(key, req);

      analytics.event.should.not.have.been.called;
      BaseController.prototype.validateField.should.have.been.called;
    });

  });

});
