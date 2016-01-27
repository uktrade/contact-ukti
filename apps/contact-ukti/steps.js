'use strict';

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/enquiry-reason',
  },
  '/enquiry-reason': {
    fields: [
      'enquiry-reason',
      'enquiry-reason-other',
    ],
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
    next: '/company-details',
  },
  '/company-details': {
    controller: require('./controllers/company-details'),
    fields: [
      'org-name',
      'org-type',
      'annual-turnover',
      'no-employees',
    ],
    next: '/operating-industry',
  },
  '/operating-industry': {
    controller: require('./controllers/operating-industry'),
    fields: [
      'sector',
    ],
    next: '/company-address',
  },
  '/previously-sold-overseas': {
    fields: [
      'exported-before',
    ],
    backLink: 'operating-industry',
    next: '/company-address',
  },
  '/company-address': {
    fields: [
      'org-address-house-number',
      'org-address-street',
      'org-address-town',
      'org-address-county',
      'org-address-postcode',
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
    next: '/confirmation',
  },
  '/confirmation': {
    backLink: false,
    clearSession: true,
  }
};
