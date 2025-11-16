/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:5000',
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000', 10),
  endpoints: {
    api: '/api',
    test: '/api/test',
    hello: '/api/hello',
    add: '/api/add',
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export default API_CONFIG;

