import { LucideIcon } from 'lucide-react';
import React from 'react'


interface StatCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    description?: string;
    variant?: 'default' | 'primary' | 'success' | 'warning';
}

const variantStyles = {
    default: 'bg-card border-border/50',
    primary: 'bg-primary/5 border-primary/20',
    success: 'bg-success/5 border-success/20',
    warning: 'bg-warning/5 border-warning/20',
};

const iconStyles = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
};


function StatCard({
    title,
    value,
    icon: Icon,
    description,
    variant = 'default',
}: StatCardProps) {
    return (
        <div className={`stat-card card-hover border ${variantStyles[variant]}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
                    {description && (
                        <p className="text-xs text-muted-foreground mt-1">{description}</p>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${iconStyles[variant]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </div>
    )
}

export default StatCard