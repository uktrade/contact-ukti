'use strict';

var proxyquire = require('proxyquire');
var Controller = sinon.stub();
Controller.prototype.locals = sinon.stub().returns({foo: 'bar'});
Controller.prototype.getNextStep = sinon.stub();
var CompanyDetailsController = proxyquire('../../../../../apps/contact-ukti/controllers/company-details', {
  'hof': {
    controllers: {
      base: Controller
    }
  }
});

describe('apps/contact-ukti/controllers/company-details', function() {

  var controller;
  var args = {template: 'index'};

  describe('instantiated', function() {

    it('calls Controller with the arguments', function() {
      /* eslint-disable no-new */
      new CompanyDetailsController(args);
      /* eslint-enable no-new */
      Controller.should.have.been.calledWith(args);
    });
  });

  describe('.locals()', function() {
    var res = {};
    var req = {
      sessionModel: {
        get: function() {
          return '';
        }
      },
    };

    beforeEach(function() {
      controller = new CompanyDetailsController(args);
    });

    it('extends form the parent controller', function() {
      controller.locals(req, res).should.have.property('foo').and.equal('bar');
    });

    it('returns a value indicating whether the person is in the UK"', function() {
      req.sessionModel.get = function() {
        return 'yes';
      };
      controller.locals(req, res).should.have.property('insideUk').and.deep.equal(true);
      req.sessionModel.get = function() {
        return 'no';
      };
      controller.locals(req, res).should.not.have.property('insideUk');
    });

  });

  describe('.validateField()', function() {

    var key = 'org-type';
    var req = {
      body: {
        'org-type': ''
      },
      sessionModel: {},
    };

    describe('when outside of the uk', function() {

      beforeEach(function() {
        controller = new CompanyDetailsController(args);
      });

      it('does not validate address org type', function() {
        req.sessionModel.get = function() {
          return 'no';
        };

        should.equal(controller.validateField(key, req), undefined);
      });

    });

    describe('when inside of the uk', function() {

      beforeEach(function() {
        Controller.prototype.validateField = sinon.stub();
        controller = new CompanyDetailsController(args);
      });

      it('does validate address postcode', function() {
        req.sessionModel.get = function() {
          return 'yes';
        };

        controller.validateField(key, req);
        Controller.prototype.validateField.should.have.been.calledWith(key, req);
      });

    });

  });

});
