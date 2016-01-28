'use strict';

var request = require('request');
var q = require('q');
var _ = require('lodash');
var YAML = require('yamljs');

var REGIONS = require('./regions.js');

// var POSTCODE_API = 'http://api.postcodes.io/postcodes';

module.exports = {
  getAll: function() {
    var promises = [];
    var self = this;

    _.each(REGIONS, function(region) {
      promises.push(self.getByRegion(region));
    });

    return q.all(promises);
  },

  getByRegion: function(region) {
    var deferred = q.defer();

    // check that region is valid
    if (!_.contains(REGIONS, region)) {
      deferred.reject(Error('Invalid Region.'));
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
          deferred.reject(Error('Invalid Region.'));
        }
      }
    );

    return deferred.promise;
  },

  getByPostcode: function(postcode) {
    var self = this;
    var deferred = q.defer();
    var postcodeinfoUrl = process.env.POSTCODE_API + '/' + postcode;

    request({
        url: postcodeinfoUrl,
        timeout: 10000
      },
      function(error, response, body) {
        if (error) {
          deferred.reject(error);
        } else {
          if (response.statusCode !== 200) {
            deferred.reject(Error('Invalid postcode.'));
          }

          var responseData = JSON.parse(body);

          if (responseData.status !== 200) {
            deferred.reject(Error('Invalid postcode.'));
          } else {
            var region = responseData.result.region;
            if (!region) {
              region = responseData.result.european_electoral_region;
            }

            self.getByRegion(region).then(
              function(office) {
                deferred.resolve(office);
              }, function(err) {
                deferred.reject(err);
              }
            );
          }
        }
      }
    );

    return deferred.promise;
  }
};
