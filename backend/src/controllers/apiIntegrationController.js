// src/controllers/apiIntegrationController.js

const pythonService = require('../services/pythonService');
const { handleError } = require('../services/errorService');
const contextService = require('../services/contextService');

exports.integrateAPIs = async (req, res) => {
    const { userId } = req.body;

    // Step 1: Retrieve context from contextService
    const context = contextService.getContext(userId);

    try {
        // Step 2: Pass context to the agent
        const response = await pythonService.runPythonScript('api_integration_agent.py', { context });

        // Step 3: Update context with response
        const updatedContext = contextService.updateContext(userId, response.context);

        res.json({ message: response.message, context: updatedContext });
    } catch (error) {
        handleError(res, error);
    }
};