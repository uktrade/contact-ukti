'use strict';

/* eslint no-underscore-dangle:0, handle-callback-err:0, camelcase:0, max-len:0 */

var rewire = require('rewire');
var zendeskService;

var apiUrl = 'https://www.test.com';
var apiKey = 'acbdef123456';
var config = {
  zendesk: {
    url: apiUrl,
    key: apiKey,
    email: 'tools+contact-dit@digital.trade.gov.uk',
    tag: 'contact-dit'
  }
};

describe('Zendesk Service', function(){

  var requestStub;
  var reference;

  beforeEach(function(){

    reference = Math.floor(Math.random() * 123456789);
    requestStub = sinon.stub();
    zendeskService = rewire('../../../services/zendesk');
    zendeskService.__set__({
      config: config,
      request: requestStub
    });
  });

  describe('Saving the details', function(){

    describe('When the API is called', function(){

      it('Should have the correct format', function(){

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

          zendeskService.save(data, reference);

          requestStub.firstCall.args[0].should.eql({
            url: config.zendesk.url + '/ticket',
            method: 'POST',
            json: true,
            headers: {
              Authorization: 'Basic dG9vbHMrY29udGFjdC1kaXRAZGlnaXRhbC50cmFkZS5nb3YudWsvdG9rZW5wNXFxUGt1S3dyY2xDeU1aVUxnV3VQMk8xV2VVWmJTQzA1YmVzWktP'
            },
            body: {
              ticket: {
                external_id: reference,
                tags: [config.zendesk.tag],
                subject: 'Contact DIT ref: ' + reference,
                comment: {
                  'enquiry-reason': 'Export opportunities',
                  fullname: 'cb',
                  'contact-preference': 'phone',
                  phone: '23456',
                  'org-type': 'Government department',
                  'enquiry-description': 'dfghtjyu'
                }
              }
            }
          });
      });
    });
  });
});
