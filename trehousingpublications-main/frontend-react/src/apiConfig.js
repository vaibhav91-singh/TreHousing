import axios from 'axios';

export const API_BASE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_DEV_BACKEND_URL || 'http://127.0.0.1:8000')
  : (import.meta.env.VITE_API_BASE_URL || 'https://backend.trehousingpublications.com');

// Set default base URL for axios
axios.defaults.baseURL = API_BASE_URL;

const originalFetch = window.fetch;
window.fetch = function (url, config) {
  if (typeof url === 'string') {
    let cleanUrl = url.trim();
    if (cleanUrl.startsWith('api/') || cleanUrl.startsWith('/api')) {
      if (!cleanUrl.startsWith('/')) {
        cleanUrl = '/' + cleanUrl;
      }
      url = `${API_BASE_URL.replace(/\/$/, '')}${cleanUrl}`;
    }
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

export const extractArrayData = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.results)) return data.results;
  if (Array.isArray(data.items)) return data.items;
  return [];
};

export default {
  API_BASE_URL,
  getApiUrl,
  extractArrayData,
};

