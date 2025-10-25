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
        handleRequest(axiosInstance.get("/menu/mood/daily-mood")),

    getWeeklyMood: () =>
        handleRequest(axiosInstance.get("/menu/mood/weekly-mood")),

    getMonthlyMood: () =>
        handleRequest(axiosInstance.get("/menu/mood/monthly-mood")),

    getAllDailyMood: (params = {}) => {
        const { page = 1, limit = 10 } = params;
        return handleRequest(
            axiosInstance.get("/menu/mood/all", {
                params: { page, limit }
            })
        );
    },

    saveDailyMood: (data) =>
        handleRequest(axiosInstance.post("/menu/mood/add-feelings", data)),

    delete: (id) =>
        handleRequest(
            axiosInstance.delete(`/menu/mood/delete/${id}`)
        ),
};

export const Affirmation = {
    getAll: () =>
        handleRequest(axiosInstance.get("/dashboard/affirmation")),
}

export const Forum = {
    getAll: (params = {}) => {
        const { page = 1, limit = 10 } = params;
        return handleRequest(
            axiosInstance.get("/menu/forum/all", {
                params: { page, limit }
            })
        );
    },

    create: (data) =>
        handleRequest(axiosInstance.post("/menu/forum/add", data)),

    getById: (id) =>
        handleRequest(axiosInstance.get(`/menu/forum/${id}`)),

    createComment: (id, data) =>
        handleRequest(axiosInstance.post(`/menu/forum/add-comment/${id}`, data)),

    getAllComment: (id) =>
        handleRequest(axiosInstance.get(`/menu/forum/get-comment/${id}`)),

    createReply: (id, data) =>
        handleRequest(axiosInstance.post(`/menu/forum/add-reply/${id}`, data)),

    allReply: (id, data) =>
        handleRequest(axiosInstance.get(`/menu/forum/get-reply/${id}`, data)),

    createReplyOfReply: (id, data) =>
        handleRequest(axiosInstance.post(`/menu/forum/add-reofre/${id}`, data)),

    allReplyOfReply: (id, data) =>
        handleRequest(axiosInstance.get(`/menu/forum/get-reofre/${id}`, data)),
}

export const Nutrition = {
    getAllFood: (params = {}) => {
        const { page = 1, limit = 10 } = params;
        return handleRequest(
            axiosInstance.get("/menu/food/all", {
                params: { page, limit }
            })
        );
    },

    getDailyNutrition: (params = {}) => {
        return handleRequest(
            axiosInstance.get("/menu/food/nutrition", {
                params: { ...params }
            })
        );
    },

    getWeeklyNutrition: () =>
        handleRequest(axiosInstance.get("/menu/food/weekly-nutrition")),

    getReportDailyNutrition: () =>
        handleRequest(axiosInstance.get("/menu/food/report")),

    getLastMeal: () =>
        handleRequest(axiosInstance.get("/menu/food/last")),

    createFood: (data) =>
        handleRequest(axiosInstance.post(`/menu/food/add`, data)),
}

export const SaraAI = {
    getChatHistory: () =>
        handleRequest(axiosInstance.get("/menu/chatbot/history")),

    createChat: (data) =>
        handleRequest(axiosInstance.post(`menu/chatbot`, data)),
}