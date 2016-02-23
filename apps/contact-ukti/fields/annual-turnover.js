'use strict';

module.exports = {
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
};
