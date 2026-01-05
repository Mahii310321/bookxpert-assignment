import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



interface ProtectedRouteProps {
    children: React.ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                navigate('/dashboard', { replace: true });
            } else {
                navigate('/login', { replace: true });
            }
        }
    }, [isAuthenticated, isLoading, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground">Loading...</p>
            </div>
        </div>
    );
}

export default ProtectedRoute