'use strict';

module.exports = {
  'org-name': {
    validate: ['required'],
    label: 'fields.org-name.label',
  },
  'org-type': {
    className: 'form-group',
    validate: ['required'],
    options: [
      {
        value: 'company',
        label: 'fields.org-type.options.company.label'
      },
      {
        value: 'govt',
        label: 'fields.org-type.options.govt.label',
        toggle: 'country-group'
      },
      {
        value: 'individual',
        label: 'fields.org-type.options.individual.label',
        toggle: 'country-group'
      },
      {
        value: 'intermediary',
        label: 'fields.org-type.options.intermediary.label',
        toggle: 'country-group'
      },
      {
        value: 'student',
        label: 'fields.org-type.options.student.label',
        toggle: 'country-group'
      },
    ]
  },
  'sector': {
    validate: ['required'],
    className: ['typeahead'],
    options: [''].concat(require('../../../assets/countries').allCountries),
    label: 'fields.sector.label'
  },
  'annual-turnover': {
    label: 'fields.annual-turnover.label'
  },
  'no-employees': {
    label: 'fields.no-employees.label'
  },
  'org-address-house-number': {
    validate: ['required'],
    label: 'fields.org-address-house-number.label'
  },
  'org-address-street': {
    validate: ['required'],
    label: 'fields.org-address-street.label'
  },
  'org-address-town': {
    validate: ['required'],
    label: 'fields.org-address-town.label'
  },
  'org-address-county': {
    label: 'fields.org-address-county.label',
  },
  'org-address-postcode': {
    validate: ['required'],
    label: 'fields.org-address-postcode.label'
  }
};
