//better-reads/src/utilities/user-api.js
import sendRequest from './send-request';
const BASE_URL = '/api/users';

export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export async function updateUser(userData) {
  return sendRequest(`${BASE_URL}/update`, 'PUT', userData);
}

export async function getUser(userId) {
  return sendRequest(`${BASE_URL}/${userId}`);
}
