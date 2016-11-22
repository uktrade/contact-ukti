'use strict';

/* eslint camelcase:0 */

var config = require('../config');
var request = require('request');
var logger = require('../lib/logger');

var hash = new Buffer(config.zendesk.email + '/token' + config.zendesk.key).toString('base64');

function createJson(data, reference) {

  delete data.steps;
  delete data['csrf-secret'];

  return {
    ticket: {
      external_id: reference,
      tags: [config.zendesk.tag],
      subject: 'Contact DIT ref: ' + reference,
      comment: data
    }
  };
}

module.exports = {
  save: function(data, reference) {

    logger.info('Sending data to zendesk for ref: ' + reference);

    request({
      url: config.zendesk.url + '/ticket',
      method: 'POST',
      json: true,
      body: createJson(data, reference),
      headers: {
        Authorization: 'Basic ' + hash
      }
    }, function(err, response, body) {

      if (err) {
        // send to sentry
        logger.error(err);

      } else {

        logger.info('Data sent to zendesk, status: ' + response.statusCode);
        logger.debug(body);
      }
    });
  }
};
