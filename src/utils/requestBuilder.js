import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const getHeaders = (token = null, customHeaders = {}) => {
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...customHeaders,
    };
};

export const post = async (endpoint, data = {}, token = null, customHeaders = {}) => {
    try {
        const url = BASE_URL + endpoint;
        const headers = getHeaders(token, customHeaders);
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error(`API POST error (${endpoint}):`, error?.response?.data || error.message);
        throw error;
    }
};

export const get = async (endpoint, params = {}, token = null, customHeaders = {}) => {
    try {
        const url = BASE_URL(endpoint);
        const headers = getHeaders(token, customHeaders);
        const response = await axios.get(url, { params, headers });
        return response.data;
    } catch (error) {
        console.error(`API GET error (${endpoint}):`, error?.response?.data || error.message);
        throw error;
    }
};





