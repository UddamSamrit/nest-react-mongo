"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AuthContextProps {
    user: { _id: string; username: string; } | null;
    access_token: string | null;
    refresh_token: string | null;
    loginUser: (access_token: string, refresh_token:string, user: { _id: string; username: string }) => void;
    logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ _id: string; username: string; } | null>(null);
    const [access_token, setAccessToken] = useState<string | null>(null);
    const [refresh_token, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        const storedRefresh = localStorage.getItem('refresh_token');
        const storedToken = localStorage.getItem('access_token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedRefresh && storedUser && storedUser!="undefined") {
            setRefreshToken(storedRefresh);
            setAccessToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const loginUser = (access_token: string,refresh_token:string, user: { _id: string; username: string; }) => {
        setRefreshToken(refresh_token);
        setAccessToken(access_token);
        setUser(user);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logoutUser = () => {
        setRefreshToken(null);
        setAccessToken(null);
        setUser(null);
        document.cookie = `access_token=; path=/; max-age=0`;
        document.cookie = `refresh_token=; path=/; max-age=0`;
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, access_token, refresh_token, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};