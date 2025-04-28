import axios from 'axios';
import {env} from "@/config/env.ts";
import useAuthStore from "@/store/authStore.ts";

const BASE_URL = env.API_URL;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
});

axiosInstance.interceptors.request.use(
    (config) => {
        const {accessToken} = useAuthStore.getState()

        console.log("Access Token", accessToken)

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


// Response Interceptor: Handle Token Refresh
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await useAuthStore.getState().refreshToken()

                if (!newAccessToken) {
                    console.log("No new access token")
                    return Promise.reject(error);
                }

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.log("Token refresh failed", refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
