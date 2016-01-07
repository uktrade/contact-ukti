'use strict';

var request = require('request');
var q = require('q');
var _ = require('lodash');
var YAML = require('yamljs');

var REGIONAL_OFFICES = [
  'East of England',
  'London'
];

module.exports = {
  getAllRegions: function() {
      return REGIONAL_OFFICES;
  },

  getAll: function() {
    var promises = [];
    var self = this;

    _.each(REGIONAL_OFFICES, function(region) {
      promises.push(self.getByRegion(region));
    });

    return q.all(promises);
  },

  getByRegion: function(region) {
    var deferred = q.defer();

    // check that region is valid
    if (!_.contains(REGIONAL_OFFICES, region)) {
      deferred.reject('Invalid Region.');
    }

    var filePath = require('path').resolve(
      __dirname, '../data/regionaloffices/' + region + '.yml'
    );

    // load regional office data
    YAML.load(
      filePath, function(obj) {
        if (obj) {
          deferred.resolve(obj);
        } else {
          deferred.reject('Invalid Region.');
        }
      }
    );

    return deferred.promise;
  },

  getByPostcode: function(postcode) {
    var self = this;
    var deferred = q.defer();
    var postcodeinfoUrl = 'http://api.postcodes.io/postcodes/' + postcode;

    request(
        postcodeinfoUrl,
        function(error, response, body) {
          if (error || response.statusCode !== 200) {
            deferred.reject('Invalid postcode.');
          } else {
            var responseData = JSON.parse(body);

            if (responseData.status !== 200) {
              deferred.reject('Invalid postcode.');
            } else {
              self.getByRegion(responseData.result.region)
                .catch(function(err) {
                  deferred.reject(err);
                })
                .then(function(office) {
                  deferred.resolve(office);
                });
            }
          }
        }
    );

    return deferred.promise;
  }
};
