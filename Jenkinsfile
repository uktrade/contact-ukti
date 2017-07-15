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

                sh 'cf target -o dit-services -s dev-exopps'
                sh 'git clone git@gitlab.ci.uktrade.io:webops/contact-ukti-envs.git'

                echo "${params.Environment}"
                echo "${params.Environment.trim()}"

                script {

                    if ("${params.Environment.trim()}".equals("development")) {
                    
                        git checkout "${params.Environment}"
                    }
                }

                sh 'while read envs; do cf set-env contact-ukti $envs;done < contact-ukti-envs/paas_environment_file'

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
