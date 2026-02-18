'use client'

import { Card, Badge } from '../atoms/base'
import { KYCStatus } from '@/data/mock'
import { CheckCircle2, Clock, Circle, Shield } from 'lucide-react'

interface KYCProgressProps {
    kyc: KYCStatus
}

export const KYCProgress = ({ kyc }: KYCProgressProps) => {
    const statusIcon = {
        complete: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
        pending: <Clock className="w-5 h-5 text-orange-400 animate-pulse" />,
        not_started: <Circle className="w-5 h-5 text-slate-500" />,
    }

    const overallBadge = {
        verified: { variant: 'emerald' as const, text: '✓ Fully Verified' },
        pending: { variant: 'orange' as const, text: 'Verification Pending' },
        not_started: { variant: 'outline' as const, text: 'Not Started' },
        rejected: { variant: 'orange' as const, text: 'Rejected' },
    }

    const badge = overallBadge[kyc.overall]

    return (
        <Card variant="solid" className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                        <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                            KYC Verification
                        </h3>
                        <p className="text-xs text-slate-400">Identity & compliance status</p>
                    </div>
                </div>
                <Badge variant={badge.variant}>{badge.text}</Badge>
            </div>

            {/* Step Tracker */}
            <div className="space-y-0">
                {kyc.steps.map((step, index) => (
                    <div key={step.name} className="flex items-start gap-4">
                        {/* Timeline */}
                        <div className="flex flex-col items-center">
                            <div className="flex-shrink-0">{statusIcon[step.status]}</div>
                            {index < kyc.steps.length - 1 && (
                                <div
                                    className={`w-0.5 h-8 mt-1 ${step.status === 'complete' ? 'bg-emerald-500/40' : 'bg-navy-700'
                                        }`}
                                />
                            )}
                        </div>

                        {/* Content */}
                        <div className="pb-6 flex-1">
                            <p
                                className={`text-sm font-medium ${step.status === 'complete' ? 'text-white' : 'text-slate-400'
                                    }`}
                            >
                                {step.name}
                            </p>
                            {step.completedAt && (
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {new Date(step.completedAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}
