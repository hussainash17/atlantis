'use client'

import { Card, Badge } from '../atoms/base'
import { UserProfile, KYCStatus, RiskProfile, mockPortfolio, mockHoldings } from '@/data/mock'
import { Shield, Star, Calendar, Briefcase, TrendingUp } from 'lucide-react'

const tierColors = {
    starter: 'outline',
    silver: 'outline',
    gold: 'orange',
    platinum: 'cyan',
} as const

const tierLabels = {
    starter: 'Starter',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum',
}

const riskColors = {
    conservative: 'emerald',
    balanced: 'cyan',
    growth: 'orange',
} as const

interface ProfileHeroProps {
    user: UserProfile
    kyc: KYCStatus
    risk: RiskProfile
}

export const ProfileHero = ({ user, kyc, risk }: ProfileHeroProps) => {
    const initials = user.fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()

    const memberMonths = Math.floor(
        (new Date().getTime() - new Date(user.memberSince).getTime()) / (1000 * 60 * 60 * 24 * 30)
    )

    return (
        <Card variant="gradient" className="relative overflow-hidden p-6 md:p-8">
            {/* Decorative Glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
                {/* Top Row: Avatar + Info */}
                <div className="flex items-start gap-5">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border-2 border-cyan-500/40 flex items-center justify-center shadow-glow">
                            <span
                                className="text-2xl md:text-3xl font-bold text-cyan-400"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                {initials}
                            </span>
                        </div>
                        {/* KYC Verified Dot */}
                        {kyc.overall === 'verified' && (
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-3 border-navy-900 flex items-center justify-center">
                                <Shield className="w-3.5 h-3.5 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Name + Badges */}
                    <div className="flex-1 min-w-0">
                        <h1
                            className="text-2xl md:text-3xl font-bold text-white tracking-tight text-glow truncate"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {user.fullName}
                        </h1>

                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge variant={tierColors[user.accountTier]}>
                                <Star className="w-3 h-3 mr-1" />
                                {tierLabels[user.accountTier]}
                            </Badge>
                            <Badge variant={kyc.overall === 'verified' ? 'emerald' : 'orange'}>
                                {kyc.overall === 'verified' ? '✓ KYC Verified' : 'KYC ' + kyc.overall}
                            </Badge>
                            <Badge variant={riskColors[risk.category]}>
                                {risk.category.charAt(0).toUpperCase() + risk.category.slice(1)}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2 mt-3 text-slate-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>Member for {memberMonths} months</span>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-1">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>Total Invested</span>
                        </div>
                        <p className="text-white text-lg font-semibold" style={{ fontFeatureSettings: "'tnum'" }}>
                            ৳{mockPortfolio.invested.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-1">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>Holdings</span>
                        </div>
                        <p className="text-white text-lg font-semibold">{mockHoldings.length}</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Since</span>
                        </div>
                        <p className="text-white text-lg font-semibold">
                            {new Date(user.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}
