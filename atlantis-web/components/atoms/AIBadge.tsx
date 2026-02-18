'use client'

import { AISuitability } from '@/data/mock'
import { Sparkles, AlertTriangle, ShieldX } from 'lucide-react'

const config: Record<AISuitability, { label: string; icon: typeof Sparkles; bg: string; text: string; border: string }> = {
    suitable: {
        label: 'AI: Suitable',
        icon: Sparkles,
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/20',
    },
    caution: {
        label: 'AI: Caution',
        icon: AlertTriangle,
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/20',
    },
    not_recommended: {
        label: 'AI: Not Recommended',
        icon: ShieldX,
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        border: 'border-red-500/20',
    },
}

interface AIBadgeProps {
    suitability: AISuitability
    score?: number
    size?: 'sm' | 'md'
    showScore?: boolean
}

export const AIBadge = ({ suitability, score, size = 'sm', showScore = false }: AIBadgeProps) => {
    const c = config[suitability]
    const Icon = c.icon

    return (
        <span
            className={`
                inline-flex items-center gap-1.5 rounded-full border font-medium
                ${c.bg} ${c.text} ${c.border}
                ${size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'}
            `}
        >
            <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
            {c.label}
            {showScore && score !== undefined && (
                <span className="opacity-70 ml-0.5">({score}%)</span>
            )}
        </span>
    )
}
