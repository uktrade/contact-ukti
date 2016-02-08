'use strict';

var PersonalDetailsController = require('../../../../../apps/contact-ukti/controllers/personal-details');
var BaseController = require('hof').controllers.base;

describe('apps/contact-ukti/controllers/personal-details', function () {

  describe('.locals()', function () {

    var controller;
    var req = {
      form: {
        values: {
          'enquiry-reason': ''
        }
      }
    };
    var res = {};

    beforeEach(function () {
      BaseController.prototype.locals = sinon.stub().returns({backLink: '/foo'});
      controller = new PersonalDetailsController({template: 'index'});
    });

    it('extends form the parent controller', function () {
      controller.locals(req, res).should.have.property('backLink').and.equal('/foo');
    });

    it('sets backLink to previously-sold-overseas if reason is export related', function () {
      req.form.values['enquiry-reason'] = 'Exporting from the UK';
      controller.locals(req, res).should.have.property('backLink').and.deep.equal('/previously-sold-overseas');
    });

    it('sets backLink to enquiry-reason if reason is anything else', function () {
      req.form.values['enquiry-reason'] = 'any-other-answer';
      controller.locals(req, res).should.have.property('backLink').and.deep.equal('/foo');
    });

  });

});
