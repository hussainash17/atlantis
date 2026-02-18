'use client'

import { Card, Badge } from '../atoms/base'
import { Transaction, TransactionType } from '@/data/mock'
import {
    ArrowDownLeft,
    ArrowUpRight,
    TrendingUp,
    ReceiptText,
    CreditCard,
    Clock,
    CheckCircle2,
    XCircle,
} from 'lucide-react'
import { useState } from 'react'

type FilterTab = 'all' | TransactionType

const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'deposit', label: 'Deposits' },
    { key: 'withdrawal', label: 'Withdrawals' },
    { key: 'investment', label: 'Investments' },
    { key: 'settlement', label: 'Settlements' },
]

const typeConfig: Record<TransactionType, { icon: typeof ArrowDownLeft; color: string; bg: string }> = {
    deposit: { icon: ArrowDownLeft, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    withdrawal: { icon: ArrowUpRight, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    investment: { icon: TrendingUp, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    settlement: { icon: ReceiptText, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    fee: { icon: CreditCard, color: 'text-slate-400', bg: 'bg-slate-500/10' },
}

const statusConfig = {
    completed: { icon: CheckCircle2, variant: 'emerald' as const, label: 'Completed' },
    pending: { icon: Clock, variant: 'orange' as const, label: 'Pending' },
    failed: { icon: XCircle, variant: 'orange' as const, label: 'Failed' },
}

interface TransactionListProps {
    transactions: Transaction[]
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
    const [activeTab, setActiveTab] = useState<FilterTab>('all')

    const filtered = activeTab === 'all'
        ? transactions
        : transactions.filter(t => t.type === activeTab)

    // Group transactions by date
    const grouped = filtered.reduce((acc, txn) => {
        const dateKey = new Date(txn.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
        if (!acc[dateKey]) acc[dateKey] = []
        acc[dateKey].push(txn)
        return acc
    }, {} as Record<string, Transaction[]>)

    return (
        <Card variant="solid" className="p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                    <ReceiptText className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                    <h3
                        className="text-base font-semibold text-white"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Transaction History
                    </h3>
                    <p className="text-xs text-slate-400">{transactions.length} transactions</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${activeTab === tab.key
                                ? 'bg-cyan-500 text-navy-900'
                                : 'bg-navy-800 text-slate-400 hover:text-white border border-navy-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Transaction Groups */}
            {filtered.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-slate-400">No transactions found</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {Object.entries(grouped).map(([date, txns]) => (
                        <div key={date}>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3 px-1">
                                {date}
                            </p>
                            <div className="space-y-2">
                                {txns.map(txn => {
                                    const config = typeConfig[txn.type]
                                    const status = statusConfig[txn.status]
                                    const IconComponent = config.icon
                                    const isCredit = txn.amount > 0

                                    return (
                                        <div
                                            key={txn.id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-navy-800/30 border border-white/5 hover:border-cyan-500/10 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2.5 rounded-xl ${config.bg}`}>
                                                    <IconComponent className={`w-5 h-5 ${config.color}`} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{txn.title}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">{txn.description}</p>
                                                </div>
                                            </div>

                                            <div className="text-right flex-shrink-0 ml-4">
                                                <p
                                                    className={`text-sm font-semibold ${isCredit ? 'text-emerald-400' : 'text-white'
                                                        }`}
                                                    style={{ fontFeatureSettings: "'tnum'" }}
                                                >
                                                    {isCredit ? '+' : ''}৳{Math.abs(txn.amount).toLocaleString()}
                                                </p>
                                                {txn.status !== 'completed' && (
                                                    <Badge variant={status.variant} className="mt-1 text-[10px] py-0.5 px-2">
                                                        {status.label}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    )
}
