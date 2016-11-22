'use strict';

var Q = require('q');
var _ = require('underscore');
var nock = require('nock');

var config = require('../../../config');
var regionFinder = require('../../../lib/region-finder');
var REGIONS = regionFinder.regions;


function regionPromiseAssertions(promise) {
  return [
    promise.should.eventually.be.an('object'),
    promise.should.eventually.have.property('name'),
    promise.should.eventually.have.property('email')
  ];
}
/* eslint quotes:0, camelcase:0 */
var gy46jt_response = {
  "result": {
    "admin_county": null,
    "admin_district": null,
    "admin_ward": null,
    "ccg": null,
    "codes": {
      "admin_county": "L99999999",
      "admin_district": "L99999999",
      "admin_ward": "L99999999",
      "ccg": "L99999999",
      "nuts": null,
      "parish": "L99999999"
    },
    "country": "Channel Islands",
    "eastings": null,
    "european_electoral_region": null,
    "incode": "6JT",
    "latitude": null,
    "longitude": null,
    "lsoa": null,
    "msoa": null,
    "nhs_ha": "Guernsey (including Sark and Herm)",
    "northings": null,
    "nuts": null,
    "outcode": "GY4",
    "parish": null,
    "parliamentary_constituency": null,
    "postcode": "GY4 6JT",
    "primary_care_trust": null,
    "quality": 9,
    "region": null
  },
  "status": 200
};


describe('Regional Office', function() {
  // set POSTCODE_API TO DUMMY ONE
  before(function() {
    config.postcodeApi = 'http://example.com';
  });

  describe('#getAll()', function() {
    it('returns all regional offices', function() {
      var promise = regionFinder.getAll();
      return promise.should.eventually.have.length(REGIONS.length);
    });
  });

  describe('#getByRegion(region)', function() {
    it('returns a regional office if the region is valid', function() {
      var promises = [];

      _.each(REGIONS, function(regionName) {
        var promise = regionFinder.getByRegion(regionName);
        promises.concat(regionPromiseAssertions(promise));
      });

      return Q.all(promises);
    });

    it('returns an error if the region is invalid', function() {
      var promise = regionFinder.getByRegion('Landon');
      return promise.should.be.rejectedWith('Invalid region');
    });
  });


  describe('#getByPostcode(postcode)', function() {
    it('returns a regional office if the postcode is valid', function() {
      var postcode = 'sw1a1aa';

      nock(config.postcodeApi)
        .get('/' + postcode)
        .reply(200, {
          status: 200,
          result: {
            'region': 'London'
          }
        });

      var promise = regionFinder.getByPostcode(postcode);
      return Q.all(regionPromiseAssertions(promise));
    });

    [
      'East of England',
      'East Midlands',
      'London',
      'North East',
      'North West',
      'South East',
      'South West',
      'West Midlands',
      'Yorkshire and the Humber',
      'Yorkshire and The Humber',
      'Wales',
      'Northern Ireland',
      'Scotland'
    ].forEach(function checkRegion(region, i) {
      it('returns a regional office if postcode is in ' + region, function() {
        var postcode = 'test-region' + i;

        nock(config.postcodeApi)
          .get('/' + postcode)
          .reply(200, {
            status: 200,
            result: {
              'region': null,
              'european_electoral_region': region
            }
          });

        var promise = regionFinder.getByPostcode(postcode);
        return Q.all(regionPromiseAssertions(promise));
      });
    });

    it('returns an error if the postcode is invalid and response status is 404', function() {
      var postcode = 'invalid';

      nock(config.postcodeApi)
        .get('/' + postcode)
        .reply(404, {
          status: 404
        });

      return regionFinder
        .getByPostcode(postcode)
        .should.be.rejectedWith('Invalid postcode');
    });

    it('returns an error if the postcode is invalid and response status is 200', function() {
      var postcode = 'invalid';

      nock(config.postcodeApi)
        .get('/' + postcode)
        .reply(200, {
          status: 404
        });

      return regionFinder
        .getByPostcode(postcode)
        .should.be.rejectedWith('Invalid postcode');
    });

    it('returns an error if the postcode doesnt have a region', function() {

      var postcode = 'gy46jt';

      nock(config.postcodeApi)
        .get('/' + postcode)
        .reply(200, gy46jt_response);

      return regionFinder
        .getByPostcode(postcode)
        .should.be.rejectedWith('Invalid region');
    });

    it('returns an error if the POSTCODE API time out', function() {
      var postcode = 'sw1a1aa';

      nock(config.postcodeApi)
        .get('/' + postcode)
        .replyWithError('ETIMEDOUT');

      return regionFinder
        .getByPostcode(postcode)
        .should.be.rejectedWith('ETIMEDOUT');
    });
  });
});
