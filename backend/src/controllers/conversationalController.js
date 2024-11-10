// src/controllers/conversationalController.js

const pythonService = require('../services/pythonService');
const contextService = require('../services/contextService');
const conversationService = require('../services/conversationService');
const { handleError } = require('../services/errorService');

exports.handleUserMessage = async (req, res) => {
    const { userId, message } = req.body;

    // Retrieve context from contextService
    const conversation = conversationService.getConversationContext(userId);
    let context = contextService.getContext(userId);

    try {
        // Determine next stage and get corresponding script
        const nextStage = conversationService.getNextStage(conversation.stage);
        const scriptPath = getScriptPath(nextStage);
        if (!scriptPath) return res.status(400).json({ error: 'Invalid stage' });

        // Run the Python script with context
        const response = await pythonService.runPythonScript(scriptPath, { message, context });

        // Update context and stage
        const updatedContext = contextService.updateContext(userId, response.context || context);
        const newStage = conversationService.updateStage(userId, nextStage, updatedContext);

        res.json({ response: response.message, stage: newStage, context: updatedContext });
    } catch (error) {
        handleError(res, error);
    }
};

// Helper function to map stages to script paths
const getScriptPath = (stage) => {
    const stageToScriptMap = {
        'start': 'conversational_agent.py',
        'clarify_requirements': 'requirements_agent.py',
        'design_architecture': 'architect_agent.py',
        'develop_frontend': 'frontend_agent.py',
        'develop_backend': 'backend_agent.py',
        'configure_database': 'database_agent.py',
        'integrate_apis': 'api_integration_agent.py',
        'quality_check': 'quality_agent.py',
        'security_scan': 'security_agent.py',
        'testing': 'testing_agent.py',
        'environment_setup': 'environment_setup_agent.py',
        'deployment': 'deployment_agent.py'
    };
    return stageToScriptMap[stage];
};
