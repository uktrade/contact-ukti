pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps  {
                echo "Deploying to...${params.environment}"
                sh "git clone ${params.github_url}/${params.project_name}-envs.git"
                
                script {
                    if ("${params.environment}" == "production") {
                            env.app_space = "${params.paas_space}"
                            env.app_name = "${params.project_name}"
                        } else {
                            env.app_space = "${params.environment}-${params.paas_space}"
                            env.app_name = "${params.project_name}-${params.environment}"
                        }
                }
                
                sh "cf login -a api.cloud.service.gov.uk -u ${params.cf_username} -p ${params.cf_password} -s ${env.app_space}"
                sh "cf push ${env.app_name} --no-start"
                sh "while read env_var; do cf set-env ${env.app_name} \$env_var;done < ${params.project_name}-envs/${params.environment}/Paasenvfile"
                sh "cf push ${env.app_name}" 
            }
        }
    }
    post {
        success {
		      echo "SUCCESS"
          //githubNotify(
              //  status: "SUCCESS",
               // description: "Tests Passed",
                //credentialsId: "7ba5c792-f75d-471f-b8be-ec2535b4386f",
                //account: "uktrade",
                //repo: "${params.project_name}")
        }
        failure {
		      echo "Failure"
          //githubNotify(
              //  status: "FAILURE",
                //description: "Tests Failed",
                //credentialsId: "7ba5c792-f75d-471f-b8be-ec2535b4386f",
                //account: "uktrade",
                //repo: "${params.project_name}")
        }
    }
}
