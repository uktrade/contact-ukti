'use strict';

var nock = require('nock');
var config = require('../../../../config');
var emailService = require('../../../../services/email');

var emailFixture = {
  template: 'contact-ukti',
  to: 'dummy@email.com',
  subject: 'TEST EMAIL',
  dataToSend: {
    'enquiry-reason': 'inward investment'
  }
};

describe('Email service', function () {

  describe('#send()', function() {
    it('should send an inward investment email', function(done) {
      emailService.send(emailFixture, function(error) {
        should.not.exist(error);
        done();
      });
    });

    it('should fail to get an email address', function(done) {
      nock(config.postcodeApi)
        .get('/AAA')
        .reply(404, {
          status: 404
        });

      emailFixture.dataToSend = {
        'enquiry-reason': 'export',
        'org-address-postcode': 'AAA'
      };

      emailService.send(emailFixture, function(error) {
        error.should.be.an.instanceof(Error);
        done();
      });
    });
  });

  describe('#getCaseworkerEmail()', function() {
    it('should return investment email address', function() {
      emailService.getCaseworkerEmail('Inward investment into the UK', null, function(e, result) {
        result.should.equal(config.email.caseworker.investment);
      });
    });

    it('should return Business opportunities email address', function() {
      emailService.getCaseworkerEmail('Business opportunities service', null, function(e, result) {
        result.should.equal(config.email.caseworker.bizops);
      });
    });

    it('should return DSO email address', function() {
      emailService.getCaseworkerEmail('Defence & Security Organisation (DSO)', null, function(e, result) {
        result.should.equal(config.email.caseworker.dso);
      });
    });

    it('should return events email address', function() {
      emailService.getCaseworkerEmail('UK Trade & Investment events', null, function(e, result) {
        result.should.equal(config.email.caseworker.events);
      });
    });

    it('should return export email address', function() {
      var postcode = 'sw1a1aa';
      var emailRegex = new RegExp([
        '^[-a-z0-9~!$%^&*_=+}{\\\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\\\'?]+)*@',
        '([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.',
        '(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])',
        '|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$'
      ].join(''), 'i');

      nock(config.postcodeApi)
        .get('/' + postcode)
        .reply(200, {
          status: 200,
          result: {
            'region': 'London'
          }
        });

      return emailService.getCaseworkerEmail('Exporting from the UK', postcode, function(e, result) {
        result.should.match(emailRegex);
      });
    });

    it('should return default email address', function() {
      emailService.getCaseworkerEmail('other', null, function(e, result) {
        result.should.equal(config.email.caseworker.default);
      });
    });

    it('should return an error if region lookup fails', function() {
      var postcode = 'AAA';
      nock(config.postcodeApi)
        .get('/' + postcode)
        .reply(404, {
          status: 404
        });

      return emailService.getCaseworkerEmail('export', postcode, function(error) {
        error.should.be.an.instanceof(Error);
      });
    });
  });

});
