import { createHandleRequest, createAxiosInstance } from "./axiosConfig";

const axiosInstance = createAxiosInstance();
const handleRequest = createHandleRequest();

export const User = {
    register: (data) => handleRequest(axiosInstance.post("/auth/register", data)),

    login: (data) => handleRequest(axiosInstance.post("/auth/login", data)),
};

export const Landing = {
    getArticles: () => handleRequest(axiosInstance.get("/landing/education")),
};