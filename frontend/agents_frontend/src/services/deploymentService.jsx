// src/services/deploymentService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const containerizeApplication = async (services) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/deployment/containerize`, { services });
        return response.data;
    } catch (error) {
        console.error("Error containerizing application:", error);
        throw error;
    }
};

export const deployApplication = async (environment) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/deployment/deploy`, { environment });
        return response.data;
    } catch (error) {
        console.error("Error deploying application:", error);
        throw error;
    }
};

export const getDeploymentStatus = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/agents/deployment/status`);
        return response.data;
    } catch (error) {
        console.error("Error getting deployment status:", error);
        throw error;
    }
};
