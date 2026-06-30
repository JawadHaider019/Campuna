import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let authReceived = false;

        const handler = (event) => {
            if (event.data && event.data.type === "AUTH_CHANGED") {
                authReceived = true;
                if (!event.data.user) {
                    console.log("data is not coming from bubble");
                } else {
                    console.log("data is coming from bubble", event.data.user);
                }
                setIsLoggedIn(!!event.data.isLoggedIn);
                setUser(event.data.user || null);
            }
        };

        window.addEventListener("message", handler);

        // Alert if Bubble does not send any initial auth message within 3 seconds
        const timer = setTimeout(() => {
            if (!authReceived) {
                console.log("data is not coming from bubble (Timeout waiting for Bubble window message)");
            }
        }, 3000);

        // Fallback local persistence check to prevent flashes on quick page refreshes
        try {
            const savedUser = sessionStorage.getItem('campuna_user');
            const savedLoggedIn = sessionStorage.getItem('campuna_isLoggedIn');
            if (savedUser && savedLoggedIn === 'true') {
                authReceived = true;
                setUser(JSON.parse(savedUser));
                setIsLoggedIn(true);
            }
        } catch (e) {
            console.warn("Storage access not available:", e);
        }

        return () => {
            window.removeEventListener("message", handler);
            clearTimeout(timer);
        };
    }, []);

    // Sync to sessionStorage to preserve state on refreshes
    useEffect(() => {
        try {
            if (isLoggedIn && user) {
                sessionStorage.setItem('campuna_user', JSON.stringify(user));
                sessionStorage.setItem('campuna_isLoggedIn', 'true');
            } else {
                sessionStorage.removeItem('campuna_user');
                sessionStorage.removeItem('campuna_isLoggedIn');
            }
        } catch (e) {
            console.warn("Storage sync failed:", e);
        }
    }, [user, isLoggedIn]);

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        // If embedded in a Bubble parent window, signal the parent to handle logout session
        if (window.self !== window.top) {
            window.parent.postMessage({ type: "LOGOUT" }, "*");
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, logout, setUser, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
