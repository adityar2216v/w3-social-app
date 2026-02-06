import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, [token]);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            const { user: userData, token: authToken } = response.data.data;

            setUser(userData);
            setToken(authToken);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', authToken);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed',
            };
        }
    };

    // Signup function
    const signup = async (userData) => {
        try {
            const response = await authAPI.signup(userData);
            const { user: newUser, token: authToken } = response.data.data;

            setUser(newUser);
            setToken(authToken);
            localStorage.setItem('user', JSON.stringify(newUser));
            localStorage.setItem('token', authToken);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Signup failed',
            };
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const value = {
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
