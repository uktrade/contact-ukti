'use strict';

module.exports = {
  'sector': {
    validate: ['required'],
    className: ['typeahead'],
    options: [''].concat(require('../../../assets/data/industries')),
    labelClassName: 'visuallyhidden'
  },
};
