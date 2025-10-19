import { baseUrl } from '@/config/global';
import axios from 'axios';
import { TokenManager } from '@/utils/tokenManager';

/**
 * @function createAxiosInstance
 * @description Creates axios instance with automatic token validation
 * @returns {AxiosInstance} 
 */
export const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: baseUrl,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use(
        (config) => {
            if (typeof window !== 'undefined') {
                try {
                    const token = TokenManager.getToken();

                    if (token) {
                        config.headers['Authorization'] = `Bearer ${token}`;

                        const remainingDays = TokenManager.getRemainingDays();
                        console.log(`⏰ Token expires in ${remainingDays} days`);
                    } else {
                        console.warn('⚠️ No valid token found');
                    }
                } catch (error) {
                    console.error('❌ Error reading token:', error);
                }
            } else {
                console.log('🖥️ Running on server-side, skipping token');
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor to handle 401 Unauthorized
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                console.warn('⚠️ 401 Unauthorized - Token may be invalid or expired');
                TokenManager.removeToken();

                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

/**
 * @function createHandleRequest
 * @description Handle API requests with proper error handling
 */
export const createHandleRequest = () => {
    return async (promise) => {
        try {
            const response = await promise;
            return response.data;
        } catch (error) {
            console.error("API Request Failed:", error);

            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Terjadi kesalahan yang tidak diketahui.";

            throw new Error(errorMessage);
        }
    };
};