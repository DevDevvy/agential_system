// src/services/contextService.js
const contexts = {}; // or use a database like Redis for persistence

exports.getContext = (userId) => contexts[userId] || {};
exports.updateContext = (userId, updatedData) => {
    contexts[userId] = { ...contexts[userId], ...updatedData };
};
exports.clearContext = (userId) => {
    delete contexts[userId];
};
