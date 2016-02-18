'use strict';

var path = require('path');
var hof = require('hof');
var nock = require('nock');
var config = require('../../../../config');
var emailService = require('../../../../services/email');

var i18n = hof.i18n({
  path: path.resolve(path.resolve(__dirname, '..', '..', '..', '..',
                      'apps', 'contact-ukti', 'translations', '__lng__', '__ns__.json'))
});

var emailFixture = {
  template: 'contact-ukti',
  to: 'dummy@email.com',
  subject: 'TEST EMAIL',
  dataToSend: {
    'enquiry-reason': 'inward investment'
  }
};

describe('Email service', function() {

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

      i18n.on('ready', function() {
        emailFixture.dataToSend = {
          'enquiry-reason': i18n.translate('fields.enquiry-reason.options.export.label'),
          'org-address-postcode': 'AAA'
        };

        emailService.send(emailFixture, function(error) {
          error.should.be.an.instanceof(Error);
          done();
        });
      });
    });
  });

  describe('#getCaseworkerEmail()', function() {

    before(function(done) {
      i18n.on('ready', function() {
        done();
      });
    });

    it('should return investment email address', function() {
      var reason = i18n.translate('fields.enquiry-reason.options.investment.label');
      emailService.getCaseworkerEmail(reason, null, function(e, result) {
        result.should.equal(config.email.caseworker.investment);
      });
    });

    it('should return Business opportunities email address', function() {
      var reason = i18n.translate('fields.enquiry-reason.options.bisops.label');
      emailService.getCaseworkerEmail(reason, null, function(e, result) {
        result.should.equal(config.email.caseworker.bizops);
      });
    });

    it('should return DSO email address', function() {
      var reason = i18n.translate('fields.enquiry-reason.options.dso.label');
      emailService.getCaseworkerEmail(reason, null, function(e, result) {
        result.should.equal(config.email.caseworker.dso);
      });
    });

    it('should return events email address', function() {
      var reason = i18n.translate('fields.enquiry-reason.options.events.label');
      emailService.getCaseworkerEmail(reason, null, function(e, result) {
        result.should.equal(config.email.caseworker.events);
      });
    });

    it('should return export email address', function() {
      var postcode = 'sw1a1aa';
      var reason = i18n.translate('fields.enquiry-reason.options.export.label');
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

      return emailService.getCaseworkerEmail(reason, postcode, function(e, result) {
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
      var reason = i18n.translate('fields.enquiry-reason.options.export.label');
      nock(config.postcodeApi)
        .get('/' + postcode)
        .reply(404, {
          status: 404
        });

      return emailService.getCaseworkerEmail(reason, postcode, function(error) {
        error.should.be.an.instanceof(Error);
      });
    });
  });

});
