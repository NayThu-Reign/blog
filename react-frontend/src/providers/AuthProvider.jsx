import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(false);
    const [authUser, setAuthUser] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            (async () => {
                try {
                    const api = "http://localhost:8000/api/verify";
                    const res = await fetch(api, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (res.ok) {
                        const user = await res.json();
                        setAuth(true);
                        setAuthUser(user);
                    }
                } catch (error) {
                    console.error('Error verifying user:', error);
                }
            })();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

