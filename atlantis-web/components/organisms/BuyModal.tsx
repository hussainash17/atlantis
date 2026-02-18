'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Check, Wallet, Clock, Shield } from 'lucide-react'
import { AIBadge } from '../atoms/AIBadge'
import { Instrument, mockPartners, mockWalletBalance, AssetClass } from '@/data/mock'

interface BuyModalProps {
    isOpen: boolean
    onClose: () => void
    instrument: Instrument
}

export const BuyModal = ({ isOpen, onClose, instrument }: BuyModalProps) => {
    const [step, setStep] = useState<'form' | 'confirm' | 'processing' | 'success'>('form')
    const partner = mockPartners[instrument.partnerId]

    // Form state
    const [amount, setAmount] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
    const [limitPrice, setLimitPrice] = useState(instrument.currentPrice)
    const [selectedTenure, setSelectedTenure] = useState(instrument.tenureOptions?.[0] || 1)
    const [goldMode, setGoldMode] = useState<'amount' | 'grams'>('amount')
    const [grams, setGrams] = useState(0.1)

    // Computed values
    const getTotal = (): number => {
        switch (instrument.assetClass) {
            case 'equity':
                return quantity * (orderType === 'limit' ? limitPrice : instrument.currentPrice)
            case 'gold':
                return goldMode === 'grams'
                    ? grams * (instrument.spotPrice || instrument.currentPrice)
                    : amount
            case 'mutual_fund':
                return amount
            default:
                return amount
        }
    }

    const getUnits = (): string => {
        switch (instrument.assetClass) {
            case 'equity':
                return `${quantity} share${quantity !== 1 ? 's' : ''}`
            case 'mutual_fund':
                return `${(amount / (instrument.navPrice || 1)).toFixed(2)} units`
            case 'gold':
                return goldMode === 'grams'
                    ? `${grams}g`
                    : `${(amount / (instrument.spotPrice || 1)).toFixed(4)}g`
            case 'savings':
                return `${selectedTenure} year${selectedTenure !== 1 ? 's' : ''}`
            case 'agri':
                return `${instrument.funded || 0}% funded`
            default:
                return ''
        }
    }

    const total = getTotal()
    const fee = Math.round(total * 0.005) // 0.5% mock fee
    const grandTotal = total + fee
    const hasSufficientFunds = grandTotal <= mockWalletBalance.available
    const meetsMinimum = total >= instrument.minInvestment

    const handleConfirm = () => {
        setStep('processing')
        setTimeout(() => setStep('success'), 2000)
    }

    const handleClose = () => {
        setStep('form')
        setAmount(0)
        setQuantity(1)
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
                    {/* Success State */}
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
                                Order Placed!
                            </h3>
                            <p className="text-slate-400 text-sm mb-1">
                                {instrument.name}
                            </p>
                            <p className="text-white font-semibold mb-4">
                                ৳{total.toLocaleString()} · {getUnits()}
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

                    {/* Processing State */}
                    {step === 'processing' && (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
                            <h3 className="text-lg font-bold text-white mb-2">Processing Order...</h3>
                            <p className="text-slate-400 text-sm">
                                Sending to {partner?.name}
                            </p>
                        </div>
                    )}

                    {/* Confirm Step */}
                    {step === 'confirm' && (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                    Confirm Order
                                </h2>
                                <button onClick={handleClose} className="p-2 rounded-lg hover:bg-white/5 text-slate-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-navy-900/50 rounded-xl p-4 space-y-3 mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400 text-sm">Instrument</span>
                                    <span className="text-white text-sm font-medium">{instrument.name}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400 text-sm">Amount</span>
                                    <span className="text-white text-sm" style={{ fontFeatureSettings: "'tnum'" }}>
                                        ৳{total.toLocaleString()}
                                    </span>
                                </div>
                                {instrument.assetClass === 'equity' && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 text-sm">Quantity</span>
                                        <span className="text-white text-sm">{getUnits()}</span>
                                    </div>
                                )}
                                {instrument.assetClass === 'mutual_fund' && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 text-sm">Est. Units</span>
                                        <span className="text-white text-sm">{getUnits()}</span>
                                    </div>
                                )}
                                {instrument.assetClass === 'gold' && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 text-sm">Gold</span>
                                        <span className="text-white text-sm">{getUnits()}</span>
                                    </div>
                                )}
                                <div className="border-t border-white/5 pt-2 flex items-center justify-between">
                                    <span className="text-slate-400 text-sm">Platform Fee</span>
                                    <span className="text-white text-sm">৳{fee.toLocaleString()}</span>
                                </div>
                                <div className="border-t border-white/5 pt-2 flex items-center justify-between">
                                    <span className="text-white font-semibold text-sm">Total Debit</span>
                                    <span className="text-cyan-400 font-bold" style={{ fontFeatureSettings: "'tnum'" }}>
                                        ৳{grandTotal.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Via Partner */}
                            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl mb-4 text-xs">
                                <span>{partner?.icon}</span>
                                <span className="text-slate-400">Order executed via</span>
                                <span className="text-white font-medium">{partner?.name}</span>
                                <span className="ml-auto text-cyan-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {partner?.settlementDays}
                                </span>
                            </div>

                            {/* AI Suitability */}
                            <div className="flex items-start gap-3 p-3 bg-navy-900/50 rounded-xl mb-6 text-xs">
                                <AIBadge suitability={instrument.aiSuitability} score={instrument.aiScore} showScore />
                                <p className="text-slate-400 leading-relaxed flex-1">{instrument.aiReason}</p>
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
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-navy-900 font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                                >
                                    Confirm <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Form Step */}
                    {step === 'form' && (
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                        Buy {instrument.name}
                                    </h2>
                                    <p className="text-xs text-slate-400 mt-0.5">{instrument.issuer}</p>
                                </div>
                                <button onClick={handleClose} className="p-2 rounded-lg hover:bg-white/5 text-slate-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Wallet Balance */}
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-navy-900/50 mb-5 text-sm">
                                <Wallet className="w-4 h-4 text-cyan-400" />
                                <span className="text-slate-400">Available:</span>
                                <span className="text-white font-semibold" style={{ fontFeatureSettings: "'tnum'" }}>
                                    ৳{mockWalletBalance.available.toLocaleString()}
                                </span>
                            </div>

                            {/* Asset-class-specific fields */}
                            <AssetFields
                                instrument={instrument}
                                amount={amount}
                                setAmount={setAmount}
                                quantity={quantity}
                                setQuantity={setQuantity}
                                orderType={orderType}
                                setOrderType={setOrderType}
                                limitPrice={limitPrice}
                                setLimitPrice={setLimitPrice}
                                selectedTenure={selectedTenure}
                                setSelectedTenure={setSelectedTenure}
                                goldMode={goldMode}
                                setGoldMode={setGoldMode}
                                grams={grams}
                                setGrams={setGrams}
                            />

                            {/* Errors */}
                            {total > 0 && !hasSufficientFunds && (
                                <p className="text-red-400 text-xs mt-3 flex items-center gap-1">
                                    <Shield className="w-3 h-3" /> Insufficient wallet balance
                                </p>
                            )}
                            {total > 0 && !meetsMinimum && (
                                <p className="text-amber-400 text-xs mt-3 flex items-center gap-1">
                                    <Shield className="w-3 h-3" /> Minimum ৳{instrument.minInvestment.toLocaleString()} required
                                </p>
                            )}

                            {/* Proceed */}
                            <button
                                onClick={() => setStep('confirm')}
                                disabled={!hasSufficientFunds || !meetsMinimum || total === 0}
                                className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-navy-900 font-semibold flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition"
                            >
                                Review Order <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

/* ======================== ASSET-CLASS-SPECIFIC FIELDS ======================== */

interface AssetFieldsProps {
    instrument: Instrument
    amount: number
    setAmount: (v: number) => void
    quantity: number
    setQuantity: (v: number) => void
    orderType: 'market' | 'limit'
    setOrderType: (v: 'market' | 'limit') => void
    limitPrice: number
    setLimitPrice: (v: number) => void
    selectedTenure: number
    setSelectedTenure: (v: number) => void
    goldMode: 'amount' | 'grams'
    setGoldMode: (v: 'amount' | 'grams') => void
    grams: number
    setGrams: (v: number) => void
}

const AssetFields = (props: AssetFieldsProps) => {
    const { instrument } = props

    switch (instrument.assetClass as AssetClass) {
        case 'equity':
            return <EquityFields {...props} />
        case 'fixed_income':
            return <AmountFields label="Face Value (BDT)" min={instrument.minInvestment} extra={`Coupon: ${instrument.couponRate}% · Maturity: ${instrument.maturityDate}`} {...props} />
        case 'savings':
            return <SavingsFields {...props} />
        case 'mutual_fund':
            return <MutualFundFields {...props} />
        case 'gold':
            return <GoldFields {...props} />
        case 'agri':
            return <AgriFields {...props} />
        default:
            return <AmountFields label="Amount (BDT)" min={instrument.minInvestment} {...props} />
    }
}

const EquityFields = ({ instrument, quantity, setQuantity, orderType, setOrderType, limitPrice, setLimitPrice }: AssetFieldsProps) => {
    const price = orderType === 'limit' ? limitPrice : instrument.currentPrice
    return (
        <div className="space-y-4">
            {/* Order Type */}
            <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">Order Type</label>
                <div className="flex gap-2">
                    {(['market', 'limit'] as const).map(t => (
                        <button
                            key={t}
                            onClick={() => setOrderType(t)}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${orderType === t
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                    : 'bg-navy-900/50 text-slate-400 border border-white/5 hover:bg-white/5'
                                }`}
                        >
                            {t === 'market' ? 'Market' : 'Limit'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Limit Price */}
            {orderType === 'limit' && (
                <div>
                    <label className="text-slate-400 text-xs font-medium mb-2 block">Limit Price (৳)</label>
                    <input
                        type="number"
                        value={limitPrice}
                        onChange={e => setLimitPrice(Number(e.target.value))}
                        className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:border-cyan-500/50 focus:outline-none transition"
                    />
                </div>
            )}

            {/* Market Price Display */}
            {orderType === 'market' && (
                <div className="flex items-center justify-between p-3 bg-navy-900/30 rounded-xl">
                    <span className="text-slate-400 text-sm">Market Price</span>
                    <span className="text-white font-semibold" style={{ fontFeatureSettings: "'tnum'" }}>৳{instrument.currentPrice}</span>
                </div>
            )}

            {/* Quantity */}
            <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">Quantity (Shares)</label>
                <div className="flex items-center gap-3">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 10))} className="w-10 h-10 rounded-xl bg-navy-900/50 border border-white/10 text-white hover:bg-white/5 transition text-lg font-bold">−</button>
                    <input
                        type="number"
                        value={quantity}
                        min={1}
                        onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                        className="flex-1 bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-center text-lg font-semibold focus:border-cyan-500/50 focus:outline-none transition"
                    />
                    <button onClick={() => setQuantity(quantity + 10)} className="w-10 h-10 rounded-xl bg-navy-900/50 border border-white/10 text-white hover:bg-white/5 transition text-lg font-bold">+</button>
                </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl">
                <span className="text-slate-300 text-sm font-medium">Total</span>
                <span className="text-cyan-400 font-bold text-lg" style={{ fontFeatureSettings: "'tnum'" }}>
                    ৳{(quantity * price).toLocaleString()}
                </span>
            </div>
        </div>
    )
}

const AmountFields = ({ instrument, amount, setAmount, label, min, extra }: AssetFieldsProps & { label?: string; min?: number; extra?: string }) => {
    const quickAmounts = [5000, 10000, 25000, 50000]
    return (
        <div className="space-y-4">
            <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">{label || 'Amount (BDT)'}</label>
                <div className="flex items-center bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 focus-within:border-cyan-500/50 transition">
                    <span className="text-slate-400 mr-2 text-lg">৳</span>
                    <input
                        type="number"
                        value={amount || ''}
                        min={min || instrument.minInvestment}
                        onChange={e => setAmount(Number(e.target.value))}
                        placeholder="0"
                        className="flex-1 bg-transparent text-white text-lg font-semibold focus:outline-none"
                    />
                </div>
                <p className="text-slate-500 text-xs mt-1">Min ৳{(min || instrument.minInvestment).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
                {quickAmounts.map(a => (
                    <button
                        key={a}
                        onClick={() => setAmount(a)}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium border transition ${amount === a ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-navy-900/30 text-slate-400 border-white/5 hover:bg-white/5'
                            }`}
                    >
                        ৳{(a / 1000).toFixed(0)}K
                    </button>
                ))}
            </div>
            {extra && <p className="text-slate-500 text-xs">{extra}</p>}
        </div>
    )
}

const SavingsFields = (props: AssetFieldsProps) => {
    const { instrument, amount, setAmount, selectedTenure, setSelectedTenure } = props
    const quickAmounts = [5000, 10000, 25000, 100000]
    const maturityValue = amount > 0 ? Math.round(amount * (1 + (instrument.interestRate || 0) / 100) ** selectedTenure) : 0

    return (
        <div className="space-y-4">
            {/* Amount */}
            <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">Deposit Amount (BDT)</label>
                <div className="flex items-center bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 focus-within:border-cyan-500/50 transition">
                    <span className="text-slate-400 mr-2 text-lg">৳</span>
                    <input
                        type="number"
                        value={amount || ''}
                        onChange={e => setAmount(Number(e.target.value))}
                        placeholder="0"
                        className="flex-1 bg-transparent text-white text-lg font-semibold focus:outline-none"
                    />
                </div>
            </div>
            <div className="flex gap-2">
                {quickAmounts.map(a => (
                    <button
                        key={a}
                        onClick={() => setAmount(a)}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium border transition ${amount === a ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-navy-900/30 text-slate-400 border-white/5 hover:bg-white/5'
                            }`}
                    >
                        ৳{a >= 1000 ? `${(a / 1000).toFixed(0)}K` : a}
                    </button>
                ))}
            </div>

            {/* Tenure */}
            {instrument.tenureOptions && instrument.tenureOptions.length > 0 && (
                <div>
                    <label className="text-slate-400 text-xs font-medium mb-2 block">Tenure</label>
                    <div className="flex gap-2">
                        {instrument.tenureOptions.map(t => (
                            <button
                                key={t}
                                onClick={() => setSelectedTenure(t)}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition ${selectedTenure === t
                                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                                        : 'bg-navy-900/30 text-slate-400 border-white/5 hover:bg-white/5'
                                    }`}
                            >
                                {t}Y
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Preview */}
            <div className="bg-navy-900/30 rounded-xl p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-400">Interest Rate</span>
                    <span className="text-emerald-400 font-medium">{instrument.interestRate}% p.a.</span>
                </div>
                {maturityValue > 0 && (
                    <div className="flex justify-between border-t border-white/5 pt-2">
                        <span className="text-slate-400">Maturity Value ({selectedTenure}Y)</span>
                        <span className="text-cyan-400 font-bold" style={{ fontFeatureSettings: "'tnum'" }}>
                            ≈ ৳{maturityValue.toLocaleString()}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

const MutualFundFields = (props: AssetFieldsProps) => {
    const { instrument, amount, setAmount } = props
    const units = amount > 0 ? (amount / (instrument.navPrice || 1)).toFixed(2) : '0.00'
    const quickAmounts = [1000, 5000, 10000, 25000]

    return (
        <div className="space-y-4">
            <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">Investment Amount (BDT)</label>
                <div className="flex items-center bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 focus-within:border-cyan-500/50 transition">
                    <span className="text-slate-400 mr-2 text-lg">৳</span>
                    <input
                        type="number"
                        value={amount || ''}
                        onChange={e => setAmount(Number(e.target.value))}
                        placeholder="0"
                        className="flex-1 bg-transparent text-white text-lg font-semibold focus:outline-none"
                    />
                </div>
            </div>
            <div className="flex gap-2">
                {quickAmounts.map(a => (
                    <button
                        key={a}
                        onClick={() => setAmount(a)}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium border transition ${amount === a ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-navy-900/30 text-slate-400 border-white/5 hover:bg-white/5'
                            }`}
                    >
                        ৳{(a / 1000).toFixed(0)}K
                    </button>
                ))}
            </div>
            <div className="bg-navy-900/30 rounded-xl p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-400">NAV Price</span>
                    <span className="text-white" style={{ fontFeatureSettings: "'tnum'" }}>৳{instrument.navPrice}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-400">Est. Units</span>
                    <span className="text-cyan-400 font-medium">{units}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-400">Fund Type</span>
                    <span className="text-white">{instrument.fundType}</span>
                </div>
                {instrument.exitLoad !== undefined && instrument.exitLoad > 0 && (
                    <div className="flex justify-between">
                        <span className="text-slate-400">Exit Load</span>
                        <span className="text-amber-400">{instrument.exitLoad}%</span>
                    </div>
                )}
            </div>
        </div>
    )
}

const GoldFields = (props: AssetFieldsProps) => {
    const { instrument, amount, setAmount, goldMode, setGoldMode, grams, setGrams } = props
    const spotPrice = instrument.spotPrice || instrument.currentPrice

    return (
        <div className="space-y-4">
            {/* Mode toggle */}
            <div className="flex gap-2">
                <button
                    onClick={() => setGoldMode('amount')}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition ${goldMode === 'amount' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-navy-900/30 text-slate-400 border-white/5 hover:bg-white/5'
                        }`}
                >
                    By Amount (৳)
                </button>
                <button
                    onClick={() => setGoldMode('grams')}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition ${goldMode === 'grams' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-navy-900/30 text-slate-400 border-white/5 hover:bg-white/5'
                        }`}
                >
                    By Weight (g)
                </button>
            </div>

            {goldMode === 'amount' ? (
                <div>
                    <label className="text-slate-400 text-xs font-medium mb-2 block">Amount (BDT)</label>
                    <div className="flex items-center bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 focus-within:border-cyan-500/50 transition">
                        <span className="text-slate-400 mr-2 text-lg">৳</span>
                        <input
                            type="number"
                            value={amount || ''}
                            onChange={e => setAmount(Number(e.target.value))}
                            placeholder="0"
                            className="flex-1 bg-transparent text-white text-lg font-semibold focus:outline-none"
                        />
                    </div>
                    <p className="text-slate-500 text-xs mt-1">≈ {(amount / spotPrice).toFixed(4)} grams</p>
                </div>
            ) : (
                <div>
                    <label className="text-slate-400 text-xs font-medium mb-2 block">Weight (grams)</label>
                    <div className="flex items-center bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 focus-within:border-cyan-500/50 transition">
                        <input
                            type="number"
                            value={grams || ''}
                            step={0.01}
                            min={0.01}
                            onChange={e => setGrams(Number(e.target.value))}
                            placeholder="0.00"
                            className="flex-1 bg-transparent text-white text-lg font-semibold focus:outline-none"
                        />
                        <span className="text-slate-400 ml-2">g</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">≈ ৳{(grams * spotPrice).toLocaleString()}</p>
                </div>
            )}

            <div className="bg-navy-900/30 rounded-xl p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-400">Spot Price</span>
                    <span className="text-amber-400 font-medium" style={{ fontFeatureSettings: "'tnum'" }}>৳{spotPrice.toLocaleString()}/g</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-400">Purity</span>
                    <span className="text-white">{instrument.purity}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-400">Settlement</span>
                    <span className="text-emerald-400">Instant</span>
                </div>
            </div>

            {/* Quick grams */}
            {goldMode === 'grams' && (
                <div className="flex gap-2">
                    {[0.1, 0.5, 1, 5].map(g => (
                        <button
                            key={g}
                            onClick={() => setGrams(g)}
                            className={`flex-1 py-2 rounded-xl text-xs font-medium border transition ${grams === g ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-navy-900/30 text-slate-400 border-white/5 hover:bg-white/5'
                                }`}
                        >
                            {g}g
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

const AgriFields = (props: AssetFieldsProps) => {
    const { instrument, amount, setAmount } = props
    const quickAmounts = [3000, 5000, 10000, 25000]

    return (
        <div className="space-y-4">
            {/* Campaign Info */}
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-400">Campaign</span>
                    <span className="text-emerald-400 font-medium">{instrument.campaignName}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-400">Target Yield</span>
                    <span className="text-emerald-400 font-bold">{instrument.targetYield}%</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-400">Harvest Date</span>
                    <span className="text-white">{new Date(instrument.harvestDate || '').toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                {instrument.funded !== undefined && (
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Funded</span>
                            <span className="text-emerald-400">{instrument.funded}%</span>
                        </div>
                        <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" style={{ width: `${instrument.funded}%` }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Amount */}
            <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">Investment Amount (BDT)</label>
                <div className="flex items-center bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 focus-within:border-cyan-500/50 transition">
                    <span className="text-slate-400 mr-2 text-lg">৳</span>
                    <input
                        type="number"
                        value={amount || ''}
                        onChange={e => setAmount(Number(e.target.value))}
                        placeholder="0"
                        className="flex-1 bg-transparent text-white text-lg font-semibold focus:outline-none"
                    />
                </div>
                <p className="text-amber-400 text-xs mt-1">⚠ Locked until harvest — no early exit</p>
            </div>
            <div className="flex gap-2">
                {quickAmounts.map(a => (
                    <button
                        key={a}
                        onClick={() => setAmount(a)}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium border transition ${amount === a ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-navy-900/30 text-slate-400 border-white/5 hover:bg-white/5'
                            }`}
                    >
                        ৳{(a / 1000).toFixed(0)}K
                    </button>
                ))}
            </div>
        </div>
    )
}
