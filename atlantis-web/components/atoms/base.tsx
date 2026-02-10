'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

// --- Utility ---
function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(' ')
}

// --- CARD ---
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'solid' | 'glass' | 'gradient'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'solid', children, ...props }, ref) => {
        const baseStyles = 'rounded-2xl transition-all duration-300'

        const variants = {
            solid: 'bg-navy-800 border border-navy-700 shadow-card',
            glass: 'glass-panel',
            gradient: 'bg-gradient-to-br from-navy-800 to-navy-900 border border-white/5 shadow-card',
        }

        return (
            <div
                ref={ref}
                className={cn(baseStyles, variants[variant], className)}
                {...props}
            >
                {children}
            </div>
        )
    }
)
Card.displayName = 'Card'

// --- BUTTON ---
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer'

        const variants = {
            primary: 'bg-cyan-500 hover:bg-cyan-400 text-navy-900 shadow-glow',
            secondary: 'bg-navy-700 hover:bg-navy-600 text-white border border-white/10',
            ghost: 'hover:bg-white/5 text-slate-400 hover:text-white',
        }

        const sizes = {
            sm: 'h-9 px-4 text-sm',
            md: 'h-12 px-6 text-base',
            lg: 'h-14 px-8 text-lg',
        }

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {children}
            </button>
        )
    }
)
Button.displayName = 'Button'

// --- BADGE ---
interface BadgeProps {
    children: React.ReactNode
    variant?: 'cyan' | 'emerald' | 'orange' | 'outline'
    className?: string
}

export const Badge = ({ children, variant = 'cyan', className }: BadgeProps) => {
    const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider'

    const variants = {
        cyan: 'bg-cyan-900 text-cyan-400 border border-cyan-500/30',
        emerald: 'bg-emerald-900 text-emerald-400 border border-emerald-500/30',
        orange: 'bg-orange-900 text-orange-400 border border-orange-500/30',
        outline: 'border border-white/20 text-slate-300',
    }

    return (
        <span className={cn(baseStyles, variants[variant], className)}>
            {children}
        </span>
    )
}
