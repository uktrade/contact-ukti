'use strict';

/*eslint no-process-env: 0*/
/*eslint no-inline-comments: 0*/
/*eslint camelcase: 0*/
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 8080,
  listen_host: process.env.LISTEN_HOST || '0.0.0.0',
  trackingId: process.env.TRACKING_ID,
  feedbackEmail: process.env.FEEDBACK_EMAIL_ADDRESS,
  postcodeApi: process.env.POSTCODE_API || 'http://api.postcodes.io/postcodes',
  auth: {
    use: process.env.USE_AUTH,
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
  session: {
    secret: process.env.SESSION_SECRET || 'howdoesyourgardengrow',
    ttl: process.env.SESSION_TTL || (30 * 60 * 1000) /* 30 mins timeout */
  },
  sentry: {
    dsn: process.env.SENTRY_DSN
  },
  memcached: {
    hosts: process.env.MEMCACHEDCLOUD_SERVERS || 'localhost:11211',
    username: process.env.MEMCACHEDCLOUD_USERNAME,
    password: process.env.MEMCACHEDCLOUD_PASSWORD
  },
  email: {
    caseworker: {
      default: process.env.CASEWORKER_DEFAULT_EMAIL || 'enquiries@ukti.gsi.gov.uk',
      investment: process.env.CASEWORKER_INVESTMENT_EMAIL || 'enquiries@ukti-invest.com',
      bizops: process.env.CASEWORKER_BIZOPS_EMAIL || 'bizoppteam@ukti.gov.uk',
      dso: process.env.CASEWORKER_DSO_EMAIL || 'uktidso.enquiry@ukti.gsi.gov.uk',
      events: process.env.CASEWORKER_EVENTS_EMAIL || 'enquiries@ukti.gsi.gov.uk',
    },
    port: process.env.EMAIL_PORT || 1025,
    host: process.env.EMAIL_HOST || 'localhost',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || ''
    },
    from: process.env.FROM_ADDRESS || 'UKTI <info@ukti.gov.uk>'
  },
  // webdriverio
  webdriver: {
    baseUrl: process.env.WDIO_BASEURL || 'http://localhost:8080'
  }
};
