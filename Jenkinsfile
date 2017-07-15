pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'

            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                echo 'Printing Env settings...'
                echo sh(returnStdout: true, script: 'env')
                sh 'cf target -o dit-services -s dev-exopps'
                sh 'cf set-env contact-ukti AUTH_PASS $AUTH_PASS'
                sh 'cf set-env contact-ukti AUTH_USER $AUTH_USER'
                sh 'cf set-env contact-ukti CASEWORKER_BCC_EMAIL $CASEWORKER_BCC_EMAIL'
                sh 'cf set-env contact-ukti CASEWORKER_DEFAULT_EMAIL $CASEWORKER_DEFAULT_EMAIL'
                sh 'cf set-env contact-ukti CASEWORKER_INVESTMENT_EMAIL $CASEWORKER_INVESTMENT_EMAIL'
                sh 'cf set-env contact-ukti CASEWORKER_BIZOPS_EMAIL $CASEWORKER_BIZOPS_EMAIL'
                sh 'cf set-env contact-ukti CASEWORKER_DSO_EMAIL $CASEWORKER_DSO_EMAIL'
                sh 'cf set-env contact-ukti CASEWORKER_EVENTS_EMAIL $CASEWORKER_EVENTS_EMAIL'
                sh 'cf set-env contact-ukti EMAIL_HOST $EMAIL_HOST'
                sh 'cf set-env contact-ukti EMAIL_PORT $EMAIL_PORT'
                sh 'cf set-env contact-ukti FEEDBACK_EMAIL_ADDRESS $FEEDBACK_EMAIL_ADDRESS'
                sh 'cf set-env contact-ukti LOG_LEVEL $LOG_LEVEL'
                sh 'cf set-env contact-ukti REDIS_HOST $REDIS_HOST'
                sh 'cf set-env contact-ukti REDIS_PORT $REDIS_PORT'
                sh 'cf set-env contact-ukti REDIS_URL $REDIS_URL'
                sh 'cf set-env contact-ukti REDIS_USE_SENTINEL $REDIS_USE_SENTINEL'
                sh 'cf set-env contact-ukti SENTRY_DSN $SENTRY_DSN'
                sh 'cf set-env contact-ukti SESSION_SECRET $SESSION_SECRET'
                sh 'cf set-env contact-ukti SMTP_PASSWORD $SMTP_PASSWORD'
                sh 'cf set-env contact-ukti SMTP_USER $SMTP_USER'
                sh 'cf set-env contact-ukti STUNNEL_ENABLED $STUNNEL_ENABLED'
                sh 'cf set-env contact-ukti USE_AUTH $USE_AUTH'
                sh 'cf set-env contact-ukti ZENDESK_API_KEY $ZENDESK_API_KEY'
                sh 'cf set-env contact-ukti ZENDESK_TAG $ZENDESK_TAG'
                sh 'cf set-env contact-ukti ZENDESK_URL $ZENDESK_URL'
                sh 'cf push contact-ukti'
                sh 'sleep 10'
            }
        }
    }

    post {
        success {
		      echo 'Success'
        }
        failure {
		      echo 'Failure'
        }
    }
}
