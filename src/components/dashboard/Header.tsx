import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login', { replace: true });
    };

    function getInitials(name: string) {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };
    return (
        <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-md">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-foreground tracking-tight">Employee Manager</h1>
                            <p className="text-xs text-muted-foreground">Dashboard</p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="gap-2 hover:bg-accent/80 px-2">
                                    <Avatar className="w-8 h-8 border-2 border-primary/20">
                                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                                            {user?.name ? getInitials(user.name) : <User className="w-4 h-4" />}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="hidden sm:inline text-sm font-medium">
                                        {user?.name || 'User'}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{user?.name}</span>
                                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>)
}

export default Header