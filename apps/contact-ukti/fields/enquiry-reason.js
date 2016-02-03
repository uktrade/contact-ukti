'use strict';

module.exports = {
  'enquiry-reason': {
    validate: ['required'],
    className: 'form-group',
    legend: {
      className: 'visuallyhidden',
      value: 'pages.enquiry-reason.header'
    },
    options: [
      {
        value: 'Exporting from the UK or investing overseas',
        label: 'fields.enquiry-reason.options.export.label',
      },
      {
        value: 'Inward investment into the UK',
        label: 'fields.enquiry-reason.options.investment.label',
      },
      {
        value: 'Business opportunities service',
        label: 'fields.enquiry-reason.options.bisops.label',
      },
      {
        value: 'Defence & Security Organisation (DSO)',
        label: 'fields.enquiry-reason.options.dso.label',
      },
      {
        value: 'UK Trade & Investment events',
        label: 'fields.enquiry-reason.options.events.label',
      },
      {
        value: 'Other',
        label: 'fields.enquiry-reason.options.other.label',
        toggle: 'enquiry-reason-other-toggle',
      },
    ],
  },
  'enquiry-reason-other': {
    validate: ['required'],
    dependent: {
      value: 'Other',
      field: 'enquiry-reason',
    },
  },
};
