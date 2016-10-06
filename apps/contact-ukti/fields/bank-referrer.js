'use-strict';

module.exports = {
  'bank-referrer': {
    options: [
      {
        value: 'yes',
        label: 'fields.bank-referrer.options.yes.label',
        toggle: 'bank-referrer-options'
      },
      {
        value: 'no',
        label: 'fields.bank-referrer.options.no.label'
      }
    ]
  },
  'bank-referrer-options':{
    className: 'bank-referrer-options panel-indent',
    dependent: {
      value: 'yes',
      field: 'bank-referrer',
    },
    options: [
      {
        value: 'Barclays',
        label: 'fields.bank-referrer-options.options.barclays.label'
      },
      {
        value: 'HSBC',
        label: 'fields.bank-referrer-options.options.hsbc.label'
      },
      {
        value: 'Lloyds',
        label: 'fields.bank-referrer-options.options.lloyds.label'
      },
      {
        value: 'RBS',
        label: 'fields.bank-referrer-options.options.rbs.label'
      },
      {
        value: 'Santander',
        label: 'fields.bank-referrer-options.options.santander.label'
      }
    ]
  }
};
