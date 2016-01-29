'use strict';

module.exports = {
  'enquiry-description': {
    validate: ['required', {type: 'maxlength', arguments: [5000]}],
    legend: {
      className: 'visuallyhidden',
      value: 'pages.company-location.header',
    },
    attributes: [
      {
        attribute: 'rows',
        value: 5
      },
    ],
  },
};
