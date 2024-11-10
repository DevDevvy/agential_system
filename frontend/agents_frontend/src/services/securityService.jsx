// src/services/securityService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const runSecurityScan = async (modules) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/security/scan`, { modules });
        return response.data;
    } catch (error) {
        console.error("Error running security scan:", error);
        throw error;
    }
};

export const getSecurityResults = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/agents/security/results`);
        return response.data;
    } catch (error) {
        console.error("Error getting security results:", error);
        throw error;
    }
};
