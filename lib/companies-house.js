'use strict';

var config = require('../config');
var request = require('request');

var redisClient;

function fetchCompanyDetails(url, cb){

  console.log( 'fetchCompanyDetails: %s', url );

  request(url, function(err, response, body){

    if( err ){

      cb(err);

    } else {
      
      cb(null, body);
    }
  });
}

module.exports = {

  setRedisClient: function(client) {

    redisClient = client;
  },

  getCompany: function(companyNumber, cb) {

    var e = null;
    var r = null;
    var url = (config.companiesHouse.url + '/company/' + companyNumber);

    console.log( 'getCompany url: %s', url );

    if (config.companiesHouse.key) {

      console.log( 'Got companiesHouse key' );

      if (redisClient){

        redisClient.get(url, function(err, data){

          console.log( 'Get response from redis' );

          if (err) {

            console.error( 'Error from redis' );
            fetchCompanyDetails(url, cb);

          } else if (data){

            console.log( 'got data from redis' );
            cb(null, data);

          } else {

            console.log( 'no data from redis' );
            fetchCompanyDetails(url, cb);
          }
        });

      } else {

        console.log( 'No redis client' );
        fetchCompanyDetails(url, cb);
      }

    } else {

      console.log( 'No companiesHouse key in config' );
      e = new Error('No API key defined');
      e.code = 0;
      cb(e, r);
    }
  }
};
