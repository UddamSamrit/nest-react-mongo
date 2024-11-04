
import axios from "axios";
const API_URL = "http://localhost:3002";

interface LoginResponse {
    refreshToken: string;
    accessToken: string;
    user: {
        _id: string;
        username: string;
    };
}

export const register = async (displayName: string, email: string ,username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, { displayName, email, username, password });
        return response.data;
    }catch (error) {
        return Promise.reject(error);
    }
};

export const login = async (username: string, password: string) => {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { username, password });
    return response.data;
};