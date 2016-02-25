## Environment Variables

* `NODE_ENV` the application will log with lots of debug when it's set to 'development'. No default.
* `PORT` server port. Defaults to 8080.
* `LISTEN_HOST` the host to listen on. Defaults to '0.0.0.0'.
* `TRACKING_ID` analytics tracking id. No default.
* `FEEDBACK_EMAIL_ADDRESS` email address for service feedback. No default.
* `POSTCODE_API` API endpoint for postcode server. Defaults to 'http://api.postcodes.io/postcodes'.
* `USE_AUTH` whether to use authentication for the application. No default.
* `AUTH_USER` username for authentication. No default.
* `AUTH_PASS` password for authentication. No default.
* `SESSION_SECRET` session secret.
* `SESSION_TTL` number of seconds before session expires.
* `LOG_LEVEL` Level of logging to user. Defaults to 'warn'.
* `SENTRY_DSN` data source name for [Sentry](https://getsentry.com). No default
* `MEMCACHEDCLOUD_SERVERS` Memcached Cloud server locations. Should be comma separated string. Defaults to 'localhost:11211'.
* `MEMCACHEDCLOUD_USERNAME` Memcached Cloud username. No default.
* `MEMCACHEDCLOUD_PASSWORD` Memcached Cloud password. No default.
* `WDIO_BASEURL` base URL for webdriver to use for acceptance tests. No default.

### Email service environment variables
(Will be removed from the app when the email service is created)

* `EMAIL_PORT` email port. Defaults to 587.
* `EMAIL_HOST` smtp host. Defaults to 'email-smtp.eu-west-1.amazonaws.com'.
* `SMTP_USER` smtp username. Defaults to ''.
* `SMTP_PASSWORD` smtp password. Defaults to ''.
* `FROM_ADDRESS` email address to send from. Defaults to 'info@ukti.gov.uk'
