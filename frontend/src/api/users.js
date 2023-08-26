import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (userId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, updatedData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const promoteUserToAdmin = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}/promote`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const demoteAdminToUser = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}/demote`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
