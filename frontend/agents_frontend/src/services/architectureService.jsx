// src/services/architectureService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const designArchitecture = async (requirements) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/architecture/design`, { requirements });
        return response.data;
    } catch (error) {
        console.error("Error designing architecture:", error);
        throw error;
    }
};

export const getArchitectureStatus = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/agents/architecture/status`);
        return response.data;
    } catch (error) {
        console.error("Error getting architecture status:", error);
        throw error;
    }
};
