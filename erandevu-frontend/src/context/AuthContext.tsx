'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface User {
    username: string;
    role: string;
    id: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const decodeTokenAndSetUser = (token: string) => {
        try {
            const decoded: any = jwtDecode(token);
            const newUser: User = {
                username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decoded.unique_name || decoded.name,
                role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role,
                id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || decoded.nameid || decoded.sub
            };
            setUser(newUser);
            return newUser;
        } catch (error) {
            console.error('Token decoding failed:', error);
            localStorage.removeItem('token');
            setUser(null);
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            decodeTokenAndSetUser(token);
        }
        setIsLoading(false);
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        const newUser = decodeTokenAndSetUser(token);
        if (newUser) {
            if (newUser.role === 'Admin') router.push('/admin');
            else if (newUser.role === 'Doctor') router.push('/doctor');
            else router.push('/dashboard');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
