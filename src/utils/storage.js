// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Keys ek hi jagah define rahengi (Typo ka risk zero)
export const STORAGE_KEYS = {
    TOKEN: 'driver_auth_token',
    PHONE: 'driver_phone',
    IS_LOGGED_IN: 'driver_is_logged_in',
    DRIVER_DATA: 'driver_profile_data',
};

// 2. Common Safe Helpers (JSON & Error handle ke sath)
export const storage = {
    // Data save karna
    setItem: async (key, value) => {
        try {
            const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            return true;
        } catch (e) {
            console.error(`Storage set error for key ${key}:`, e);
            return false;
        }
    },

    // Data retrieve karna
    getItem: async (key, isJson = false) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (!value) return null;
            return isJson ? JSON.parse(value) : value;
        } catch (e) {
            console.error(`Storage get error for key ${key}:`, e);
            return null;
        }
    },

    // Single item delete karna
    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error(`Storage remove error for key ${key}:`, e);
        }
    },

    // Logout ke waqt all auth data clear karna
    clearAuth: async () => {
        try {
            await AsyncStorage.multiRemove([
                STORAGE_KEYS.TOKEN,
                STORAGE_KEYS.PHONE,
                STORAGE_KEYS.IS_LOGGED_IN,
                STORAGE_KEYS.DRIVER_DATA,
            ]);
        } catch (e) {
            console.error('Storage clear error:', e);
        }
    },
};
