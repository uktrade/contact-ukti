'use strict';

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/topic',
  },
  '/topic': {
    fields: [
      'enquiry-reason',
      'enquiry-reason-other',
    ],
    next: '/personal-details',
    forks: [
      {
        target: '/previously-sold-overseas',
        condition: {
          field: 'enquiry-reason',
          value: 'Exporting from the UK'
        }
      }
    ]
  },
  '/previously-sold-overseas': {
    fields: [
      'exported-before',
    ],
    backLink: 'topic',
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
      'uk-postcode',
    ],
    next: '/organisation-type',
  },
  '/organisation-type': {
    fields: [
      'org-type',
    ],
    next: '/company-details',
  },
  '/company-details': {
    controller: require('./controllers/company-details'),
    fields: [
      'sector',
      'annual-turnover',
      'no-employees',
    ],
    next: '/anything-else',
  },
  '/anything-else': {
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
