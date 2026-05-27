pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'npx playwright test --reporter=html'
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            archiveArtifacts artifacts: 'test-results/**/*', 
                             allowEmptyArchive: true
        }
        success {
            echo 'Tests passed!'
        }
        failure {
            echo 'Tests failed!'
            mail to: 'tahmidulslash@gmail.com',
            subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """
Hi,

Build failed! Details below:

Job Name      : ${env.JOB_NAME}
Build No      : ${env.BUILD_NUMBER}
Branch        : ${env.GIT_BRANCH}
Build Status  : ${currentBuild.currentResult}
Build Duration: ${currentBuild.durationString}
Build URL     : ${env.BUILD_URL}

Please check the logs and fix the issue.

- Jenkins
         """
}
    }
}