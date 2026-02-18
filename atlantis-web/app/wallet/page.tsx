'use client'

import { WalletHero } from '@/components/organisms/WalletHero'
import { TransactionList } from '@/components/organisms/TransactionList'
import { AddMoneyModal } from '@/components/organisms/AddMoneyModal'
import { WithdrawModal } from '@/components/organisms/WithdrawModal'
import { Card } from '@/components/atoms/base'
import {
    mockWalletBalance,
    mockTransactions,
    mockPaymentMethods,
    mockLinkedBanks,
} from '@/data/mock'
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    LineChart,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function WalletPage() {
    const [showAddMoney, setShowAddMoney] = useState(false)
    const [showWithdraw, setShowWithdraw] = useState(false)

    // Quick stats computed from transactions
    const totalIn = mockTransactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0)
    const totalOut = Math.abs(
        mockTransactions
            .filter(t => t.amount < 0 && t.type === 'withdrawal')
            .reduce((sum, t) => sum + t.amount, 0)
    )
    const netReturns = mockTransactions
        .filter(t => t.type === 'settlement')
        .reduce((sum, t) => sum + t.amount, 0)

    return (
        <main className="min-h-screen pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-navy-900/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                Wallet
                            </h1>
                            <p className="text-xs text-slate-400">Manage your funds</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">
                {/* 1. Wallet Hero */}
                <WalletHero
                    balance={mockWalletBalance}
                    onAddMoney={() => setShowAddMoney(true)}
                    onWithdraw={() => setShowWithdraw(true)}
                />

                {/* 2. Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <Card variant="solid" className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs text-slate-400 font-medium">Total In</span>
                        </div>
                        <p className="text-lg font-bold text-white" style={{ fontFeatureSettings: "'tnum'" }}>
                            ৳{totalIn.toLocaleString()}
                        </p>
                    </Card>
                    <Card variant="solid" className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="w-4 h-4 text-orange-400" />
                            <span className="text-xs text-slate-400 font-medium">Total Out</span>
                        </div>
                        <p className="text-lg font-bold text-white" style={{ fontFeatureSettings: "'tnum'" }}>
                            ৳{totalOut.toLocaleString()}
                        </p>
                    </Card>
                    <Card variant="solid" className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <LineChart className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs text-slate-400 font-medium">Returns</span>
                        </div>
                        <p className="text-lg font-bold text-emerald-400" style={{ fontFeatureSettings: "'tnum'" }}>
                            +৳{netReturns.toLocaleString()}
                        </p>
                    </Card>
                </div>

                {/* 3. Transaction History */}
                <TransactionList transactions={mockTransactions} />
            </div>

            {/* Modals */}
            <AddMoneyModal
                isOpen={showAddMoney}
                onClose={() => setShowAddMoney(false)}
                paymentMethods={mockPaymentMethods}
            />
            <WithdrawModal
                isOpen={showWithdraw}
                onClose={() => setShowWithdraw(false)}
                availableBalance={mockWalletBalance.available}
                linkedBanks={mockLinkedBanks}
            />
        </main>
    )
}
