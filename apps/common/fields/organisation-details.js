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
        value: 'Company or organisation',
        label: 'fields.org-type.options.company.label',
      },
      {
        value: 'Government department',
        label: 'fields.org-type.options.govt.label',
      },
      {
        value: 'Individual',
        label: 'fields.org-type.options.individual.label',
      },
      {
        value: 'Intermediary',
        label: 'fields.org-type.options.intermediary.label',
      },
      {
        value: 'Student',
        label: 'fields.org-type.options.student.label',
      },
    ]
  },
  'annual-turnover': {
    className: 'form-group',
    options: [
      {
        value: 'Under £100,000',
        label: 'fields.annual-turnover.options.under-100k.label',
      },
      {
        value: 'Between £100,000 and £500,000',
        label: 'fields.annual-turnover.options.100k-500k.label',
      },
      {
        value: 'Between £500,000 and £25 million',
        label: 'fields.annual-turnover.options.500k-25m.label',
      },
      {
        value: 'Between £25 million and £250 million',
        label: 'fields.annual-turnover.options.25m-250m.label',
      },
      {
        value: 'Over £250 million',
        label: 'fields.annual-turnover.options.over-250m.label',
      },
    ]
  },
  'no-employees': {
    className: 'form-group',
    options: [
      {
        value: 'Less than 10',
        label: 'fields.no-employees.options.less-10.label',
      },
      {
        value: 'Between 10 and 50',
        label: 'fields.no-employees.options.10-50.label',
      },
      {
        value: 'Between 50 and 250',
        label: 'fields.no-employees.options.50-250.label',
      },
      {
        value: 'More than 250',
        label: 'fields.no-employees.options.more-250.label',
      },
    ]
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
