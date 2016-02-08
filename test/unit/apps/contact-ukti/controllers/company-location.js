'use strict';

var CompanyLocationController = require('../../../../../apps/contact-ukti/controllers/company-location');
var BaseController = require('hof').controllers.base;

describe('apps/contact-ukti/controllers/company-location', function () {

  describe('.saveValues()', function () {

    var controller;
    var req = {
      form: {
        values: {}
      },
      sessionModel: {
        set: sinon.stub()
      }
    };

    beforeEach(function () {
      BaseController.prototype.saveValues = sinon.stub();
      controller = new CompanyLocationController({template: 'index'});
    });

    it('sets country to United Kingdom if inside the UK', function () {
      req.form.values['inside-uk'] = 'yes';
      controller.saveValues(req);

      req.sessionModel.set.should.have.been.calledWith('country', 'United Kingdom');
    });

    it('sets country to selected country if outside of the UK', function () {
      req.form.values['inside-uk'] = 'no';
      req.form.values['outside-uk'] = 'Other country';
      controller.saveValues(req);

      req.sessionModel.set.should.have.been.calledWith('country', 'Other country');
    });

    it('calls the base controller saveValues', function () {
      controller.saveValues(req);

      BaseController.prototype.saveValues.should.have.been.called;
    });

  });

});
