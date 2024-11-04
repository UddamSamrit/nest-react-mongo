import axios from 'axios';

const API_URL = "http://localhost:3002";

export const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // if (error.response && error.response.status === 401 && !originalRequest._retry) {
        console.log(error.status);
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const old_refresh_token = localStorage.getItem('refresh_token');
            console.log(old_refresh_token);
            if (old_refresh_token) {
                const response = await axios.post(`${API_URL}/auth/refresh`, { "refresh_token":old_refresh_token });
                console.log(response)

                const { newAccessToken } = response.data;

                localStorage.setItem('access_token', newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            }else{
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);
