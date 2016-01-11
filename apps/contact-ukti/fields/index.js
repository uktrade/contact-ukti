'use strict';

var _ = require('underscore');

module.exports = _.extend(
  require('./enquiry-reason'),
  require('./company-location'),
  require('./enquiry')
);
