// src/controllers/deploymentController.js
const pythonService = require('../services/pythonService');
const { handleError } = require('../services/errorService');
const contextService = require('../services/contextService');


exports.containerizeApplication = async (req, res) => {
    const { userId } = req.body;

    // Step 1: Retrieve context from contextService
    const context = contextService.getContext(userId);
    try {
        const response = await pythonService.runPythonScript('deployment_agent.py', { context });
        const updatedContext = contextService.updateContext(userId, response.context);

        res.json({ message: response.message, context: updatedContext });
    } catch (error) {
        handleError(res, error);
    }
};

exports.deployApplication = async (req, res) => {
    const { environment } = req.body;
    try {
        const response = await pythonService.runPythonScript('deployment_agent.py', { environment });
        res.json(response);
    } catch (error) {
        handleError(res, error);
    }
};

exports.getDeploymentStatus = async (req, res) => {
    try {
        const response = await pythonService.runPythonScript('deployment_agent.py', { action: 'status' });
        res.json(response);
    } catch (error) {
        handleError(res, error);
    }
};
