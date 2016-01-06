var _ = require('lodash');

function mapOptions (data, options) {
  var opts = options || {};
  var mapped = {};

  if (opts.insertBlank) {
    mapped[''] = '';
  }

  _.each(data, function(v) {
    mapped[v] = v;
  });

  return mapped;
}

module.exports = {
  mapOptions: mapOptions
};
