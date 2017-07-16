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
            steps  {
                echo "Deploying to....${params.environment}"

                sh 'cf target -o ${params.paas_org} -s ${params.environment}-${params.paas_space}'
                sh 'git clone ${params.github_url}/${params.project_name}-envs.git'

                script {
                    if ("dev" == "dev") {
                        sh "cd contact-ukti-envs; git checkout dev"
                    }
                }

                sh 'while read env_var; do cf set-env {params.project_name} $env_var;done < ${params.project_name}-envs/Paasenvfile'
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
