'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { mockInstruments, mockPartners, assetClassMeta } from '@/data/mock'
import { AIBadge } from '@/components/atoms/AIBadge'
import { BuyModal } from '@/components/organisms/BuyModal'
import { ArrowLeft, TrendingUp, Shield, Clock, Sparkles, Building2, Calendar, Percent, Layers } from 'lucide-react'

export default function InstrumentDetailPage() {
    const params = useParams()
    const id = params.id as string
    const instrument = mockInstruments.find(i => i.id === id)
    const [showBuy, setShowBuy] = useState(false)

    if (!instrument) {
        return (
            <main className="min-h-screen bg-navy-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-400 text-lg mb-4">Instrument not found</p>
                    <Link href="/marketplace" className="text-cyan-400 hover:underline">← Back to Marketplace</Link>
                </div>
            </main>
        )
    }

    const partner = mockPartners[instrument.partnerId]
    const meta = assetClassMeta[instrument.assetClass]

    const riskConfig: Record<string, { color: string; bg: string }> = {
        low: { color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        medium: { color: 'text-amber-400', bg: 'bg-amber-500/10' },
        high: { color: 'text-red-400', bg: 'bg-red-500/10' },
    }
    const risk = riskConfig[instrument.riskLevel]

    // Build key facts based on asset class
    const keyFacts: { label: string; value: string; icon: typeof TrendingUp }[] = [
        ...(instrument.expectedReturn ? [{ label: 'Expected Return', value: `${instrument.expectedReturn}% p.a.`, icon: TrendingUp }] : []),
        { label: 'Risk Level', value: instrument.riskLevel.charAt(0).toUpperCase() + instrument.riskLevel.slice(1), icon: Shield },
        { label: 'Min Investment', value: `৳${instrument.minInvestment.toLocaleString()}`, icon: Layers },
        ...(instrument.couponRate ? [{ label: 'Coupon Rate', value: `${instrument.couponRate}%`, icon: Percent }] : []),
        ...(instrument.maturityDate ? [{ label: 'Maturity', value: new Date(instrument.maturityDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }), icon: Calendar }] : []),
        ...(instrument.interestRate ? [{ label: 'Interest Rate', value: `${instrument.interestRate}% p.a.`, icon: Percent }] : []),
        ...(instrument.navPrice ? [{ label: 'NAV Price', value: `৳${instrument.navPrice}`, icon: Layers }] : []),
        ...(instrument.spotPrice ? [{ label: 'Spot Price', value: `৳${instrument.spotPrice.toLocaleString()}/g`, icon: Layers }] : []),
        ...(instrument.peRatio ? [{ label: 'P/E Ratio', value: `${instrument.peRatio}`, icon: Layers }] : []),
        ...(instrument.targetYield ? [{ label: 'Target Yield', value: `${instrument.targetYield}%`, icon: TrendingUp }] : []),
    ]

    return (
        <>
            <main className="min-h-screen bg-navy-900 text-white">
                <div className="max-w-3xl mx-auto px-4 md:px-6 py-6">
                    {/* Back */}
                    <Link href="/marketplace" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition text-sm mb-6">
                        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
                    </Link>

                    {/* Hero */}
                    <div className="bg-navy-800 rounded-2xl border border-white/5 p-6 mb-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{meta.icon}</span>
                                <div>
                                    <h1 className="text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                                        {instrument.name}
                                    </h1>
                                    <p className="text-slate-400 text-sm mt-0.5">
                                        {instrument.ticker && <span className="text-cyan-400 font-medium">{instrument.ticker} · </span>}
                                        {instrument.issuer}
                                    </p>
                                </div>
                            </div>
                            <AIBadge suitability={instrument.aiSuitability} score={instrument.aiScore} showScore size="md" />
                        </div>

                        {/* Price / Return */}
                        <div className="flex items-end gap-6 mb-5">
                            <div>
                                <p className="text-slate-400 text-xs font-medium mb-1">
                                    {instrument.assetClass === 'equity' ? 'Market Price' : instrument.assetClass === 'gold' ? 'Spot Price' : 'Price'}
                                </p>
                                <p className="text-3xl font-bold text-white" style={{ fontFeatureSettings: "'tnum'" }}>
                                    ৳{instrument.currentPrice.toLocaleString()}
                                </p>
                            </div>
                            {instrument.expectedReturn && (
                                <div className={`px-3 py-1.5 rounded-lg ${risk.bg}`}>
                                    <span className={`text-sm font-semibold ${risk.color}`}>
                                        <TrendingUp className="w-4 h-4 inline mr-1" />
                                        {instrument.expectedReturn}% p.a.
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Integration Partner */}
                        <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl text-sm">
                            <Building2 className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-400">Order executed via</span>
                            <span className="text-white font-medium">{partner?.icon} {partner?.name}</span>
                            <span className="ml-auto text-cyan-400 text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {partner?.settlementDays}
                            </span>
                        </div>
                    </div>

                    {/* Key Facts */}
                    <div className="bg-navy-800 rounded-2xl border border-white/5 p-6 mb-6">
                        <h2 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Key Facts</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {keyFacts.map((fact, i) => {
                                const Icon = fact.icon
                                return (
                                    <div key={i} className="bg-navy-900/50 rounded-xl p-3">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Icon className="w-3.5 h-3.5 text-slate-500" />
                                            <span className="text-slate-400 text-xs">{fact.label}</span>
                                        </div>
                                        <p className="text-white font-semibold text-sm" style={{ fontFeatureSettings: "'tnum'" }}>
                                            {fact.value}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Asset-class specific details */}
                    {instrument.assetClass === 'equity' && (
                        <div className="bg-navy-800 rounded-2xl border border-white/5 p-6 mb-6">
                            <h2 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Stock Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {instrument.marketCap && (
                                    <div className="bg-navy-900/50 rounded-xl p-3">
                                        <p className="text-slate-400 text-xs mb-1">Market Cap</p>
                                        <p className="text-white font-semibold text-sm">{instrument.marketCap}</p>
                                    </div>
                                )}
                                {instrument.sector && (
                                    <div className="bg-navy-900/50 rounded-xl p-3">
                                        <p className="text-slate-400 text-xs mb-1">Sector</p>
                                        <p className="text-white font-semibold text-sm">{instrument.sector}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {instrument.assetClass === 'agri' && (
                        <div className="bg-navy-800 rounded-2xl border border-white/5 p-6 mb-6">
                            <h2 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Campaign Details</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Campaign</span>
                                    <span className="text-emerald-400 font-medium">{instrument.campaignName}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Campaign Ends</span>
                                    <span className="text-white">{instrument.campaignEndDate ? new Date(instrument.campaignEndDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Harvest Date</span>
                                    <span className="text-white">{instrument.harvestDate ? new Date(instrument.harvestDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</span>
                                </div>
                                {instrument.funded !== undefined && (
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-slate-400">Funded</span>
                                            <span className="text-emerald-400">{instrument.funded}%</span>
                                        </div>
                                        <div className="h-2 bg-navy-900 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" style={{ width: `${instrument.funded}%` }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* AI Analysis */}
                    <div className="bg-gradient-to-br from-navy-800 to-navy-800/80 rounded-2xl border border-cyan-500/10 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-cyan-400" />
                            <h2 className="text-white font-semibold" style={{ fontFamily: 'var(--font-display)' }}>AI Analysis</h2>
                        </div>
                        <div className="flex items-start gap-3 mb-4">
                            <AIBadge suitability={instrument.aiSuitability} score={instrument.aiScore} showScore size="md" />
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            {instrument.aiReason}
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <div className="flex-1 h-2 bg-navy-900 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all"
                                    style={{ width: `${instrument.aiScore}%` }}
                                />
                            </div>
                            <span className="text-cyan-400 text-sm font-bold" style={{ fontFeatureSettings: "'tnum'" }}>
                                {instrument.aiScore}/100
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-navy-800 rounded-2xl border border-white/5 p-6 mb-6">
                        <h2 className="text-white font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>About</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">{instrument.description}</p>
                    </div>

                    {/* Sticky Buy CTA */}
                    <div className="sticky bottom-4 z-40">
                        <button
                            onClick={() => setShowBuy(true)}
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-navy-900 font-bold text-lg shadow-lg shadow-cyan-500/20 hover:opacity-90 transition flex items-center justify-center gap-2"
                        >
                            Buy {instrument.name.split(' ')[0]}
                        </button>
                    </div>
                </div>
            </main>

            <BuyModal isOpen={showBuy} onClose={() => setShowBuy(false)} instrument={instrument} />
        </>
    )
}
