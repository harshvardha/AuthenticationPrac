import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => { },
    logout: () => { }
});

export const AuthContextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState();

    const authenticate = (token) => {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    const logout = () => {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider
            value={{
                authToken,
                isAuthenticated: !!authToken,
                authenticate,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}