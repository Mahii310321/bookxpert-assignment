import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface User {
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>,
    logout: () => void,
}




interface AuthProviderProps {
    children: ReactNode
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);



export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}


export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        // Check for existing session on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);


    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        //  backend api auth call simulation
        await new Promise(resolve => setTimeout(resolve, 800));

        // validation - accept any email/password with basic validation
        if (!email.includes('@')) {
            return { success: false, error: 'Please enter a valid email address' };
        }

        if (password.length < 4) {
            return { success: false, error: 'Password must be at least 4 characters' };
        }

        // Mock credentials check (demo: admin@company.com / admin123)
        if (email === 'admin@company.com' && password === 'admin123') {
            const userData = { email, name: 'Admin User' };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
        }

        // Accept any other valid credentials for demo purposes
        const userData = { email, name: email.split('@')[0] };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}