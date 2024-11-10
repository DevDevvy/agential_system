// src/services/testingService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const runTests = async (tests) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/testing/run`, { tests });
        return response.data;
    } catch (error) {
        console.error("Error running tests:", error);
        throw error;
    }
};

export const getTestResults = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/agents/testing/results`);
        return response.data;
    } catch (error) {
        console.error("Error getting test results:", error);
        throw error;
    }
};
