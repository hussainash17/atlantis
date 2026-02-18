'use client'

import { Card, Badge, Button } from '@/components/atoms/base'
import { AllocationChart } from '@/components/organisms/AllocationChart'
import { HoldingCard } from '@/components/organisms/HoldingCard'
import { SellModal } from '@/components/organisms/SellModal'
import {
    mockHoldings,
    calculatePortfolioSummary,
    calculateAllocation,
    assetClassMeta,
    AssetClass,
    Holding
} from '@/data/mock'
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    Filter,
    Search,
    PieChart,
    List,
    ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type ViewMode = 'allocation' | 'list'

export default function PortfolioPage() {
    const [viewMode, setViewMode] = useState<ViewMode>('allocation')
    const [selectedClass, setSelectedClass] = useState<AssetClass | 'all'>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [sellHolding, setSellHolding] = useState<Holding | null>(null)

    const summary = calculatePortfolioSummary(mockHoldings)
    const allocation = calculateAllocation(mockHoldings)

    // Filter holdings
    const filteredHoldings = mockHoldings.filter(h => {
        const matchesClass = selectedClass === 'all' || h.assetClass === selectedClass
        const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (h.ticker?.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesClass && matchesSearch
    })

    // Group by asset class
    const groupedHoldings = filteredHoldings.reduce((acc, h) => {
        if (!acc[h.assetClass]) acc[h.assetClass] = []
        acc[h.assetClass].push(h)
        return acc
    }, {} as Record<AssetClass, typeof mockHoldings>)

    const isPositive = summary.totalGain >= 0

    return (
        <main className="min-h-screen pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                    My Portfolio
                                </h1>
                                <p className="text-xs text-slate-400">{mockHoldings.length} holdings across {allocation.length} asset classes</p>
                            </div>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-1 p-1 bg-navy-800 rounded-xl">
                            <button
                                onClick={() => setViewMode('allocation')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'allocation' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                <PieChart className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">
                {/* Portfolio Summary Card */}
                <Card variant="gradient" className="p-6 relative overflow-hidden">
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <span className="text-slate-400 text-sm">Total Portfolio Value</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mt-1 text-glow" style={{ fontFamily: 'var(--font-display)' }}>
                                    ৳{summary.totalValue.toLocaleString()}
                                </h2>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center gap-1.5">
                                        {isPositive ? (
                                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4 text-orange-400" />
                                        )}
                                        <span className={`font-semibold ${isPositive ? 'text-emerald-400' : 'text-orange-400'}`}>
                                            {isPositive ? '+' : ''}৳{summary.totalGain.toLocaleString()}
                                        </span>
                                        <span className={`text-sm ${isPositive ? 'text-emerald-400/70' : 'text-orange-400/70'}`}>
                                            ({isPositive ? '+' : ''}{summary.totalGainPercent.toFixed(2)}%)
                                        </span>
                                    </div>
                                    <span className="text-slate-500">•</span>
                                    <span className="text-slate-400 text-sm">All time</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="text-center">
                                    <span className="text-slate-400 text-xs block">Today</span>
                                    <span className={`font-semibold ${summary.dailyChange >= 0 ? 'text-emerald-400' : 'text-orange-400'}`}>
                                        {summary.dailyChange >= 0 ? '+' : ''}৳{summary.dailyChange.toLocaleString()}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <span className="text-slate-400 text-xs block">Invested</span>
                                    <span className="text-white font-semibold">
                                        ৳{summary.totalInvested.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Allocation View */}
                {viewMode === 'allocation' && (
                    <Card variant="solid" className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                            Asset Allocation
                        </h3>
                        <AllocationChart data={allocation} totalValue={summary.totalValue} />
                    </Card>
                )}

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search holdings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-11 pr-4 bg-navy-800 border border-navy-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        <button
                            onClick={() => setSelectedClass('all')}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedClass === 'all'
                                ? 'bg-cyan-500 text-navy-900'
                                : 'bg-navy-800 text-slate-400 hover:text-white border border-navy-700'
                                }`}
                        >
                            All
                        </button>
                        {(Object.keys(assetClassMeta) as AssetClass[]).map((key) => {
                            const meta = assetClassMeta[key]
                            const hasHoldings = mockHoldings.some(h => h.assetClass === key)
                            if (!hasHoldings) return null

                            return (
                                <button
                                    key={key}
                                    onClick={() => setSelectedClass(key)}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${selectedClass === key
                                        ? 'bg-cyan-500 text-navy-900'
                                        : 'bg-navy-800 text-slate-400 hover:text-white border border-navy-700'
                                        }`}
                                >
                                    <span>{meta.icon}</span>
                                    <span className="hidden md:inline">{meta.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Holdings List */}
                <div className="space-y-6">
                    {selectedClass === 'all' ? (
                        // Grouped view
                        Object.entries(groupedHoldings).map(([assetClass, holdings]) => {
                            const meta = assetClassMeta[assetClass as AssetClass]
                            const classTotal = holdings.reduce((sum, h) => sum + h.currentValue, 0)

                            return (
                                <div key={assetClass}>
                                    <div className="flex items-center justify-between mb-3 px-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{meta.icon}</span>
                                            <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                                {meta.label}
                                            </h3>
                                            <Badge variant="outline" className="text-[10px]">
                                                {holdings.length}
                                            </Badge>
                                        </div>
                                        <span className="text-slate-400 text-sm font-medium">
                                            ৳{classTotal.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        {holdings.map(holding => (
                                            <HoldingCard key={holding.id} holding={holding} onSell={setSellHolding} />
                                        ))}
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        // Flat view for single class
                        <div className="space-y-3">
                            {filteredHoldings.map(holding => (
                                <HoldingCard key={holding.id} holding={holding} onSell={setSellHolding} />
                            ))}
                        </div>
                    )}

                    {filteredHoldings.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-slate-400">No holdings found</p>
                        </div>
                    )}
                </div>
            </div>
            {sellHolding && (
                <SellModal isOpen={!!sellHolding} onClose={() => setSellHolding(null)} holding={sellHolding} />
            )}
        </main>
    )
}
