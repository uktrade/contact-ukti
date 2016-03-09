'use strict';

var proxyquire = require('proxyquire');

var modelProto = {
  save: sinon.stub(),
  set: sinon.stub()
};
var Model = sinon.stub();
Model.prototype = modelProto;
var BaseController = sinon.stub();
BaseController.prototype.saveValues = sinon.stub().callsArg(2);

var ConfirmController = proxyquire('../../../../../apps/common/controllers/confirm', {
  'hof': {
    controllers: {
      base: BaseController
    }
  },
  '../../../lib/analytics': {
    event: sinon.stub()
  },
  '../../../lib/reference-generator': {
    generate: sinon.stub()
  },
  '../models/email': Model,
  '../routes/fields': {foo: {}, bar: {}}
});

describe('apps/common/controllers/confirm', function() {

  describe('.saveValues()', function() {

    var controller;
    var expected = {foo: 'bar'};
    var req = {
      sessionModel: {
        toJSON: sinon.stub().returns(expected)
      },
      originalUrl: '/enquiry/confirm'
    };
    var res = {};
    var callback = sinon.stub();

    beforeEach(function() {
      controller = new ConfirmController({template: 'index'});
      controller.saveValues(req, res, callback);
    });

    it('saves the session data to the a model', function() {
      Model.should.have.been.calledWith(expected);
      Model.prototype.save.should.have.been.called;
    });

    it('sets a template for contact ukti journey', function() {
      req.originalUrl = '/enquiry/confirm';
      controller.saveValues(req, res, callback);

      modelProto.set.should.have.been.calledWith('template', 'contact-ukti');
    });

    it('throws an error if its not part of a recognised journey', function() {
      req.originalUrl = '/unrecognised-journey';

      (function() {
        controller.saveValues(req, res, callback);
      }).should.throw('no service found');
    });

  });

});
