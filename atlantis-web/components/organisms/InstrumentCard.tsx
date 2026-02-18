'use client'

import { Card } from '../atoms/base'
import { AIBadge } from '../atoms/AIBadge'
import { Instrument, assetClassMeta, mockPartners } from '@/data/mock'
import { TrendingUp, Clock, Shield } from 'lucide-react'
import Link from 'next/link'

const riskColors: Record<string, string> = {
    low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    high: 'text-red-400 bg-red-500/10 border-red-500/20',
}

export const InstrumentCard = ({ instrument }: { instrument: Instrument }) => {
    const meta = assetClassMeta[instrument.assetClass]
    const partner = mockPartners[instrument.partnerId]

    return (
        <Link href={`/instrument/${instrument.id}`}>
            <Card
                variant="solid"
                className="p-5 hover:bg-navy-700/50 transition-all cursor-pointer group hover:border-cyan-500/20 border border-transparent"
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                        <span className="text-xl">{meta.icon}</span>
                        <div>
                            <h3 className="text-white font-semibold text-sm group-hover:text-cyan-300 transition-colors leading-tight">
                                {instrument.name}
                            </h3>
                            <p className="text-slate-500 text-xs mt-0.5">
                                {instrument.ticker && <span className="text-slate-400 font-medium">{instrument.ticker} · </span>}
                                {instrument.issuer}
                            </p>
                        </div>
                    </div>
                    <AIBadge suitability={instrument.aiSuitability} />
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
                    {instrument.description}
                </p>

                {/* Stats Row */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        {instrument.expectedReturn && (
                            <div className="flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400 text-xs font-semibold">
                                    {instrument.expectedReturn}% p.a.
                                </span>
                            </div>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${riskColors[instrument.riskLevel]}`}>
                            <Shield className="w-3 h-3 inline mr-0.5" />
                            {instrument.riskLevel}
                        </span>
                    </div>
                    <span className="text-slate-400 text-xs" style={{ fontFeatureSettings: "'tnum'" }}>
                        Min ৳{instrument.minInvestment.toLocaleString()}
                    </span>
                </div>

                {/* Footer — Partner & Asset class */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {partner?.settlementDays}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                        {meta.label}
                    </span>
                </div>

                {/* Agri campaign progress */}
                {instrument.assetClass === 'agri' && instrument.funded !== undefined && (
                    <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-slate-400">Campaign funded</span>
                            <span className="text-emerald-400 font-medium">{instrument.funded}%</span>
                        </div>
                        <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all"
                                style={{ width: `${instrument.funded}%` }}
                            />
                        </div>
                    </div>
                )}
            </Card>
        </Link>
    )
}
