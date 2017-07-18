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
                sh "git clone ${params.github_url}/${params.project_name}-envs.git"
                
                script {
                    if ("${params.environment}" == "production") {
                        sh "cf target -o ${params.paas_org} -s ${params.paas_space}"
                    } else {
                        sh "cf target -o ${params.paas_org} -s ${params.environment}-${params.paas_space}"
                    }
                }
                
                sh "while read env_var; do cf set-env ${params.project_name} \$env_var;done < ${params.project_name}-envs/${params.environment}/Paasenvfile"
                sh "cf push ${params.project_name}"
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