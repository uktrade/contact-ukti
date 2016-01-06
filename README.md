# UKTI Contact Form

A simple form to email contact form which captures a companies information and sends an email to the relevant team within UKTI.

## Dependencies

* [NodeJS](https://nodejs.org/en/)

## Install

Clone this repository

```bash
git clone https://github.com/UKTradeInvestment/contact-ukti.git
```

Move into the new directory

```bash
cd contact-ukti
```

Install project dependencies

```bash
npm install
```

Create environment variables

```bash
export SMTP_USER=[Add your SMTP username]
export SMTP_PASS=[Add your SMTP password]
export FROM_ADDR=[Add the address to send emails from]
export TO_ADDR=[Add the address to send emails to]
export SECRET=[Secret used to create session]
```

Start the express application

```bash
npm start
```

## Development

For development it is recommended to use [Nodemon](https://github.com/remy/nodemon) to restart the node application after file changes and [Foreman](https://github.com/ddollar/foreman) to allow multiple processes to run and initially load environment variables from a `.env` file.

[Webpack](https://webpack.github.io/) is used to compile javascript modules and is currently listed in devDependencies so ensure all development dependencies are also installed before proceeding.

1. Install Nodemon

  ```bash
  npm install nodemon -g
  ```

2. Install Foreman (_requires Ruby_)

  ```bash
  gem install foreman
  ```

3. Create a `.env` file at the project root and add the following contents:

  ```bash
  SMTP_USER=[Add your SMTP username]
  SMTP_PASS=[Add your SMTP password]
  FROM_ADDR=[Add the address to send emails from]
  TO_ADDR=[Add the address to send emails to]
  SECRET=[Secret used to create session]
  ```

4. Create a `dev.Procfile` at the project root and add the following contents:

  ```procfile
  web: nodemon
  webpack: node_modules/.bin/webpack --watch
  ```

4. Run foreman using this Procfile:

  ```bash
  foreman start --procfile dev.Procfile
  ```
