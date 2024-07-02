import axios from "axios";
/* eslint-disable */

const BASE_URL = "http://localhost:8080";

export async function login(email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function register(userData, token) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUsers(token) {
  try {
    const response = await axios.get(`${BASE_URL}/adminuser/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(userId, token) {
  try {
    const response = await axios.get(`${BASE_URL}/adminuser/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(userId, userData, token) {
  try {
    const response = await axios.put(
      `${BASE_URL}/adminuser/update/${userId}`,
      userData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/adminuser/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function deleteUser(userId, token) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/adminuser/delete/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

//   Authentication Checker

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
}

export function isAdmin() {
  const role = localStorage.getItem("role");
  return role === "ADMIN";
}

export function isUser() {
  const role = localStorage.getItem("role");
  return role === "USER";
}

export function isUserAdmin() {
  const role = localStorage.getItem("role");
  return role === "USER" || role === "ADMIN";
}

export function isAdminOnly() {
  return isAuthenticated() && isAdmin;
}

export function isUserOnly() {
  return isAuthenticated() && isUser;
}

export function isUserAdminOnly() {
  return isAuthenticated() && isUserAdmin;
}
