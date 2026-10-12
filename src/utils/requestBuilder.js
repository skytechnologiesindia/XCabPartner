import axios from "axios";

// Default API Base URL for Driver/Partner App
export const BASE_URL = process.env.BASE_URL || "https://extinct-fester-crop.ngrok-free.dev/v1";

const getHeaders = (token = null, customHeaders = {}) => {
    return {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...customHeaders,
    };
};

const formatUrl = (endpoint) => {
    const cleanBase = BASE_URL.replace(/\/+$/, "");
    const cleanEndpoint = endpoint.replace(/^\/+/, "");
    return `${cleanBase}/${cleanEndpoint}`;
};

export const post = async (endpoint, data = {}, token = null, customHeaders = {}) => {
    try {
        const url = formatUrl(endpoint);
        const headers = getHeaders(token, customHeaders);
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        const errorData = error?.response?.data;
        console.error(`API POST error (${endpoint}):`, errorData || error.message);
        throw error;
    }
};

export const get = async (endpoint, params = {}, token = null, customHeaders = {}) => {
    try {
        const url = formatUrl(endpoint);
        const headers = getHeaders(token, customHeaders);
        const response = await axios.get(url, { params, headers });
        return response.data;
    } catch (error) {
        const errorData = error?.response?.data;
        console.error(`API GET error (${endpoint}):`, errorData || error.message);
        throw error;
    }
};






