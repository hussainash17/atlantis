'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Check, Clock, Lock, TrendingUp, AlertTriangle } from 'lucide-react'
import { AIBadge } from '../atoms/AIBadge'
import { Holding, assetClassMeta, mockPartners } from '@/data/mock'

// Map holdings to their partner
const holdingPartnerMap: Record<string, string> = {
    equity: 'lankabangla',
    fixed_income: 'bbDealer',
    savings: 'dbbl',
    mutual_fund: 'icb',
    gold: 'goldExchange',
    agri: 'ifarmer',
}

interface SellModalProps {
    isOpen: boolean
    onClose: () => void
    holding: Holding
}

export const SellModal = ({ isOpen, onClose, holding }: SellModalProps) => {
    const [step, setStep] = useState<'form' | 'confirm' | 'processing' | 'success'>('form')
    const partner = mockPartners[holdingPartnerMap[holding.assetClass]]
    const meta = assetClassMeta[holding.assetClass]

    // Form state
    const [sellQuantity, setSellQuantity] = useState(1)
    const [sellAmount, setSellAmount] = useState(0)

    // Is locked? (agri, savings with remaining lock-in)
    const isAgri = holding.assetClass === 'agri'
    const hasLockIn = holding.lockInDays && holding.lockInDays > 0
    const isLocked = isAgri

    // Computed
    const estimatedProceeds = (() => {
        switch (holding.assetClass) {
            case 'equity':
                return sellQuantity * holding.currentPrice
            case 'mutual_fund':
                return sellQuantity * holding.currentPrice
            case 'gold':
                return sellQuantity * holding.currentPrice
            default:
                return sellAmount || holding.currentValue
        }
    })()

    const fee = Math.round(estimatedProceeds * 0.005)

    // Early exit penalty for savings
    const earlyPenalty = holding.assetClass === 'savings' && hasLockIn
        ? Math.round(estimatedProceeds * 0.02)
        : 0

    const netProceeds = estimatedProceeds - fee - earlyPenalty

    // AI exit suggestion
    const aiSuggestion = holding.gain > 0
        ? { label: 'Hold — price momentum positive', suitability: 'caution' as const }
        : { label: 'Sell — cut losses early', suitability: 'suitable' as const }

    const handleConfirm = () => {
        setStep('processing')
        setTimeout(() => setStep('success'), 2000)
    }

    const handleClose = () => {
        setStep('form')
        setSellQuantity(1)
        setSellAmount(0)
        onClose()
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
                <motion.div
                    className="relative w-full max-w-lg bg-navy-800 rounded-t-2xl md:rounded-2xl border border-white/10 max-h-[90vh] overflow-y-auto"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                >
                    {/* Success */}
                    {step === 'success' && (
                        <div className="p-8 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center"
                            >
                                <Check className="w-8 h-8 text-emerald-400" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                Sell Order Placed!
                            </h3>
                            <p className="text-slate-400 text-sm mb-1">{holding.name}</p>
                            <p className="text-white font-semibold mb-4">
                                Proceeds: ৳{netProceeds.toLocaleString()}
                            </p>
                            <div className="bg-navy-900/50 rounded-xl p-3 mb-6 text-left space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-400">Via</span>
                                    <span className="text-white">{partner?.icon} {partner?.name}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-400">Settlement</span>
                                    <span className="text-cyan-400">{partner?.settlementDays}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleClose}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-navy-900 font-semibold hover:opacity-90 transition"
                            >
                                Done
                            </button>
                        </div>
                    )}

                    {/* Processing */}
                    {step === 'processing' && (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-red-500/30 border-t-red-400 animate-spin" />
                            <h3 className="text-lg font-bold text-white mb-2">Processing Sell Order...</h3>
                            <p className="text-slate-400 text-sm">Sending to {partner?.name}</p>
                        </div>
                    )}

                    {/* Confirm */}
                    {step === 'confirm' && (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                    Confirm Sell
                                </h2>
                                <button onClick={handleClose} className="p-2 rounded-lg hover:bg-white/5 text-slate-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="bg-navy-900/50 rounded-xl p-4 space-y-3 mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400 text-sm">Instrument</span>
                                    <span className="text-white text-sm font-medium">{holding.name}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400 text-sm">Est. Proceeds</span>
                                    <span className="text-white text-sm" style={{ fontFeatureSettings: "'tnum'" }}>
                                        ৳{estimatedProceeds.toLocaleString()}
                                    </span>
                                </div>
                                <div className="border-t border-white/5 pt-2 flex items-center justify-between">
                                    <span className="text-slate-400 text-sm">Platform Fee</span>
                                    <span className="text-white text-sm">-৳{fee.toLocaleString()}</span>
                                </div>
                                {earlyPenalty > 0 && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-amber-400 text-sm">Early Exit Penalty</span>
                                        <span className="text-amber-400 text-sm">-৳{earlyPenalty.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="border-t border-white/5 pt-2 flex items-center justify-between">
                                    <span className="text-white font-semibold text-sm">Net Credit</span>
                                    <span className="text-emerald-400 font-bold" style={{ fontFeatureSettings: "'tnum'" }}>
                                        ৳{netProceeds.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* AI Exit suggestion */}
                            <div className="flex items-start gap-3 p-3 bg-navy-900/50 rounded-xl mb-4 text-xs">
                                <AIBadge suitability={aiSuggestion.suitability} />
                                <p className="text-slate-400 leading-relaxed flex-1">
                                    AI suggests: {aiSuggestion.label}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl mb-6 text-xs">
                                <span>{partner?.icon}</span>
                                <span className="text-slate-400">Executed via</span>
                                <span className="text-white font-medium">{partner?.name}</span>
                                <span className="ml-auto text-cyan-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {partner?.settlementDays}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep('form')}
                                    className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-white/5 transition"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-400 text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                                >
                                    Confirm Sell <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    {step === 'form' && (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                        Sell {holding.name}
                                    </h2>
                                    <p className="text-xs text-slate-400 mt-0.5">{meta.icon} {meta.label}</p>
                                </div>
                                <button onClick={handleClose} className="p-2 rounded-lg hover:bg-white/5 text-slate-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Current Holding Summary */}
                            <div className="bg-navy-900/50 rounded-xl p-4 space-y-2 mb-5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Your Holding</span>
                                    <span className="text-white font-medium">
                                        {holding.quantity} {holding.assetClass === 'gold' ? 'grams' : holding.assetClass === 'equity' || holding.assetClass === 'mutual_fund' ? 'units' : ''}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Avg Cost</span>
                                    <span className="text-white" style={{ fontFeatureSettings: "'tnum'" }}>৳{holding.avgCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Current Value</span>
                                    <span className="text-white font-semibold" style={{ fontFeatureSettings: "'tnum'" }}>৳{holding.currentValue.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-white/5 pt-2">
                                    <span className="text-slate-400">P&L</span>
                                    <span className={`font-semibold ${holding.gain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        <TrendingUp className="w-3 h-3 inline mr-1" />
                                        {holding.gain >= 0 ? '+' : ''}৳{holding.gain.toLocaleString()} ({holding.gain >= 0 ? '+' : ''}{holding.gainPercent}%)
                                    </span>
                                </div>
                            </div>

                            {/* LOCKED — Agri */}
                            {isLocked && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                                    <Lock className="w-8 h-8 text-red-400 mx-auto mb-2" />
                                    <h3 className="text-red-400 font-bold mb-1">Locked Until Harvest</h3>
                                    <p className="text-slate-400 text-sm">
                                        {holding.maturityDate
                                            ? `Maturity: ${new Date(holding.maturityDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}`
                                            : 'This investment cannot be sold before maturity.'
                                        }
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        className="mt-4 w-full py-3 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-white/5 transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}

                            {/* Sellable asset forms */}
                            {!isLocked && (
                                <>
                                    {/* Equity / Mutual Fund / Gold — quantity-based */}
                                    {(['equity', 'mutual_fund', 'gold'] as const).includes(holding.assetClass as 'equity' | 'mutual_fund' | 'gold') && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-slate-400 text-xs font-medium mb-2 block">
                                                    {holding.assetClass === 'gold' ? 'Grams to Sell' : 'Quantity to Sell'}
                                                </label>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => setSellQuantity(Math.max(1, sellQuantity - (holding.assetClass === 'equity' ? 10 : 1)))}
                                                        className="w-10 h-10 rounded-xl bg-navy-900/50 border border-white/10 text-white hover:bg-white/5 transition text-lg font-bold"
                                                    >
                                                        −
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={sellQuantity}
                                                        min={holding.assetClass === 'gold' ? 0.01 : 1}
                                                        max={holding.quantity}
                                                        step={holding.assetClass === 'gold' ? 0.01 : 1}
                                                        onChange={e => setSellQuantity(Math.min(holding.quantity, Math.max(0, Number(e.target.value))))}
                                                        className="flex-1 bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-center text-lg font-semibold focus:border-cyan-500/50 focus:outline-none transition"
                                                    />
                                                    <button
                                                        onClick={() => setSellQuantity(Math.min(holding.quantity, sellQuantity + (holding.assetClass === 'equity' ? 10 : 1)))}
                                                        className="w-10 h-10 rounded-xl bg-navy-900/50 border border-white/10 text-white hover:bg-white/5 transition text-lg font-bold"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="flex justify-between mt-2">
                                                    <button
                                                        onClick={() => setSellQuantity(holding.quantity)}
                                                        className="text-cyan-400 text-xs hover:underline"
                                                    >
                                                        Sell All ({holding.quantity})
                                                    </button>
                                                    <span className="text-slate-400 text-xs" style={{ fontFeatureSettings: "'tnum'" }}>
                                                        ≈ ৳{estimatedProceeds.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Fixed Income — full exit */}
                                    {holding.assetClass === 'fixed_income' && (
                                        <div className="space-y-4">
                                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2">
                                                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                                                <div className="text-xs">
                                                    <p className="text-amber-400 font-medium">Early Exit</p>
                                                    <p className="text-slate-400 mt-0.5">
                                                        Selling before maturity ({holding.maturityDate || 'N/A'}) may result in reduced returns.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-navy-900/30 rounded-xl">
                                                <span className="text-slate-400 text-sm">Full Redemption</span>
                                                <span className="text-white font-semibold" style={{ fontFeatureSettings: "'tnum'" }}>
                                                    ৳{holding.currentValue.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Savings — break early */}
                                    {holding.assetClass === 'savings' && (
                                        <div className="space-y-4">
                                            {hasLockIn && (
                                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2">
                                                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                                                    <div className="text-xs">
                                                        <p className="text-amber-400 font-medium">Early Break Penalty</p>
                                                        <p className="text-slate-400 mt-0.5">
                                                            Breaking before lock-in ({holding.lockInDays} days) incurs a 2% penalty: ৳{earlyPenalty.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between p-3 bg-navy-900/30 rounded-xl">
                                                <span className="text-slate-400 text-sm">Break FDR/DPS</span>
                                                <span className="text-white font-semibold" style={{ fontFeatureSettings: "'tnum'" }}>
                                                    ৳{holding.currentValue.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Proceed */}
                                    <button
                                        onClick={() => setStep('confirm')}
                                        className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-red-400 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
                                    >
                                        Review Sell Order <ArrowRight className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
