// src/services/qualityService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const checkCodeQuality = async (files) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/quality/check`, { files });
        return response.data;
    } catch (error) {
        console.error("Error checking code quality:", error);
        throw error;
    }
};

export const getQualityResults = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/agents/quality/results`);
        return response.data;
    } catch (error) {
        console.error("Error getting quality results:", error);
        throw error;
    }
};
