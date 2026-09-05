import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend.trehousingpublications.com';

// Set default base URL for axios
axios.defaults.baseURL = API_BASE_URL;

// Global fetch wrapper to handle relative /api URLs
const originalFetch = window.fetch;
window.fetch = function (url, config) {
  if (typeof url === 'string' && url.startsWith('/api')) {
    url = `${API_BASE_URL.replace(/\/$/, '')}${url}`;
  }
  return originalFetch(url, config);
};

export const getApiUrl = (endpoint = '') => {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL.replace(/\/$/, '')}${cleanEndpoint}`;
};

export default {
  API_BASE_URL,
  getApiUrl,
};

