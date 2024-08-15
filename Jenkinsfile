pipeline {

    agent any

    stages {

        stage('Checkout') {

            steps {
            
                git branch: 'main', url: 'https://github.com/Hardarmyyy/pick-n-pay-app'

                echo 'Source code from github repository'
            }

        }

        stage('Install dependencies') {

            steps {
                // Change directory to SERVER folder
                
                dir('SERVER') {
                        
                    sh 'npm install'

                    echo 'Installing dependencies'
                }

            }

        }

        stage('Build docker image') {

            steps {

                // Build Docker image with build-time environment arguments
                script {
                    // Retrieve the .env file from Jenkins credentials
                    withCredentials([file(credentialsId: 'env-picknpay-prod', variable: 'ENV_FILE')]) {
                        // Copy the .env file to the desired location
                        sh 'cp $ENV_FILE .env.prod'
                    }
                    // Run docker-compose with the environment file
                    sh "docker-compose -f docker-compose.prod.yaml --env-file .env.prod build --no-cache"

                }
            }

        }

        stage('Deploy docker image') {

            steps {
                // Deploy image to dockerhub registery
                withCredentials([usernamePassword(credentialsId: "${DOCKER_REGISTRY_CREDS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {

                    sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin docker.io"

                    sh "docker-compose -f docker-compose.prod.yaml --env-file .env.prod push"

                }
            }

        }

    }

    post {

        always {

            sh 'docker logout'
        }

        success {
            
            archiveArtifacts artifacts: '**', excludes: 'temp/**, *.log', allowEmptyArchive: true

            echo 'Build successful! Artifacts archived.'

            //clean workspace
            cleanWs()

        }

        failure {

            echo 'Build failed. Check the logs for details.'

            //clean workspace                  
            cleanWs()
        }

    }

}