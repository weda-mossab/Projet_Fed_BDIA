/**
 * Backend Service
 * Service layer for backend API communication
 */

import apiClient, { APIError } from '../utils/apiClient';
import API_CONFIG from '../config/api.config';

/**
 * Test backend connection
 * @returns {Promise<{status: string, message: string}>}
 */
export async function testBackend() {
  try {
    return await apiClient.get(API_CONFIG.endpoints.test);
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new Error('Cannot reach backend');
  }
}

/**
 * Get hello message from backend
 * @returns {Promise<{message: string}>}
 */
export async function sayHello() {
  try {
    return await apiClient.get(API_CONFIG.endpoints.hello);
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new Error('Backend not available');
  }
}

/**
 * Add two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {Promise<{result: number}>}
 */
export async function addNumbers(a, b) {
  try {
    return await apiClient.post(API_CONFIG.endpoints.add, { a, b });
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new Error('Error calling API');
  }
}

export default {
  testBackend,
  sayHello,
  addNumbers,
};
