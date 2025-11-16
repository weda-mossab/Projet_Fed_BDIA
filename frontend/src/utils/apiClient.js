/**
 * API Client
 * Centralized HTTP client with error handling and request interceptors
 */

import API_CONFIG from '../config/api.config';

/**
 * Custom API Error class
 */
export class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Handle API response
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `HTTP Error: ${response.status}`;
    let errorData = null;

    try {
      errorData = await response.json();
      errorMessage = errorData.message || errorData.detail || errorMessage;
    } catch (e) {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }

    throw new APIError(errorMessage, response.status, errorData);
  }

  // Handle empty responses
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }

  return null;
};

/**
 * Create fetch request with timeout
 */
const fetchWithTimeout = (url, options, timeout = API_CONFIG.timeout) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new APIError('Request timeout', 408)), timeout)
    ),
  ]);
};

/**
 * Make API request
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.baseURL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      ...API_CONFIG.headers,
      ...options.headers,
    },
  };

  // Add body if provided
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetchWithTimeout(url, config, API_CONFIG.timeout);
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    // Network or other errors
    throw new APIError(
      error.message || 'Network error. Please check your connection.',
      0,
      null
    );
  }
};

/**
 * HTTP Methods
 */
export const apiClient = {
  get: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'GET' }),

  post: (endpoint, data = null, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'POST',
      body: data,
    }),

  put: (endpoint, data = null, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: data,
    }),

  patch: (endpoint, data = null, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'PATCH',
      body: data,
    }),

  delete: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'DELETE' }),
};

export default apiClient;

