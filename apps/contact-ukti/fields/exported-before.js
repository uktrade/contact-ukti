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
        value: 'None',
        label: 'fields.exported-before.options.no.label',
      },
      {
        value: 'In the last year',
        label: 'fields.exported-before.options.within-1-yr.label',
      },
      {
        value: 'In the last 2 years',
        label: 'fields.exported-before.options.within-2-yr.label',
      },
      {
        value: 'Over 2 years ago',
        label: 'fields.exported-before.options.more-2-yr.label',
      },
    ],
  },
};
