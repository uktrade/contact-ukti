'use strict';

/* eslint no-underscore-dangle:0, handle-callback-err:0, camelcase:0, max-len:0 */

var rewire = require('rewire');
var zendeskService;

var apiUrl = 'https://www.test.com';
var apiKey = 'acbdef123456';
var hash = 'dG9vbHMrY29udGFjdC1kaXRAZGlnaXRhbC50cmFkZS5nb3YudWsvdG9rZW5wNXFxUGt1S3dyY2xDeU1aVUxnV3VQMk8xV2VVWmJTQzA1YmVzWktP';
var config = {
  zendesk: {
    url: apiUrl,
    key: apiKey,
    email: 'tools+contact-dit@digital.trade.gov.uk',
    tag: 'contact-dit',
    group_id: '12345'
  }
};
var ticketUrl = (config.zendesk.url + '/tickets.json');

describe('Zendesk Service', function(){

  var requestStub;
  var ravenStub;
  var reference;
  var data = {
    'steps': ['test'],
    'csrf-secret': 'testing',
    'enquiry-reason': 'Export opportunities',
    fullname: 'cb',
    'contact-preference': 'phone',
    phone: '23456',
    'org-type': 'Government department',
    'enquiry-description': 'dfghtjyu'
  };

  beforeEach(function(){

    reference = Math.floor(Math.random() * 123456789);
    requestStub = sinon.stub();
    ravenStub = {
      captureMessage: sinon.stub()
    };
    zendeskService = rewire('../../../services/zendesk');
    zendeskService.__set__({
      config: config,
      ticketUrl: ticketUrl,
      request: requestStub,
      hash: hash,
      ravenClient: ravenStub
    });
  });

  describe('Saving the details', function(){

    describe('When the API is called', function(){

      it('Should have the correct format', function(){

          zendeskService.save(data, reference);

          requestStub.firstCall.args[0].should.eql({
            url: ticketUrl,
            method: 'POST',
            json: true,
            headers: {
              Authorization: 'Basic ' + hash
            },
            body: {
              ticket: {
                external_id: reference,
                group_id: config.zendesk.group,
                tags: [config.zendesk.tag],
                status: 'closed',
                subject: 'Contact DIT ref: ' + reference,
                comment: JSON.stringify({
                  'enquiry-reason': 'Export opportunities',
                  fullname: 'cb',
                  'contact-preference': 'phone',
                  phone: '23456',
                  'org-type': 'Government department',
                  'enquiry-description': 'dfghtjyu'
                })
              }
            }
          });
      });

      describe('When the API returns OK', function(){

        it('Should not log the error with sentry', function(){

          requestStub.yields(null, {statusCode: 200}, null);
          zendeskService.save(data, reference);
          ravenStub.captureMessage.should.not.have.been.called;
        });
      });

      describe('When there is an error', function(){

        describe('When there is a request error', function(){

          it('Should log the error in sentry', function(){

            var err = new Error('Unable to connect');
            err.code = 'FAIL';

            var errAsString = JSON.stringify({
              code: err.code,
              message: err.message
            });

            requestStub.yields(err, null, null);
            zendeskService.save(data, reference);
            ravenStub.captureMessage.should.have.been.called;
            ravenStub.captureMessage.firstCall.args[0].should.eql('Unable to connect to zendesk API');
            ravenStub.captureMessage.firstCall.args[1].should.eql({
              level: 'warning',
              extra: {
                reference: reference,
                err: errAsString
              }
            });
          });
        });

        describe('When the API responds with 404', function(){

          it('Should log the error in sentry', function(){

            requestStub.yields(null, {statusCode: 404}, null);
            zendeskService.save(data, reference);
            ravenStub.captureMessage.should.have.been.called;
            ravenStub.captureMessage.firstCall.args[0].should.eql('Unable to save in zendesk');
            ravenStub.captureMessage.firstCall.args[1].should.eql({
              level: 'warning',
              extra: {
                reference: reference,
                statusCode: 404,
                body: null
              }
            });
          });
        });
      });
    });
  });
});
