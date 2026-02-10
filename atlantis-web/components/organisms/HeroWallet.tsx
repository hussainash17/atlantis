'use client'

import { Card, Button, Badge } from '../atoms/base'
import { Wallet, TrendingUp, Plus, Info } from 'lucide-react'
import { PortfolioData } from '@/data/mock'

export const HeroWallet = ({ data }: { data: PortfolioData }) => {
    return (
        <Card variant="gradient" className="relative overflow-hidden p-6 md:p-8">
            {/* Decorative Glow Elements */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Wallet className="w-5 h-5" />
                        <span className="text-sm font-medium">Total Portfolio Value</span>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <Info className="w-4 h-4" />
                    </button>
                </div>

                {/* Balance Display */}
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-1 tracking-tight text-glow" style={{ fontFamily: 'var(--font-display)' }}>
                    ৳ {data.balance.toLocaleString('en-BD')}
                </h1>

                {/* Daily Change */}
                <div className="flex items-center gap-2 mb-8">
                    <span className="text-emerald-400 text-sm font-semibold">
                        +৳{data.dailyChange.toLocaleString()} ({data.dailyChangePercent}%)
                    </span>
                    <span className="text-slate-400 text-sm">today</span>
                </div>

                {/* Stats Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="flex gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-medium">Invested</span>
                            </div>
                            <p className="text-white text-lg font-semibold">৳ {data.invested.toLocaleString('en-BD')}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-slate-400 text-sm font-medium">Available Cash</span>
                            <p className="text-white text-lg font-semibold">৳ {data.cash.toLocaleString('en-BD')}</p>
                        </div>
                    </div>

                    <Button variant="primary" size="md" className="w-full md:w-auto">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    )
}
