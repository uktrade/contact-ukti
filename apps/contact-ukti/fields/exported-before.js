'use strict';

module.exports = {
  'exported-before': {
    validate: ['required'],
    className: 'form-group',
    legend: {
      className: 'visuallyhidden',
      value: 'pages.previously-sold-overseas.header'
    },
    options: [
      {
        value: 'No',
        label: 'fields.exported-before.options.no.label',
      },
      {
        value: 'Yes, within the last year',
        label: 'fields.exported-before.options.within-1-yr.label',
      },
      {
        value: 'Yes, within the last 2 years',
        label: 'fields.exported-before.options.within-2-yr.label',
      },
      {
        value: 'Yes, more than 2 years ago',
        label: 'fields.exported-before.options.more-2-yr.label',
      },
    ],
  },
};
