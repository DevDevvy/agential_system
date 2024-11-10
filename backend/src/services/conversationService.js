// src/services/conversationService.js

const conversations = {}; // Store conversation context per user session

exports.getConversationContext = (userId) => {
    return conversations[userId] || { stage: 'start', context: {} };
};

exports.updateConversationContext = (userId, stage, contextUpdates) => {
    if (!conversations[userId]) conversations[userId] = { stage: 'start', context: {} };
    conversations[userId].stage = stage;
    Object.assign(conversations[userId].context, contextUpdates);
    return conversations[userId];
};

exports.getNextStage = (currentStage) => {
    const stageOrder = [
        'start', 'clarify_requirements', 'design_architecture',
        'develop_frontend', 'develop_backend', 'configure_database',
        'integrate_apis', 'quality_check', 'security_scan',
        'testing', 'environment_setup', 'deployment'
    ];
    const currentIndex = stageOrder.indexOf(currentStage);
    return stageOrder[currentIndex + 1] || 'deployment';
};

exports.updateStage = (userId, nextStage, context) => {
    return this.updateConversationContext(userId, nextStage, context).stage;
};

exports.resetConversation = (userId) => {
    delete conversations[userId];
};
