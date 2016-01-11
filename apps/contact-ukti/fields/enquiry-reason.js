'use strict';

module.exports = {
  'enquiry-reason': {
    validate: ['required'],
    legend: {
      className: 'visuallyhidden',
      value: 'pages.enquiry-reason.header'
    },
    options: [
      {
        value: 'Export',
        label: 'fields.enquiry-reason.options.export.label',
      },
      {
        value: 'Investment',
        label: 'fields.enquiry-reason.options.investment.label',
      },
      {
        value: 'BisOps',
        label: 'fields.enquiry-reason.options.bisops.label',
      },
      {
        value: 'DSO',
        label: 'fields.enquiry-reason.options.dso.label',
      },
      {
        value: 'Events',
        label: 'fields.enquiry-reason.options.events.label',
      },
      {
        value: 'Other',
        label: 'fields.enquiry-reason.options.other.label',
        toggle: 'enquiry-reason-other',
      },
    ],
  },
  'enquiry-reason-other': {
    validate: ['required'],
    label: 'fields.enquiry-reason-other.label',
    dependent: {
      value: 'Other',
      field: 'enquiry-reason',
    },
  },
};
