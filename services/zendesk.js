'use strict';

/* eslint camelcase:0 */

var config = require('../config');
var request = require('request');
var raven = require('raven');
var logger = require('../lib/logger');

var ravenClient = new raven.Client(config.sentry.dsn);
var hash = new Buffer(config.zendesk.email + '/token:' + config.zendesk.key).toString('base64');
var ticketUrl = (config.zendesk.url + '/tickets.json');

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
function createJson(data, reference) {

  delete data.steps;
  delete data['csrf-secret'];

  return {
    ticket: {
      external_id: reference,
      group_id: config.zendesk.group,
      tags: [config.zendesk.tag],
      subject: 'Contact DIT ref: ' + reference,
      comment: JSON.stringify(data)
    }
  };
}
// jscs:enable requireCamelCaseOrUpperCaseIdentifiers

module.exports = {
  save: function(data, reference) {

    logger.info('Sending data to zendesk for ref: %s to url: %s', reference, ticketUrl);

    request({
      url: ticketUrl,
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

        ravenClient.captureMessage('Unable to connect to zendesk API', {
          level: 'warning',
          extra: {
            reference: reference,
            err: JSON.stringify({
              code: err.code,
              message: err.message
            })
          }
        });

      } else {

        logger.info('Data sent to zendesk, status: ' + response.statusCode);
        // logger.debug(body);

        if (response.statusCode !== 200) {
          ravenClient.captureMessage('Unable to save in zendesk', {
            level: 'warning',
            extra: {
              reference: reference,
              statusCode: response.statusCode,
              body: body
            }
          });
        }
      }
    });
  }
};
