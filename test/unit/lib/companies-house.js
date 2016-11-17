'use strict';

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
            redisClientMock.setex = sinon.stub();

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

            redisClientMock.get.yield(null, JSON.stringify(stubCompany));
          });
        });

        describe('When there is a cache MISS', function() {

          it('Should call the API and cache in redis', function(done) {

            redisClientMock.get = sinon.stub();
            redisClientMock.setex = sinon.stub();

            companiesHouse.getCompany(companyNumber, function(err, details){

              redisClientMock.get.should.have.been.called;
              requestMock.should.have.been.called;
              redisClientMock.setex.should.have.been.called;
              redisClientMock.setex.args[0][1].should.be.a('string');
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

        describe('When the company number is valid', function() {

          beforeEach(function(){

            requestMock = sinon.stub().yields(null, {statusCode: 200}, stubCompany);
            companiesHouse.__set__({
              request: requestMock
            });
          });

          it('Should return the company details', function(done) {

            companiesHouse.getCompany(companyNumber, function(err, details){

              requestMock.should.have.been.called;
              should.not.exist(err);
              should.exist(details);
              done();
            });
          });
        });

        describe('When the company number is not valid', function() {

          beforeEach(function(){

            requestMock = sinon.stub().yields(null, {statusCode: 404}, {
              "errors": [
                {
                  "error": "company-profile-not-found",
                  "type": "ch:service"
                }
              ]
            });

            companiesHouse.__set__({
              request: requestMock
            });
          });

          it('Should return an error with code 404', function(done) {

            companiesHouse.getCompany('12345', function(err, details){

              err.should.be.defined;
              err.code.should.eql(404);
              err.message.should.eql('Company not found');
              should.not.exist(details);
              done();
            });
          });
        });
      });

      describe('When the API is not available', function() {

        var requestMock;

        describe( 'When then request errors', function(){

          beforeEach(function(){
        
            requestMock = sinon.stub().yields(new Error('Unknown'));

            companiesHouse.__set__({
              request: requestMock
            });
          });

          it('Should return an error', function(done) {

            companiesHouse.getCompany('12345', function(err, details){

                err.should.be.defined;
                err.code.should.eql(999);
                err.message.should.eql('Unknown error');
                should.not.exist(details);
                done();
              });
          });
        
        } );

        describe('When the API returns an error', function(){
        
          beforeEach(function(){
        
            requestMock = sinon.stub().yields(null, {statusCode: 500});

            companiesHouse.__set__({
              request: requestMock
            });
          });

          it('Should return an error', function(done) {

            companiesHouse.getCompany('12345', function(err, details){

                err.should.be.defined;
                err.code.should.eql(998);
                err.message.should.eql('Unknown response');
                should.not.exist(details);
                done();
              });
          });  
        });

        describe('When the API returns too many requests', function(){

          beforeEach(function(){

            requestMock = sinon.stub().yields(null, {statusCode: 429});

            companiesHouse.__set__({
              request: requestMock
            });
          });

          it('Should return an error', function(done) {

            companiesHouse.getCompany('12345', function(err, details){

                err.should.be.defined;
                err.code.should.eql(429);
                err.message.should.eql('Too many requests');
                should.not.exist(details);
                done();
              });
          });
        });
      });
    });
  });
});
