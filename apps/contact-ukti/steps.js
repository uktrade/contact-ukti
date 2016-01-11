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
    backLink: 'enquiry-reason',
    next: '/company-location',
  },
  '/company-location': {
    fields: [
      'inside-uk',
      'country',
    ],
    backLink: 'personal-details',
    next: '/company-details',
  },
  '/company-details': {
    fields: [
      'org-name',
      'org-type',
      'sector',
      'annual-turnover',
      'no-employees',
    ],
    backLink: 'company-location',
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
    backLink: 'company-details',
    next: '/enquiry',
  },
  '/enquiry': {
    fields: [
      'enquiry-description'
    ],
    backLink: 'company-address',
    next: '/confirm',
  },
  '/confirm': {
    controller: require('../common/controllers/confirm'),
    fields: [],
    backLink: 'enquiry',
    next: '/confirmation',
  },
  '/confirmation': {
    backLink: false,
    clearSession: true,
  }
};
