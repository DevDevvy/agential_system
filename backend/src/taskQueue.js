// Install Bull: npm install bull
const Queue = require('bull');
const taskQueue = new Queue('tasks');

taskQueue.process(async (job) => {
    const { agent, context } = job.data;
    return await pythonService.runPythonScript(`${agent}.py`, { context });
});

exports.addTaskToQueue = (agent, context) => {
    taskQueue.add({ agent, context });
};
