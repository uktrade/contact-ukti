'use strict';

var config = require('../config');
var request = require('request');

var redisClient;

function fetchCompanyDetails(url, cb){

  request(url, function(err, response, body){

    var e;
    var data;

    if (err) {
      e = new Error('Unknown error');
      e.code = 999;
    } else if (response.statusCode === 200) {

      data = body;

      if (redisClient) {
        redisClient.setex(url, JSON.stringify(body));
      }

    } else if (response.statusCode === 404) {
      e = new Error('Company not found');
      e.code = 404;
    } else if (response.statusCode === 429) {
      e = new Error('Too many requests');
      e.code = 429;
    } else {
      e = new Error('Unknown response');
      e.code = 998;
    }

    cb(e, data);
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

    if (config.companiesHouse.key) {

      if (redisClient){

        redisClient.get(url, function(err, data){
          if (err) {
            fetchCompanyDetails(url, cb);
          } else if (data){
            cb(null, JSON.parse(data));
          } else {
            fetchCompanyDetails(url, cb);
          }
        });

      } else {
        fetchCompanyDetails(url, cb);
      }

    } else {

      e = new Error('No API key defined');
      e.code = 0;
      cb(e, r);
    }
  }
};
