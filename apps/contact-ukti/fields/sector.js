'use strict';

module.exports = {
  'sector': {
    validate: ['required'],
    className: ['typeahead'],
    hint: 'fields.sector.hint',
    options: [''].concat(require('../../../assets/data/industries')),
  },
};
