# Environment Variables

Variable                 | Description                                          | Default
------------------------ | ---------------------------------------------------- | ---------------------------------
`NODE_ENV`               | node environment                                     |
`PORT`                   | server port                                          | 8080
`LISTEN_HOST`            | the host to listen on                                | 0.0.0.0
`TRACKING_ID`            | analytics tracking id                                |
`FEEDBACK_EMAIL_ADDRESS` | email address for service feedback                   |
`POSTCODE_API`           | API endpoint for postcode server                     | http://api.postcodes.io/postcodes
`USE_AUTH`               | whether to use authentication for the application    |
`AUTH_USER`              | username for authentication                          |
`AUTH_PASS`              | password for authentication                          |
`SESSION_SECRET`         | session secret. **Must be set to encrypt sessions**  |
`SESSION_TTL`            | number of milliseconds before session expires        | 1800000 (30 minutes)
`REDIS_URL`              | redis url                                            |
`REDIS_PORT`             | redis port                                           | 6379
`REDIS_HOST`             | redis host                                           | 127.0.0.1
`LOG_LEVEL`              | Level of logging to user                             | warn
`SENTRY_DSN`             | data source name for [Sentry](https://getsentry.com) |
`WDIO_BASEURL`           | base URL for webdriver to use for acceptance tests   |

## Email service environment variables
(Will be removed from the app when the email service is created)

Variable        | Description                | Default
--------------- | -------------------------- | -----------------------
`EMAIL_PORT`    | smtp server port           | 587
`EMAIL_HOST`    | smtp server host           | localhost
`SMTP_USER`     | smtp username              | ''
`SMTP_PASSWORD` | smtp password              | ''
`FROM_ADDRESS`  | email address to send from | UKTI <info@ukti.gov.uk>

## Enquiry destination environment variables

Variable                      | Description                     | Default
----------------------------- | ------------------------------- | -------------------------------
`CASEWORKER_DEFAULT_EMAIL`    | default contact email address   | enquiries@ukti.gsi.gov.uk
`CASEWORKER_INVESTMENT_EMAIL` | investment enquiries            | enquiries@ukti-invest.com
`CASEWORKER_BIZOPS_EMAIL`     | business/export opportunities   | bizoppteam@ukti.gov.uk
`CASEWORKER_DSO_EMAIL`        | defence & security organisation | uktidso.enquiry@ukti.gsi.gov.uk
`CASEWORKER_EVENTS_EMAIL`     | events                          | enquiries@ukti.gsi.gov.uk
