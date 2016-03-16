'use strict';

/* eslint no-process-env: 0*/
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 8080,
  listenHost: process.env.LISTEN_HOST || '0.0.0.0',
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
    // 30 mins timeout
    ttl: process.env.SESSION_TTL || (30 * 60 * 1000)
  },
  redis: {
    url: process.env.REDIS_URL || process.env.REDISTOGO_URL,
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  logLevel: process.env.LOG_LEVEL || 'warn',
  sentry: {
    dsn: process.env.SENTRY_DSN
  },
  email: {
    caseworker: {
      blindCopy: process.env.CASEWORKER_BCC_EMAIL,
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
    from: process.env.FROM_ADDRESS || 'UK Trade & Investment <no-reply@contactus.ukti.gov.uk>'
  },
  // webdriverio
  webdriver: {
    baseUrl: process.env.WDIO_BASEURL || 'http://localhost:8080'
  },
  // heroku releases
  release: process.env.HEROKU_RELEASE_VERSION || null
};
