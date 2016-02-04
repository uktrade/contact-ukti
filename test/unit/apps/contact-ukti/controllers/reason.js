'use strict';

var ReasonController = require('../../../../../apps/contact-ukti/controllers/reason');
var BaseController = require('hof').controllers.base;

describe('apps/contact-ukti/controllers/reason', function () {

  describe('.saveValues()', function () {

    var controller;
    var req = {
      form: {
        values: {
          'enquiry-reason': ''
        }
      }
    };

    beforeEach(function () {
      BaseController.prototype.saveValues = sinon.stub();
      controller = new ReasonController({template: 'index'});
    });

    it('sets next to previously-sold-overseas if reason is export related', function () {
      req.form.values['enquiry-reason'] = 'Exporting from the UK';
      controller.saveValues(req);

      controller.options.next.should.equal('/previously-sold-overseas');
    });

    it('sets next to personal-details if reason is anything else', function () {
      req.form.values['enquiry-reason'] = 'any-other-answer';
      controller.saveValues(req);

      controller.options.next.should.equal('/personal-details');
    });

    it('calls the base controller saveValues', function () {
      controller.saveValues(req);

      BaseController.prototype.saveValues.should.have.been.called;
    });

  });

});
