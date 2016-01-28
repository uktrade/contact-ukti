'use strict';

var assert = require('assert');
var q = require('q');
var _ = require('lodash');
var nock = require('nock');

var REGIONS = require('../lib/regions.js');
var regionalOffice = require('../lib/regionalOffice.js');


function assertFailWithMessage(message) {
  return function() {
    assert.ok(false, message);
  };
}


describe('Regional Office', function () {
  // set POSTCODE_API TO DUMMY ONE
  before(function() {
    process.env.POSTCODE_API = 'http://example.com';
  });

  describe('#getAll()', function() {
    it('Returns all regional offices', function() {
      return regionalOffice.getAll().then(
        function(offices) {
          assert.equal(offices.length, REGIONS.length);
        },
        assertFailWithMessage('getAll() should not fail')
      );
    });
  });

  describe('#getByRegion(region)', function() {
    it('Returns a regional office if the region is valid', function() {
      var promises = [];

      _.each(REGIONS, function(region) {
        promises.push(
          regionalOffice.getByRegion(region).then(
            assert.ok,
            assertFailWithMessage('getByRegion(' + region + ') should not fail')
          )
        );
      });

      return q.all(promises);
    });

    it('Returns an error if the region is invalid', function() {
      var region = 'Landon';
      return regionalOffice.getByRegion(region).then(
        assertFailWithMessage('getByRegion(' + region + ') should not pass.'),
        assert.ok
      );
    });
  });


  describe('#getByPostcode(postcode)', function() {
    it('Returns a regional office if the postcode is valid', function() {
      var postcode = 'sw1a1aa';

      nock(process.env.POSTCODE_API)
        .get('/'+postcode)
        .reply(200, {
          status: 200,
          result: {
            'region': 'London'
          }
        });

      return regionalOffice.getByPostcode(postcode).then(
        assert.ok,
        assertFailWithMessage('getByPostcode(' + postcode + ') should not fail')
      );
    });

    it('Returns a regional office if postcode is in Wales, Scotland or Northern Ireland', function() {
      var postcode = 'sa54tg';

      nock(process.env.POSTCODE_API)
        .get('/'+postcode)
        .reply(200, {
          status: 200,
          result: {
            'region': null,
            'european_electoral_region': 'Wales'
          }
        });

      return regionalOffice.getByPostcode(postcode).then(
        assert.ok,
        assertFailWithMessage('getByPostcode(' + postcode + ') should not fail')
      );
    });

    it('Returns an error if the postcode is invalid', function() {
      var postcode = 'invalid';

      nock(process.env.POSTCODE_API)
        .get('/'+postcode)
        .reply(404, {
          status: 404
        });

      return regionalOffice.getByPostcode(postcode).then(
        assertFailWithMessage('getByPostcode(' + postcode + ') should fail'),
        assert.ok
      );
    });

    it('Returns an error if the POSTCODE API time out', function() {
      var postcode = 'sw1a1aa';

      nock(process.env.POSTCODE_API)
        .get('/'+postcode)
        .replyWithError('ETIMEDOUT');

      return regionalOffice.getByPostcode(postcode).then(
        assertFailWithMessage('getByPostcode(' + postcode + ') should fail'),
        assert.ok
      );
    });
  });
});
