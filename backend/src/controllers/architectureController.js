// src/controllers/architectureController.js

const pythonService = require('../services/pythonService');
const { handleError } = require('../services/errorService');
const contextService = require('../services/contextService');

exports.designArchitecture = async (req, res) => {
    const { userId } = req.body;

    // Step 1: Retrieve context from contextService
    const context = contextService.getContext(userId);
    try {
        const response = await pythonService.runPythonScript('architect_agent.py', { context });
        // Step 3: Update context with response
        const updatedContext = contextService.updateContext(userId, response.context);

        res.json({ message: response.message, context: updatedContext });
    } catch (error) {
        handleError(res, error);
    }
};


exports.getArchitectureStatus = async (req, res) => {
    try {
        const response = await pythonService.runPythonScript('architect_agent.py', { action: 'status' });
        res.json(response);
    } catch (error) {
        handleError(res, error);
    }
};
