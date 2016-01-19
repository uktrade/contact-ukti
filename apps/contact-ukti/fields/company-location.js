'use strict';

module.exports = {
  'inside-uk': {
    validate: ['required'],
    legend: {
      className: 'visuallyhidden',
      value: 'pages.company-location.header',
    },
    className: ['inline', 'form-group'],
    options: [
      {
        value: 'yes',
        label: 'fields.inside-uk.options.yes.label',
      },
      {
        value: 'no',
        label: 'fields.inside-uk.options.no.label',
        toggle: 'country-group',
      },
    ]
  },
  'outside-uk': {
    className: ['typeahead', 'js-hidden'],
    options: [''].concat(require('../../../assets/countries').allCountries),
    dependent: {
      field: 'inside-uk',
      value: 'no',
    },
    legend: {
      className: 'visuallyhidden',
      value: 'fields.outside-uk.label',
    },
    validate: ['required'],
    label: 'fields.outside-uk.label',
  },
};
