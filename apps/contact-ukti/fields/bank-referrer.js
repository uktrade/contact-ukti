'use strict';

module.exports = {
  'bank-referrer': {
    className: 'form-group inline',
    options: [
      {
        value: 'Yes',
        label: 'fields.bank-referrer.options.yes.label',
        toggle: 'bank-referrer-name-group'
      },
      {
        value: 'No',
        label: 'fields.bank-referrer.options.no.label'
      }
    ]
  },

  'bank-referrer-name': {
    className: 'panel-indent',
    validate: ['required'],
    dependent: {
      value: 'Yes',
      field: 'bank-referrer',
    },
    options: [
      {
        value: 'Barclays',
        label: 'fields.bank-referrer-name.options.barclays.label'
      },
      {
        value: 'HSBC',
        label: 'fields.bank-referrer-name.options.hsbc.label'
      },
      {
        value: 'Lloyds',
        label: 'fields.bank-referrer-name.options.lloyds.label'
      },
      {
        value: 'RBS',
        label: 'fields.bank-referrer-name.options.rbs.label'
      },
      {
        value: 'Santander',
        label: 'fields.bank-referrer-name.options.santander.label'
      }
    ]
  }
};
