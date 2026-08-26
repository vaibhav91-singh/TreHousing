export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend.treehousingpublications.com';

/**
 * Returns the full API URL given an endpoint path.
 * In development, if VITE_API_BASE_URL is relative or proxied, it uses relative routes.
 * In production, it prepends the configured VITE_API_BASE_URL.
 */
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
