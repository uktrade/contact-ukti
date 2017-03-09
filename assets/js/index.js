'use strict';

var toolkit = require('hof').toolkit;
var helpers = toolkit.helpers;

helpers.documentReady(toolkit.progressiveReveal);
helpers.documentReady(toolkit.formFocus);
helpers.documentReady(toolkit.validation);

require('./modules/typeahead');
require('./modules/validation-tracking').init();
require('./modules/outbound-tracking').init();
require('./modules/select-radio-via-hash').init();
