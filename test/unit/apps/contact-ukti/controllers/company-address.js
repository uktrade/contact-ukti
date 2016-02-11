'use strict';

var proxyquire = require('proxyquire');
var Controller = sinon.stub();

var CompanyAddressController = proxyquire('../../../../../apps/contact-ukti/controllers/company-address', {
  'hof': {
    controllers: {
      base: Controller
    }
  }
});

describe('apps/contact-ukti/controllers/company-address', function() {

  describe('when outside of the uk', function() {

    var controller;
    var key = 'org-address-postcode';
    var req = {
      body: {
        'org-address-postcode': 'INTERNATIONAL POSTCODE'
      },
      sessionModel: {
        get: function() {
          return 'no';
        }
      },
    };

    beforeEach(function() {
      controller = new CompanyAddressController({template: 'index'});
    });

    it('does not validate address postcode', function() {
      should.equal(controller.validateField(key, req), undefined);
    });

  });

  describe('when inside of the uk', function() {

    var controller;
    var key = 'org-address-postcode';
    var req = {
      body: {
        'org-address-postcode': 'INTERNATIONAL POSTCODE'
      },
      sessionModel: {
        get: function() {
          return 'yes';
        }
      },
    };

    beforeEach(function() {
      Controller.prototype.validateField = sinon.stub();
      controller = new CompanyAddressController({template: 'index'});
    });

    it('does validate address postcode', function() {
      controller.validateField(key, req);
      Controller.prototype.validateField.should.have.been.calledWith(key, req);
    });

  });

});
