'use strict';

module.exports = {
  'enquiry-reason': {
    validate: ['required'],
    className: 'form-group',
    legend: {
      className: 'visuallyhidden',
      value: 'pages.topic.header'
    },
    options: [
      {
        value: 'Exporting from the UK',
        label: 'fields.enquiry-reason.options.export.label',
      },
      {
        value: 'Investing overseas',
        label: 'fields.enquiry-reason.options.overseas-investment.label',
      },
      {
        value: 'Investment in the UK from overseas',
        label: 'fields.enquiry-reason.options.investment.label',
      },
      {
        value: 'Export opportunities',
        label: 'fields.enquiry-reason.options.bisops.label',
      },
      {
        value: 'Defence & Security Organisation (DSO)',
        label: 'fields.enquiry-reason.options.dso.label',
      },
      {
        value: 'Events',
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
