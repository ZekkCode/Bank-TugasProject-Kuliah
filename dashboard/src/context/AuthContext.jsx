import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isIntroDone, setIsIntroDone] = useState(false);

    // Simulation: Check if previously logged in (optional, keeping it simple for now)
    // For "Bank" feel, maybe we always require login on refresh?
    // Let's persist intro state but require login.

    const login = (pin) => {
        // Hardcoded PIN for simulation: 1234
        if (pin === '1234') {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const finishIntro = () => {
        setIsIntroDone(true);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isIntroDone, login, logout, finishIntro }}>
            {children}
        </AuthContext.Provider>
    );
};
