import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    isLoading?: boolean;
}

export const Button = ({
    className,
    variant = 'primary',
    isLoading,
    children,
    ...props
}: ButtonProps) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'bg-slate-900 text-white hover:bg-slate-800',
        outline: 'bg-transparent border border-slate-200 text-slate-700 hover:bg-slate-50',
        ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
        danger: 'bg-red-600 text-white hover:bg-red-700 shadow-red-100'
    };

    return (
        <button
            className={cn(
                'font-bold py-2.5 px-6 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
                variants[variant],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    <span>Bekleyin...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};
