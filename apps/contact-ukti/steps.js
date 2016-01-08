'use strict';

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/enquiry-reason',
  },
  '/enquiry-reason': {
    fields: [],
    next: '/personal-details',
  },
  '/personal-details': {
    fields: [],
    backLink: 'enquiry-reason',
    next: '/company-details',
  },
  '/company-details': {
    fields: [],
    backLink: 'personal-details',
    next: '/enquiry',
  },
  '/enquiry': {
    fields: [],
    backLink: 'company-details',
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
