'use strict';

module.exports = {
  'org-type': {
    className: 'form-group',
    legend: {
      className: 'visuallyhidden',
    },
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
        value: 'Intermediary',
        label: 'fields.org-type.options.intermediary.label',
      },
      {
        value: 'Student',
        label: 'fields.org-type.options.student.label',
      },
      {
        value: 'Other',
        label: 'fields.org-type.options.other.label',
        toggle: 'org-type-other-toggle'
      },
    ]
  },
  'org-type-other': {
    validate: ['required'],
    dependent: {
      value: 'Other',
      field: 'org-type',
    },
  },
};
