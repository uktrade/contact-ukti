'use strict';

var BaseController = require('../../../../../lib/base-controller');
var ConfirmationController = require('../../../../../apps/common/controllers/confirmation');

describe('apps/common/controllers/confirmation', function() {

  beforeEach(function() {
    BaseController.prototype.getNextStep = sinon.stub();
  });

  describe('.getValues()', function() {
    var controller;
    var json = {foo: 'bar'};
    var req = {
      sessionModel: {
      reset: sinon.stub(),
      toJSON: sinon.stub().returns(json)
    }};
    var res = {};
    var callback = sinon.stub();

    beforeEach(function() {
      controller = new ConfirmationController({template: 'foo'});
      controller.getValues(req, res, callback);
    });

    it('resets the session', function() {
      req.sessionModel.reset.should.have.been.calledOnce;
    });

    it('responds with null errors and json', function() {
      callback.should.have.been.calledWith(null, json);
    });
  });

});
