node {
   stage('Get Source') {
      // copy source code from local file system and test
      // for a Dockerfile to build the Docker image
      git(url: 'https://gitlab.com/flowtech/services/fiqc-dash.git',
       credentialsId: 'a99e08dc-d24e-4190-94a1-f58abf5baff5',
       branch: 'dev')
      if (!fileExists("Dockerfile")) {
         error('Dockerfile missing.')
      }
   }
   stage('Build Docker Image') {
       // build the docker image from the source code using the BUILD_ID parameter in image name
         sh "docker build -t fiqc-dashboard ."
   }
   stage("Stop Existing Container"){
        sh "docker stop fiqc-dashboard"
    }
   stage("Remove Existing Container"){
        sh "docker rm fiqc-dashboard"
    }
   stage("Run Docker Container"){
        sh "docker run -p 8000:8000 --name vue-dash fiqc-dashboard"
    }
}
