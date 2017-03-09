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
      },
      {
        target: '/previously-sold-overseas',
        condition: {
          field: 'enquiry-reason',
          value: 'Getting finance help'
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
      'contact-preference',
      'email',
      'phone',
    ],
    next: '/organisation-type',
  },
  '/organisation-type': {
    fields: [
      'org-type',
      'org-type-other',
    ],
    next: '/anything-else',
    forks: [
      {
        target: '/company-location',
        condition: {
          field: 'org-type',
          value: 'Company or organisation'
        }
      }
    ]
  },
  '/company-location': {
    controller: require('./controllers/company-location'),
    fields: [
      'inside-uk',
      'outside-uk',
      'uk-postcode',
      'company-number'
    ],
    backLink: 'organisation-type',
    next: '/company-details'
  },
  '/company-details': {
    controller: require('./controllers/company-details'),
    fields: [
      'org-name',
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
      'bank-referrer',
      'bank-referrer-name',
      'data-protection'
    ],
    backLink: false,
    next: '/confirmation',
  },
  '/confirmation': {
    controller: require('../common/controllers/confirmation'),
    backLink: false,
    clearSession: true,
  }
};
