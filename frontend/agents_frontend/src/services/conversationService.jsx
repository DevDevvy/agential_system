// src/services/conversationService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const startConversation = async (projectName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/conversation/start`, { projectName });
        return response.data;
    } catch (error) {
        console.error("Error starting conversation:", error);
        throw error;
    }
};

export const clarifyConversation = async (clarification) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/conversation/clarify`, { clarification });
        return response.data;
    } catch (error) {
        console.error("Error clarifying conversation:", error);
        throw error;
    }
};

export const confirmConversation = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/conversation/confirm`, { confirmRequirements: true });
        return response.data;
    } catch (error) {
        console.error("Error confirming conversation:", error);
        throw error;
    }
};
