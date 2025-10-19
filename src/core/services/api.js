import { createHandleRequest, createAxiosInstance } from "./axiosConfig";

const axiosInstance = createAxiosInstance();
const handleRequest = createHandleRequest();

// ==================== AUTH & USER ====================

export const User = {
    register: (data) =>
        handleRequest(axiosInstance.post("/auth/register", data)),

    login: (data) =>
        handleRequest(axiosInstance.post("/auth/login", data)),

    logout: () =>
        handleRequest(axiosInstance.post("/auth/logout")),

    forgotPassword: (data) =>
        handleRequest(axiosInstance.post("/auth/forget-password", data)),

    resetPassword: (data) =>
        handleRequest(axiosInstance.post("/auth/reset-password", data)),

    getProfile: () =>
        handleRequest(axiosInstance.get("/dashboard/user-info")),

    updateStatusUser: (data) =>
        handleRequest(axiosInstance.put("/dashboard/update-status", data)),
};

// ==================== OTP ====================

export const SendOtp = {
    sendOtpRegister: (data) =>
        handleRequest(axiosInstance.post("/auth/send-otp-regis", data)),

    sendOtpResetPassword: (data) =>
        handleRequest(axiosInstance.post("/auth/send-otp-reset", data)),

    verifyOtpRegister: (data) =>
        handleRequest(axiosInstance.post("/auth/verify-registration", data)),

    verifyOtpForgotPassword: (data) =>
        handleRequest(axiosInstance.post("/auth/verify-forgotpass", data)),
};

// ==================== LANDING ====================

export const Landing = {
    getArticles: () =>
        handleRequest(axiosInstance.get("/landing/education")),

    getArticlesById: (id) =>
        handleRequest(axiosInstance.get(`/landing/education/${id}`)),

    getOtherArticlesById: (id) =>
        handleRequest(axiosInstance.get(`/landing/other-education/${id}`)),

    getFAQ: () =>
        handleRequest(axiosInstance.get("/landing/faq")),
};

// ==================== MOOD API ====================

export const Mood = {
    getDailyMood: () =>
        handleRequest(axiosInstance.get("/dashboard/daily-mood")),

    getWeeklyMood: () =>
        handleRequest(axiosInstance.get("/dashboard/weekly-mood")),

    getMonthlyMood: () =>
        handleRequest(axiosInstance.get("/dashboard/monthly-mood")),

    saveDailyMood: (data) =>
        handleRequest(axiosInstance.post("/dashboard/add-feelings", data)),
};

export const Affirmation = {
    getAll: () =>
        handleRequest(axiosInstance.get("/dashboard/affirmation")),
}