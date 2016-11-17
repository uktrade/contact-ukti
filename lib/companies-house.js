'use strict';

var config = require('../config');
var request = require('request');
var logger = require('./logger');

var redisClient;

function fetchCompanyDetails(url, cb){

  logger.info('Sending request to companies house: %s', url);

  request({
    url: url,
    headers: {
      Authorization: ('Basic ' + (new Buffer(config.companiesHouse.key + ':').toString('base64')))
    },
    timeout: config.companiesHouse.timeout,
    json: true
  }, function(err, response, body){

    var e;
    var data;

    if (err) {
      logger.error(err);
      e = new Error('Unknown error');
      e.code = 999;
    } else if (response.statusCode === 200) {

      data = body;

      if (redisClient) {
        logger.info('Caching response with status %s for %s', response.statusCode, url);
        redisClient.setex(url, config.companiesHouse.ttl, JSON.stringify({
          statusCode: response.statusCode,
          data: body
        }));
      }

    } else if (response.statusCode === 404) {
      e = new Error('Company not found');
      e.code = 404;

      if (redisClient) {
        logger.info('Caching response with status %s for %s', response.statusCode, url);
        redisClient.setex(url, config.companiesHouse.ttl, JSON.stringify({statusCode: 404}));
      }
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
    var cacheData;

    if (config.companiesHouse.key) {

      if (redisClient){

        redisClient.get(url, function(err, data){
          if (err) {
            logger.error(err);
            fetchCompanyDetails(url, cb);
          } else if (data){

            logger.info('Cache HIT for companies house');
            cacheData = JSON.parse(data);

            if (cacheData.statusCode === 404) {

              e = new Error('Company not found');
              e.code = 404;

              cb(e);

            } else {

              cb(null, cacheData.data);
            }
          } else {
            logger.info('Cache MISS for companies house');
            fetchCompanyDetails(url, cb);
          }
        });

      } else {
        fetchCompanyDetails(url, cb);
      }

    } else {

      logger.error('No API key defined for companies house, cannot validate company number');
      e = new Error('No API key defined');
      e.code = 0;
      cb(e, r);
    }
  }
};
