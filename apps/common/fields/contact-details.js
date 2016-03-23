'use strict';

module.exports = {
  'contact-preference': {
    validate: ['required'],
    className: 'form-group inline',
    legend: {
      className: 'form-label-bold',
      value: 'fields.contact-preference.legend'
    },
    options: [
      {
        value: 'phone',
        label: 'fields.contact-preference.options.phone.label',
        toggle: 'phone-group',
      },
      {
        value: 'email',
        label: 'fields.contact-preference.options.email.label',
        toggle: 'email-group',
      },
    ],
  },
  email: {
    validate: ['required', 'email'],
    type: 'email',
    dependent: {
      value: 'email',
      field: 'contact-preference'
    }
  },
  phone: {
    formatter: ['removespaces'],
    validate: ['required', 'phonenumber'],
    dependent: {
      value: 'phone',
      field: 'contact-preference'
    }
  },
};
