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
                sh 'cf set-env contact-ukti ZENDESK_URL https://staging-uktrade.zendesk.com/api/v2'
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
