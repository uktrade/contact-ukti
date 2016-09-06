# UKTI Contact Form
[![Build Status](https://img.shields.io/travis/UKTradeInvestment/contact-ukti.svg?style=flat-square)](https://travis-ci.org/UKTradeInvestment/contact-ukti)
[![Dependency Status (gemnasium)](https://img.shields.io/gemnasium/UKTradeInvestment/contact-ukti.svg?style=flat-square&label=dependencies%20%28Gemnasium%29)](https://gemnasium.com/UKTradeInvestment/contact-ukti)
[![Dependency Status (david)](https://img.shields.io/david/UKTradeInvestment/contact-ukti.svg?style=flat-square&label=dependencies%20%28David%29)](https://david-dm.org/UKTradeInvestment/contact-ukti)
[![devDependency Status](https://img.shields.io/david/dev/UKTradeInvestment/contact-ukti.svg?style=flat-square&label=devDependencies%20%28David%29)](https://david-dm.org/UKTradeInvestment/contact-ukti#info=devDependencies)

N.B. This project depends on Node version 0.12.9.

## Quick start
Install the dependencies and build the project resources

```bash
npm install
```

Initiate the server in development mode (Express is used to serve the static resources in development). You will need to have a Redis instance running as it is used to handle sessions.

```bash
npm run dev
```

See the [development documentation](./documentation/DEVELOPMENT.MD) for a complete description of the application and how to maintain and support BRP.

## Start application
Start the application in default mode (production).

```bash
npm start
```

## Development
Start the application with [Nodemon](https://www.npmjs.com/package/nodemon) in development mode. Debug is switched on and the server restarts when the JS or Sass are recompiled.

```bash
npm run dev
```

## Assets
Compile the Sass to CSS

```bash
npm run sass
```

Compile JS using [Browserify](http://browserify.org/)

```bash
npm run browserify
```

## Tests
To run all unit and acceptance tests and linting run:

```bash
npm run test
```

### Unit tests
Unit tests are run using [Mocha](https://mochajs.org/). Tests are defined in [`./test/unit`](./test/unit/)

```bash
npm run test:unit
```

### Acceptance tests
Acceptance tests use [webdriverio](http://webdriver.io/) and [cucumber-js](https://github.com/cucumber/cucumber-js) to run feature tests

```bash
npm run test:acceptance
```

### Linting and code style
Run the EcmaScript (ES) linter.  Rules are defined in [.eslintrc](./.eslintrc)

```bash
npm run lint
```

Run the jscs style checker. Rules are defined in [.jscsrc.json](./.jscsrc.json)

```bash
npm run style
```

## Code coverage
Analyse the test coverage of the codebase (for results - open [./reports/coverage/lcov-report/index.html](./reports/coverage/lcov-report/index.html))

```bash
npm run coverage
```

or using environment variable on unit tests

```bash
export npm_config_coverage=true
npm run test:unit
```

## Code quality
Analyse the quality of the codebase (for results - open [./reports/plato/index.html](./reports/plato/index.html))

```bash
npm run quality
```

## Development SMTP Server
[Maildev](http://djfarrelly.github.io/MailDev/) can be run as a development SMTP server to catch emails being sent and preview the results.

```bash
npm run maildev
```

--------------------------------------------------------------------------------

- See the [package.json](./package.json) for a full list of scripts.
- Full list of [environment variables](./documentation/ENVIRONMENT_VARIABLES.md)
