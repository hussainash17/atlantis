'use client'

import { Card, Button } from '../atoms/base'
import { LinkedBank } from '@/data/mock'
import { X, CheckCircle2, ArrowRight, Building2, Clock, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WithdrawModalProps {
    isOpen: boolean
    onClose: () => void
    availableBalance: number
    linkedBanks: LinkedBank[]
}

export const WithdrawModal = ({ isOpen, onClose, availableBalance, linkedBanks }: WithdrawModalProps) => {
    const [amount, setAmount] = useState('')
    const [selectedBank, setSelectedBank] = useState<string | null>(
        linkedBanks.find(b => b.isPrimary)?.id || null
    )
    const [step, setStep] = useState<'form' | 'success'>('form')

    const numericAmount = parseInt(amount) || 0
    const canConfirm = numericAmount >= 500 && numericAmount <= availableBalance && selectedBank
    const exceedsBalance = numericAmount > availableBalance

    const handleConfirm = () => {
        setStep('success')
        setTimeout(() => {
            setStep('form')
            setAmount('')
            onClose()
        }, 2500)
    }

    const handleClose = () => {
        setStep('form')
        setAmount('')
        onClose()
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

                {/* Modal */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-md bg-navy-900 border border-white/10 rounded-t-3xl md:rounded-3xl p-6 max-h-[90vh] overflow-y-auto"
                >
                    {step === 'form' ? (
                        <>
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                    Withdraw
                                </h2>
                                <button
                                    onClick={handleClose}
                                    className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Available Balance Notice */}
                            <Card variant="glass" className="p-4 mb-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-400">Available Balance</span>
                                    <span className="text-lg text-white font-bold" style={{ fontFeatureSettings: "'tnum'" }}>
                                        ৳{availableBalance.toLocaleString()}
                                    </span>
                                </div>
                            </Card>

                            {/* Amount Input */}
                            <div className="mb-5">
                                <label className="text-sm text-slate-400 mb-2 block">Withdraw Amount (BDT)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400 font-bold">৳</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0"
                                        min="500"
                                        max={availableBalance}
                                        className={`w-full h-16 pl-12 pr-4 bg-navy-800 border rounded-2xl text-white text-3xl font-bold focus:outline-none focus:ring-2 transition-all placeholder:text-slate-600 ${exceedsBalance
                                                ? 'border-orange-500 focus:ring-orange-500/50'
                                                : 'border-navy-700 focus:ring-cyan-500/50 focus:border-cyan-500/50'
                                            }`}
                                        style={{ fontFamily: 'var(--font-display)', fontFeatureSettings: "'tnum'" }}
                                    />
                                </div>
                                {exceedsBalance ? (
                                    <p className="text-xs text-orange-400 mt-1 flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        Exceeds available balance
                                    </p>
                                ) : (
                                    <p className="text-xs text-slate-500 mt-1">Minimum ৳500</p>
                                )}
                            </div>

                            {/* Withdraw All */}
                            <button
                                onClick={() => setAmount(availableBalance.toString())}
                                className="text-sm text-cyan-400 font-medium mb-5 hover:text-cyan-300 transition-colors cursor-pointer"
                            >
                                Withdraw All →
                            </button>

                            {/* Bank Selector */}
                            <div className="mb-6">
                                <label className="text-sm text-slate-400 mb-3 block">Destination Account</label>
                                <div className="space-y-3">
                                    {linkedBanks.filter(b => b.status === 'active').map((bank) => (
                                        <button
                                            key={bank.id}
                                            onClick={() => setSelectedBank(bank.id)}
                                            className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all cursor-pointer ${selectedBank === bank.id
                                                    ? 'bg-cyan-500/10 border-2 border-cyan-500/50'
                                                    : 'bg-navy-800 border border-navy-700 hover:border-white/20'
                                                }`}
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-white/5 flex items-center justify-center flex-shrink-0">
                                                <Building2 className={`w-5 h-5 ${selectedBank === bank.id ? 'text-cyan-400' : 'text-slate-400'
                                                    }`} />
                                            </div>
                                            <div>
                                                <p className={`text-sm font-medium ${selectedBank === bank.id ? 'text-cyan-400' : 'text-white'
                                                    }`}>
                                                    {bank.bankName}
                                                </p>
                                                <p className="text-xs text-slate-500">{bank.accountNumber}</p>
                                            </div>
                                            {bank.isPrimary && (
                                                <span className="ml-auto text-xs text-cyan-400/60 font-medium">Primary</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Processing Time */}
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-navy-800/50 border border-white/5 mb-6">
                                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                <p className="text-xs text-slate-400">
                                    Withdrawals are typically processed within <span className="text-white font-medium">1-2 business days</span>
                                </p>
                            </div>

                            {/* Confirm */}
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full"
                                disabled={!canConfirm}
                                onClick={handleConfirm}
                            >
                                Confirm Withdrawal
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </>
                    ) : (
                        /* Success State */
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center py-8"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.1 }}
                                className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6"
                            >
                                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                Withdrawal Initiated!
                            </h3>
                            <p className="text-slate-400 text-sm text-center">
                                ৳{numericAmount.toLocaleString()} will be transferred within 1-2 business days
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
