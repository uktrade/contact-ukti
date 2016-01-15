#!/bin/bash

HEROKU_PIPELINE='contact-us'

REVIEW_APP_URL="${HEROKU_PIPELINE}-prod-pr-$1"

# check that the review app has been created
TIMEOUT_LIMIT=180  # in secs
TIMEOUT_SLEEP=5  # in secs
n=0
app_ready=false
until [ $n -ge $((TIMEOUT_LIMIT/TIMEOUT_SLEEP)) ]
do
  # lame way of checking if the app is up, improve...
  if heroku apps:info ${REVIEW_APP_URL} | grep -e Dynos:.*web ; then
    app_ready=true
    break
  fi

  n=$[$n+1]
  sleep $TIMEOUT_SLEEP
done

# if app not found => exit with error
if ! $app_ready ; then
  echo "App ${REVIEW_APP_URL} failed to bootstrap and timeout reached"
  exit 1
fi

# run unit tests
if ! heroku run 'npm run test' --app ${REVIEW_APP_URL}; then
  echo "Unit tests failing"
  exit 1
fi

# run acceptance tests
if ! heroku run 'npm run test:acceptance' --app ${REVIEW_APP_URL}; then
  echo "Acceptance tests failing"
  exit 1
fi
