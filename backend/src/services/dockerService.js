// src/services/dockerService.js
const { exec } = require('child_process');

exports.buildAndRunContainer = (context) => {
    const dockerConfig = context.environment_setup || {};
    return new Promise((resolve, reject) => {
        const buildCommand = 'docker build -t generated-app .';
        const runCommand = 'docker run -d -p 4000:80 generated-app';

        exec(buildCommand, (buildError, buildStdout, buildStderr) => {
            if (buildError) {
                return reject(`Docker build failed: ${buildStderr}`);
            }
            console.log(`Docker build output: ${buildStdout}`);

            exec(runCommand, (runError, runStdout, runStderr) => {
                if (runError) {
                    return reject(`Docker run failed: ${runStderr}`);
                }
                console.log(`Docker run output: ${runStdout}`);
                resolve(`Docker container running on http://localhost:4000`);
            });
        });
    });
};

exports.getContainerStatus = () => {
    return new Promise((resolve, reject) => {
        exec("docker ps | grep 'generated-app'", (error, stdout, stderr) => {
            if (error) {
                return resolve({ status: 'stopped' });
            }
            resolve({ status: stdout ? 'running' : 'stopped' });
        });
    });
};
