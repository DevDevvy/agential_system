// src/controllers/qualityController.js
const pythonService = require('../services/pythonService');
const { handleError } = require('../services/errorService');
const contextService = require('../services/contextService');

exports.checkCodeQuality = async (req, res) => {
    const { userId } = req.body;

    // Step 1: Retrieve context from contextService
    const context = contextService.getContext(userId);

    try {
        const response = await pythonService.runPythonScript('quality_agent.py', { context });
        const updatedContext = contextService.updateContext(userId, response.context);

        res.json({ message: response.message, context: updatedContext });
    } catch (error) {
        handleError(res, error);
    }
};


exports.getQualityResults = async (req, res) => {
    try {
        const response = await pythonService.runPythonScript('quality_agent.py', { action: 'results' });
        res.json(response);
    } catch (error) {
        handleError(res, error);
    }
};
