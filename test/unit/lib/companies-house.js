'use strict';

var nock = require('nock');
var rewire = require('rewire');

var config = require('../../../config');

describe('companiesHouse', function() {

  var companiesHouse;

  beforeEach(function() {
    companiesHouse = rewire('../../../lib/companies-house');
  });

  describe('Getting the company details', function() {

    describe('When the API key is not defined', function() {

      var number = 123456;

      beforeEach(function(){

        companiesHouse.__set__({
          config: {
            companiesHouse: {
              url: 'https://www.test.com'
            }
          }
        });
      });

      it('Should return an error', function(done) {

        companiesHouse.getCompany(number, function(err, details) {

          err.should.exist;
          err.code.should.eql(0);
          should.not.exist(details);
          done();
        });
      });
    });

    describe('When the API key is defined', function() {

      var companyNumber = 12345678;
      var stubCompany = {name: 'test company', id: companyNumber};
      var apiUrl = 'https://www.test.com';

      beforeEach(function(){

        companiesHouse.__set__({
          config: {
            companiesHouse: {
              url: apiUrl,
              key: 'abc123'
            }
          }
        });
      });

      describe('When a redis client has been set', function() {

        var redisClientMock;
        var requestMock;

        beforeEach(function(){

          requestMock = sinon.stub().yields(null, {statusCode: 200}, stubCompany);
          companiesHouse.__set__({
            request: requestMock
          });
          redisClientMock = {};
          companiesHouse.setRedisClient(redisClientMock);
        });

        describe('When there is a redis error', function() {

          it('Should call the API', function(done) {

            redisClientMock.get = sinon.stub();

            companiesHouse.getCompany(companyNumber, function(err, details){

              redisClientMock.get.should.have.been.called;
              requestMock.should.have.been.called;
              should.not.exist(err);
              should.exist(details);
              details.should.eql(stubCompany);
              done();
            });

            redisClientMock.get.yield(new Error('redis error'));
          });
        });

        describe('When there is a cache HIT', function() {

          it('Should return the cached data', function(done) {

            redisClientMock.get = sinon.stub();

            companiesHouse.getCompany(companyNumber, function(err, details){

              redisClientMock.get.should.have.been.called;
              requestMock.should.not.have.been.called;
              should.not.exist(err);
              should.exist(details);
              details.should.eql(stubCompany);
              done();
            });

            redisClientMock.get.yield(null, stubCompany);
          });
        });

        describe('When there is a cache MISS', function() {

          it('Should call the API', function(done) {

            redisClientMock.get = sinon.stub();

            companiesHouse.getCompany(companyNumber, function(err, details){

              redisClientMock.get.should.have.been.called;
              requestMock.should.have.been.called;
              should.not.exist(err);
              should.exist(details);
              details.should.eql(stubCompany);
              done();
            });

            redisClientMock.get.yield(null, null);
          });
        });
      });

      describe('When the API is available', function() {

          var requestMock;

          beforeEach(function(){
          
            requestMock = sinon.stub().yields(null, {statusCode: 200}, stubCompany);
            companiesHouse.__set__({
              request: requestMock
            });
          });

          describe('When the company number is valid', function() {
            it('Should return as valid', function() {

            });
          });

          describe('When the company number is not valid', function() {
            it('Should return as not valid', function() {

            });
          });
      });

      describe('When the API is not available', function() {

        beforeEach(function(){
        
        });

        it('Should return as valid', function() {

        });
      });
    });
  });
});
