'use strict';

var path = require('path');
var request = require('request');
var Q = require('q');
var _ = require('underscore');
var YAML = require('yamljs');
var logger = require('./logger');

var config = require('../config');

module.exports = {
  regions: [
    'east_of_england',
    'east_midlands',
    'london',
    'north_east',
    'north_west',
    'south_east',
    'south_west',
    'west_midlands',
    'yorkshire_and_the_humber',
    'wales',
    'northern_ireland',
    'scotland'
  ],

  getAll: function getAll() {
    var promises = [];

    _.each(this.regions, function eachRegion(region) {
      promises.push(this.getByRegion(region));
    }.bind(this));

    return Q.all(promises);
  },

  getByRegion: function getByRegion(region) {
    var deferred = Q.defer();

    region = region.toLowerCase().replace(/\s/g, '_');

    // check that region is valid
    if (this.regions.indexOf(region) === -1) {
      deferred.reject(new Error('Invalid region'));
    }

    var filePath = path.resolve(
      __dirname, '..', 'assets', 'data', 'regional-offices', region + '.yml'
    );

    // load regional office data
    YAML.load(filePath, function loadFile(obj) {
      if (!obj) {
        return deferred.reject(new Error('Invalid region'));
      }
      deferred.resolve(obj);
    });

    return deferred.promise;
  },

  getByPostcode: function getByPostcode(postcode) {
    var deferred = Q.defer();
    var postcodeinfoUrl = config.postcodeApi + '/' + postcode;

    logger.info('Sending request to postcode API for: %s', postcode);

    request({
        url: postcodeinfoUrl,
        timeout: 10000
      },
      function requestResult(error, response, body) {
        logger.info('Response from postcode API for %s: error: %s, status: %s', postcode, !!error, (!!response && response.statusCode));
        // logger.debug(body);

        if (error) {
          logger.debug('error with response from postcode API');
          return deferred.reject(error);
        }

        if (response.statusCode !== 200) {
          logger.debug('Invalid status from postcode API');
          return deferred.reject(Error('Invalid postcode'));
        }

        var responseData = JSON.parse(body);
        if (responseData.status !== 200) {
          logger.debug('Invlid status in response data from postcode API');
          return deferred.reject(Error('Invalid postcode'));
        }

        var region = responseData.result.region;
        if (!region) {
          // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
          region = responseData.result.european_electoral_region;
          // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
        }

        this
          .getByRegion(region)
          .then(deferred.resolve, deferred.reject);
      }.bind(this)
    );

    return deferred.promise;
  }
};
