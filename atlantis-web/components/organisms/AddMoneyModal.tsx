'use client'

import { Card, Button } from '../atoms/base'
import { PaymentMethod } from '@/data/mock'
import { X, CheckCircle2, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AddMoneyModalProps {
    isOpen: boolean
    onClose: () => void
    paymentMethods: PaymentMethod[]
}

const quickAmounts = [1000, 5000, 10000, 25000]

export const AddMoneyModal = ({ isOpen, onClose, paymentMethods }: AddMoneyModalProps) => {
    const [amount, setAmount] = useState('')
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
    const [step, setStep] = useState<'form' | 'success'>('form')

    const handleConfirm = () => {
        setStep('success')
        setTimeout(() => {
            setStep('form')
            setAmount('')
            setSelectedMethod(null)
            onClose()
        }, 2500)
    }

    const handleClose = () => {
        setStep('form')
        setAmount('')
        setSelectedMethod(null)
        onClose()
    }

    const numericAmount = parseInt(amount) || 0
    const canConfirm = numericAmount >= 1000 && selectedMethod

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
                                    Add Money
                                </h2>
                                <button
                                    onClick={handleClose}
                                    className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Amount Input */}
                            <div className="mb-4">
                                <label className="text-sm text-slate-400 mb-2 block">Amount (BDT)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400 font-bold">৳</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0"
                                        min="1000"
                                        className="w-full h-16 pl-12 pr-4 bg-navy-800 border border-navy-700 rounded-2xl text-white text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                                        style={{ fontFamily: 'var(--font-display)', fontFeatureSettings: "'tnum'" }}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Minimum ৳1,000</p>
                            </div>

                            {/* Quick Amount Chips */}
                            <div className="flex gap-2 mb-6">
                                {quickAmounts.map((amt) => (
                                    <button
                                        key={amt}
                                        onClick={() => setAmount(amt.toString())}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${amount === amt.toString()
                                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                                                : 'bg-navy-800 text-slate-400 border border-navy-700 hover:text-white'
                                            }`}
                                    >
                                        ৳{amt.toLocaleString()}
                                    </button>
                                ))}
                            </div>

                            {/* Payment Methods */}
                            <div className="mb-6">
                                <label className="text-sm text-slate-400 mb-3 block">Payment Method</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedMethod(method.id)}
                                            className={`p-4 rounded-2xl text-left transition-all cursor-pointer ${selectedMethod === method.id
                                                    ? 'bg-cyan-500/10 border-2 border-cyan-500/50 shadow-glow'
                                                    : 'bg-navy-800 border border-navy-700 hover:border-white/20'
                                                }`}
                                        >
                                            <span className="text-2xl block mb-2">{method.icon}</span>
                                            <span className={`text-sm font-medium ${selectedMethod === method.id ? 'text-cyan-400' : 'text-white'
                                                }`}>
                                                {method.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Summary */}
                            {numericAmount > 0 && (
                                <Card variant="glass" className="p-4 mb-6">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">Amount</span>
                                        <span className="text-white font-medium">৳{numericAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">Fee</span>
                                        <span className="text-emerald-400 font-medium">৳0 (Free)</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-2 mt-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white font-semibold">Total</span>
                                            <span className="text-white font-bold">৳{numericAmount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Confirm */}
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full"
                                disabled={!canConfirm}
                                onClick={handleConfirm}
                            >
                                Confirm Deposit
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
                                Money Added!
                            </h3>
                            <p className="text-slate-400 text-sm text-center">
                                ৳{numericAmount.toLocaleString()} has been added to your wallet
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
