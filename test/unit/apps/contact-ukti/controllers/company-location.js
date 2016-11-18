'use strict';

/* eslint no-underscore-dangle:0 */

var rewire = require('rewire');
var CompanyLocationController;
var BaseController = require('hof').controllers.base;
var analytics = require('../../../../../lib/analytics');

describe('apps/contact-ukti/controllers/company-location', function() {

  beforeEach(function(){
    CompanyLocationController = rewire('../../../../../apps/contact-ukti/controllers/company-location');
  });

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

  describe('.validate', function(){

    var controller;
    var getCompanyStub;

    beforeEach(function() {
      analytics.event = sinon.stub();
      controller = new CompanyLocationController({template: 'index'});
      getCompanyStub = sinon.stub();
      CompanyLocationController.__set__({
        companiesHouse: {
          getCompany: getCompanyStub
        }
      });
    });

    describe('When there is not a company number field', function(){

      var req;
      var res;

      beforeEach(function(){
        req = {
          form: {
            values: {}
          }
        };
        res = sinon.stub();
      });

      it('Should not return any errors', function(){

        controller.validate(req, res, function(errors){
          should.not.exist(errors);
          getCompanyStub.should.not.have.been.called;
        });
      });
    });

    describe('When there is a company number field', function(){

      var req;
      var res;

      beforeEach(function(){
        req = {
          form: {
            values: {
              'company-number': '123456'
            }
          }
        };
        res = sinon.stub();
      });

      describe('When the field is empty', function(){

        it('Should not return any errors', function(done){

          req.form.values['company-number'] = '';

          controller.validate(req, res, function(errors){
            should.not.exist(errors);
            getCompanyStub.should.not.have.been.called;
            done();
          });
        });
      });

      describe('When the number is valid', function(){

        var stubCompany;

        beforeEach(function(){
          stubCompany = {name: 'test', id: 12345};
          getCompanyStub.yields(null, stubCompany);
        });

        it('Should not return any errors', function(done){

          controller.validate(req, res, function(errors){
            should.not.exist(errors);
            done();
          });
        });
      });

      describe('When the number is not valid', function(){

        beforeEach(function(){
          var getErr;

          getErr = new Error('Company not found');
          getErr.code = 404;
          getCompanyStub.yields(getErr, null);
        });

        it('Should return errors', function(done){

          controller.validate(req, res, function(errors){
            should.exist(errors);
            errors['company-number'].message.should.eql('Company not found. Please check the number.');
            done();
          });
        });
      });
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
