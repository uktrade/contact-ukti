'use strict';

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/enquiry-reason',
  },
  '/enquiry-reason': {
    controller: require('./controllers/reason'),
    fields: [
      'enquiry-reason',
      'enquiry-reason-other',
    ],
    next: '/personal-details',
  },
  '/previously-sold-overseas': {
    fields: [
      'exported-before',
    ],
    backLink: 'enquiry-reason',
    next: '/personal-details',
  },
  '/personal-details': {
    fields: [
      'fullname',
      'email',
      'no-email',
      'phone',
    ],
    next: '/company-location',
  },
  '/company-location': {
    controller: require('./controllers/company-location'),
    fields: [
      'inside-uk',
      'outside-uk',
    ],
    next: '/company-address',
  },
  '/company-address': {
    controller: require('./controllers/company-address'),
    fields: [
      'org-name',
      'org-address-house-number',
      'org-address-street',
      'org-address-town',
      'org-address-county',
      'org-address-postcode',
    ],
    next: '/operating-industry',
  },
  '/operating-industry': {
    fields: [
      'sector',
    ],
    next: '/company-details',
  },
  '/company-details': {
    controller: require('./controllers/company-details'),
    fields: [
      'org-type',
      'annual-turnover',
      'no-employees',
    ],
    next: '/enquiry',
  },
  '/enquiry': {
    fields: [
      'enquiry-description'
    ],
    next: '/confirm',
  },
  '/confirm': {
    controller: require('../common/controllers/confirm'),
    fields: [
      'data-protection',
    ],
    backLink: false,
    next: '/confirmation',
  },
  '/confirmation': {
    backLink: false,
    clearSession: true,
  }
};
