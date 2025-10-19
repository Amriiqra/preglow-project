const TOKEN_KEY = 'authToken';
const TOKEN_EXPIRY_KEY = 'authTokenExpiry';
const EXPIRY_DAYS = 7;

export const TokenManager = {
    /**
     * Set token with expiry date (7 days from now)
     */
    setToken: (token) => {
        if (typeof window === 'undefined') return;

        try {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + EXPIRY_DAYS);

            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(TOKEN_EXPIRY_KEY, expiryDate.toISOString());
        } catch (error) {
            console.error('❌ Failed to save token:', error);
        }
    },

    /**
     * Get token if not expired, auto-delete if expired
     */
    getToken: () => {
        if (typeof window === 'undefined') return null;

        try {
            const token = localStorage.getItem(TOKEN_KEY);
            const expiryDate = localStorage.getItem(TOKEN_EXPIRY_KEY);

            if (!token || !expiryDate) {
                return null;
            }

            // Check if token is expired
            const now = new Date();
            const expiry = new Date(expiryDate);

            if (now > expiry) {
                TokenManager.removeToken();
                return null;
            }

            return token;
        } catch (error) {
            console.error('❌ Error reading token:', error);
            return null;
        }
    },

    /**
     * Remove token and expiry from localStorage
     */
    removeToken: () => {
        if (typeof window === 'undefined') return;

        try {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(TOKEN_EXPIRY_KEY);
        } catch (error) {
            console.error('❌ Failed to remove token:', error);
        }
    },

    /**
     * Check if token exists and is valid
     */
    isTokenValid: () => {
        return TokenManager.getToken() !== null;
    },

    /**
     * Get remaining days until token expires
     */
    getRemainingDays: () => {
        if (typeof window === 'undefined') return 0;

        try {
            const expiryDate = localStorage.getItem(TOKEN_EXPIRY_KEY);
            if (!expiryDate) return 0;

            const now = new Date();
            const expiry = new Date(expiryDate);
            const diffTime = expiry - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays > 0 ? diffDays : 0;
        } catch (error) {
            console.error('❌ Error calculating remaining days:', error);
            return 0;
        }
    }
};