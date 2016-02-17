'use strict';

module.exports = {
  'enquiry-description': {
    validate: ['required', {type: 'maxlength', arguments: [5000]}],
    labelClassName: 'visuallyhidden',
    attributes: [
      {
        attribute: 'rows',
        value: 5
      },
    ],
  },
};
