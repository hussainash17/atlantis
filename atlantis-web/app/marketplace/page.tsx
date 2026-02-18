'use client'

import { useState } from 'react'
import Link from 'next/link'
import { InstrumentCard } from '@/components/organisms/InstrumentCard'
import { mockInstruments, AssetClass, assetClassMeta, RiskLevel } from '@/data/mock'
import { ArrowLeft, Search, SlidersHorizontal, Sparkles } from 'lucide-react'

const assetTabs: { key: AssetClass | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'All', icon: '🌐' },
    { key: 'equity', label: 'Equities', icon: '📈' },
    { key: 'fixed_income', label: 'Fixed Income', icon: '🏛️' },
    { key: 'savings', label: 'Savings', icon: '🏦' },
    { key: 'mutual_fund', label: 'Mutual Funds', icon: '📊' },
    { key: 'gold', label: 'Gold', icon: '🥇' },
    { key: 'agri', label: 'Agri', icon: '🌾' },
]

const riskFilters: { key: RiskLevel | 'all'; label: string }[] = [
    { key: 'all', label: 'All Risk' },
    { key: 'low', label: 'Low' },
    { key: 'medium', label: 'Medium' },
    { key: 'high', label: 'High' },
]

export default function MarketplacePage() {
    const [activeTab, setActiveTab] = useState<AssetClass | 'all'>('all')
    const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all')
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState<'aiScore' | 'return' | 'min'>('aiScore')

    const filtered = mockInstruments
        .filter(i => activeTab === 'all' || i.assetClass === activeTab)
        .filter(i => riskFilter === 'all' || i.riskLevel === riskFilter)
        .filter(i =>
            search === '' ||
            i.name.toLowerCase().includes(search.toLowerCase()) ||
            i.ticker?.toLowerCase().includes(search.toLowerCase()) ||
            i.issuer.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'aiScore': return b.aiScore - a.aiScore
                case 'return': return (b.expectedReturn || 0) - (a.expectedReturn || 0)
                case 'min': return a.minInvestment - b.minInvestment
                default: return 0
            }
        })

    const totalAvailable = mockInstruments.length
    const avgReturn = (mockInstruments.reduce((s, i) => s + (i.expectedReturn || 0), 0) / totalAvailable).toFixed(1)

    return (
        <main className="min-h-screen bg-navy-900 text-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/" className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 transition border border-white/5">
                        <ArrowLeft className="w-5 h-5 text-slate-400" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                            Marketplace
                        </h1>
                        <p className="text-slate-400 text-sm">Discover instruments, powered by AI</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-navy-800 rounded-xl p-4 border border-white/5">
                        <p className="text-slate-400 text-xs font-medium mb-1">Instruments</p>
                        <p className="text-white text-xl font-bold">{totalAvailable}</p>
                    </div>
                    <div className="bg-navy-800 rounded-xl p-4 border border-white/5">
                        <p className="text-slate-400 text-xs font-medium mb-1">Avg Return</p>
                        <p className="text-emerald-400 text-xl font-bold">{avgReturn}%</p>
                    </div>
                    <div className="bg-navy-800 rounded-xl p-4 border border-white/5">
                        <p className="text-slate-400 text-xs font-medium mb-1">Asset Classes</p>
                        <p className="text-cyan-400 text-xl font-bold">6</p>
                    </div>
                </div>

                {/* Search */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search instruments, tickers, issuers..."
                            className="w-full bg-navy-800 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/30 transition"
                        />
                    </div>
                    <div className="flex items-center gap-1.5 bg-navy-800 border border-white/5 rounded-xl px-3 py-2.5">
                        <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value as 'aiScore' | 'return' | 'min')}
                            className="bg-transparent text-sm text-slate-300 focus:outline-none cursor-pointer"
                        >
                            <option value="aiScore">AI Score</option>
                            <option value="return">Return</option>
                            <option value="min">Min Investment</option>
                        </select>
                    </div>
                </div>

                {/* Asset Class Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
                    {assetTabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition border ${activeTab === tab.key
                                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                                    : 'bg-navy-800 text-slate-400 border-white/5 hover:bg-navy-700'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Risk Filters */}
                <div className="flex gap-2 mb-6">
                    {riskFilters.map(rf => (
                        <button
                            key={rf.key}
                            onClick={() => setRiskFilter(rf.key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${riskFilter === rf.key
                                    ? 'bg-white/10 text-white border-white/20'
                                    : 'bg-navy-800/50 text-slate-500 border-white/5 hover:text-slate-300'
                                }`}
                        >
                            {rf.label}
                        </button>
                    ))}
                </div>

                {/* AI Recommendation Banner */}
                {activeTab === 'all' && search === '' && (
                    <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        <div>
                            <p className="text-white text-sm font-medium">AI Picks for You</p>
                            <p className="text-slate-400 text-xs">Showing instruments sorted by AI confidence score. Higher scores indicate better suitability for your risk profile.</p>
                        </div>
                    </div>
                )}

                {/* Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {filtered.map(instrument => (
                        <InstrumentCard key={instrument.id} instrument={instrument} />
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-slate-500 text-sm">No instruments match your filters</p>
                        <button
                            onClick={() => { setActiveTab('all'); setRiskFilter('all'); setSearch('') }}
                            className="mt-3 text-cyan-400 text-sm hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </main>
    )
}
