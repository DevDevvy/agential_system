// src/services/pythonService.js
const { spawn } = require('child_process');
const path = require('path');

exports.runPythonScript = (scriptName, inputData) => {
    return new Promise((resolve, reject) => {
        // Construct the full path to the Python script in the `agents` directory
        const scriptPath = path.join(__dirname, '../../../agents', scriptName);

        const python = spawn('python3', [scriptPath]);
        let data = '';
        let error = '';

        python.stdout.on('data', (chunk) => data += chunk);
        python.stderr.on('data', (chunk) => error += chunk);

        python.on('close', (code) => {
            if (code !== 0) {
                reject(`Python script exited with code ${code}: ${error}`);
            } else {
                try {
                    resolve(JSON.parse(data));
                } catch (parseError) {
                    reject(`Error parsing JSON response: ${parseError}`);
                }
            }
        });

        python.stdin.write(JSON.stringify(inputData));
        python.stdin.end();
    });
};

