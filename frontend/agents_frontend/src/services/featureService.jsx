// src/services/featureService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const startFrontendDevelopment = async (components) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/feature/frontend`, { components });
        return response.data;
    } catch (error) {
        console.error("Error starting frontend development:", error);
        throw error;
    }
};

export const startBackendDevelopment = async (functions) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/feature/backend`, { functions });
        return response.data;
    } catch (error) {
        console.error("Error starting backend development:", error);
        throw error;
    }
};

export const configureDatabase = async (entities) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/feature/database`, { entities });
        return response.data;
    } catch (error) {
        console.error("Error configuring database:", error);
        throw error;
    }
};

export const integrateAPIs = async (services) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/feature/api`, { services });
        return response.data;
    } catch (error) {
        console.error("Error integrating APIs:", error);
        throw error;
    }
};
