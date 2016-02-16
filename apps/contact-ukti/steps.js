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
    backLink: '/enquiry-reason',
    next: '/personal-details',
  },
  '/personal-details': {
    controller: require('./controllers/personal-details'),
    fields: [
      'fullname',
      'email',
      'no-email',
      'phone',
    ],
    backLink: '/enquiry-reason',
    next: '/company-location',
  },
  '/company-location': {
    controller: require('./controllers/company-location'),
    fields: [
      'inside-uk',
      'outside-uk',
    ],
    backLink: '/personal-details',
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
    backLink: '/company-location',
    next: '/operating-industry',
  },
  '/operating-industry': {
    controller: require('./controllers/operating-industry'),
    fields: [
      'sector',
    ],
    backLink: '/company-address',
    next: '/company-details',
  },
  '/company-details': {
    controller: require('./controllers/company-details'),
    fields: [
      'org-type',
      'annual-turnover',
      'no-employees',
    ],
    backLink: '/operating-industry',
    next: '/enquiry',
  },
  '/enquiry': {
    fields: [
      'enquiry-description'
    ],
    backLink: '/company-details',
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
