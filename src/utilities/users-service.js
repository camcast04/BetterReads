//better-reads/src/utilities/user-service.js
import * as usersAPI from './users-api';

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
  // getItem will return null if the key does not exists
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not milliseconds
  if (payload.exp * 1000 < Date.now()) {
    // Token has expired
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export async function getUser() {
  const token = getToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Fetch the latest user data
  return usersAPI.getUser(payload.user._id);
}

export async function updateUser(userData) {
  const updatedUser = await usersAPI.updateUser(userData);
  localStorage.setItem('token', updatedUser.token); 
  return updatedUser;
}
