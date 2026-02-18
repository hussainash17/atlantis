'use client'

import { Card, Button } from '../atoms/base'
import { WalletBalance } from '@/data/mock'
import { Wallet, TrendingUp, Lock, Clock, Plus, ArrowUpRight, Info } from 'lucide-react'

interface WalletHeroProps {
    balance: WalletBalance
    onAddMoney: () => void
    onWithdraw: () => void
}

export const WalletHero = ({ balance, onAddMoney, onWithdraw }: WalletHeroProps) => {
    return (
        <Card variant="gradient" className="relative overflow-hidden p-6 md:p-8">
            {/* Decorative Glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Wallet className="w-5 h-5" />
                        <span className="text-sm font-medium">Available Balance</span>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <Info className="w-4 h-4" />
                    </button>
                </div>

                {/* Balance */}
                <h1
                    className="text-4xl md:text-5xl font-bold text-white mb-1 tracking-tight text-glow"
                    style={{ fontFamily: 'var(--font-display)', fontFeatureSettings: "'tnum'" }}
                >
                    ৳{balance.available.toLocaleString('en-BD')}
                </h1>

                {/* Sub-balances */}
                <div className="flex items-center gap-4 mt-2 mb-8">
                    <div className="flex items-center gap-1.5 text-sm">
                        <Lock className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-slate-400">Blocked:</span>
                        <span className="text-orange-400 font-medium">৳{balance.blocked.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-slate-400">Pending:</span>
                        <span className="text-cyan-400 font-medium">৳{balance.pending.toLocaleString()}</span>
                    </div>
                </div>

                {/* Stats + CTAs */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="flex gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-emerald-400">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-medium">Total Deposited</span>
                            </div>
                            <p className="text-white text-lg font-semibold" style={{ fontFeatureSettings: "'tnum'" }}>
                                ৳{balance.totalDeposited.toLocaleString()}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-slate-400 text-sm font-medium">Total Withdrawn</span>
                            <p className="text-white text-lg font-semibold" style={{ fontFeatureSettings: "'tnum'" }}>
                                ৳{balance.totalWithdrawn.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <Button variant="primary" size="md" className="flex-1 md:flex-initial" onClick={onAddMoney}>
                            <Plus className="w-5 h-5 mr-2" />
                            Add Money
                        </Button>
                        <Button variant="secondary" size="md" className="flex-1 md:flex-initial" onClick={onWithdraw}>
                            <ArrowUpRight className="w-5 h-5 mr-2" />
                            Withdraw
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
