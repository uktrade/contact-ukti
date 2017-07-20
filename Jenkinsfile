pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo "Building..."
            }
        }
        stage('Test') {
            steps {
                echo "Testing..."
            }
        }
        stage('Deploy') {
            steps  {
                echo "Deploying to...${params.environment}"
                sh "cf login -a api.cloud.service.gov.uk -u ${params.cf_username} -p ${params.cf_password}"
                sh "git clone ${params.github_url}/${params.project_name}-envs.git"
                
                script {
                    if ("${params.environment}" == "production") {
                        sh "cf target -o ${params.paas_org} -s ${params.paas_space}"
                        env.app_name = "${params.project_name}"
                    } else {
                        sh "cf target -o ${params.paas_org} -s ${params.environment}-${params.paas_space}"
                        env.app_name = "${params.project_name}-${params.environment}"
                    }
                }
                
                sh "cf push ${env.app_name} --no-start"
                sh "while read env_var; do cf set-env ${env.app_name} \$env_var;done < ${params.project_name}-envs/${params.environment}/Paasenvfile"
                sh "cf push ${env.app_name}"
                sh "sleep 10"
            }
        }
    }
    post {
        success {
		      echo "SUCCESS"
        }
        failure {
		      echo "Failure"
        }
    }
}