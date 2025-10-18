// api/axiosConfig.js

import { baseUrl } from "@/config/global";
import axios from "axios";

export const INTERCEPTOR_CONFIG = {
  REQUEST_TIMEOUT: 1 * 60 * 1000,
  DEBUG_MODE: false,
};

function onResponse(response) {
  if (INTERCEPTOR_CONFIG.DEBUG_MODE) {
    const duration = Date.now() - (response.config._requestStartTime || 0);
    console.log(`✅ Response received in ${duration}ms: ${response.config.url}`);
  }
  return response;
}

function onResponseError(error) {
  if (INTERCEPTOR_CONFIG.DEBUG_MODE) {
    console.error("❌ Request Failed:", error.response || error.message);
  }
  return Promise.reject(error);
}


function setupInterceptorsTo(instance) {
  instance.interceptors.request.use((config) => {
    config._requestStartTime = Date.now();
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(
    onResponse,
    onResponseError
  );
}

export const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: INTERCEPTOR_CONFIG.REQUEST_TIMEOUT,
  });

  setupInterceptorsTo(instance);

  return instance;
};

export const createHandleRequest = () => (request) =>
  new Promise((resolve, reject) => {
    request
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });