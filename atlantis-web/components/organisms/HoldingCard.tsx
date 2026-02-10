'use client'

import { Holding, assetClassMeta } from '@/data/mock'
import { Card, Badge } from '../atoms/base'
import { TrendingUp, TrendingDown, Clock, Percent, ChevronRight } from 'lucide-react'

interface HoldingCardProps {
    holding: Holding
}

export const HoldingCard = ({ holding }: HoldingCardProps) => {
    const isPositive = holding.gain >= 0
    const meta = assetClassMeta[holding.assetClass]

    const riskColors = {
        low: 'emerald',
        medium: 'cyan',
        high: 'orange',
    } as const

    return (
        <Card variant="solid" className="p-4 hover:bg-navy-700/50 transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                        style={{ backgroundColor: `${meta.color}15` }}
                    >
                        {meta.icon}
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                            {holding.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            {holding.ticker && (
                                <span className="text-slate-400 text-xs font-mono">{holding.ticker}</span>
                            )}
                            <span className="text-slate-500 text-xs">• {holding.issuer}</span>
                        </div>
                    </div>
                </div>
                <Badge variant={riskColors[holding.riskLevel]} className="text-[10px]">
                    {holding.riskLevel}
                </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                    <span className="text-slate-400 text-xs">Current Value</span>
                    <p className="text-white font-semibold" style={{ fontFeatureSettings: "'tnum'" }}>
                        ৳{holding.currentValue.toLocaleString()}
                    </p>
                </div>
                <div>
                    <span className="text-slate-400 text-xs">Invested</span>
                    <p className="text-slate-300 font-medium" style={{ fontFeatureSettings: "'tnum'" }}>
                        ৳{holding.investedValue.toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-2">
                    {isPositive ? (
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                    ) : (
                        <TrendingDown className="w-4 h-4 text-orange-400" />
                    )}
                    <span className={`font-semibold text-sm ${isPositive ? 'text-emerald-400' : 'text-orange-400'}`}>
                        {isPositive ? '+' : ''}৳{holding.gain.toLocaleString()}
                    </span>
                    <span className={`text-xs ${isPositive ? 'text-emerald-400/70' : 'text-orange-400/70'}`}>
                        ({isPositive ? '+' : ''}{holding.gainPercent.toFixed(2)}%)
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {holding.expectedYield && (
                        <div className="flex items-center gap-1 text-emerald-400">
                            <Percent className="w-3 h-3" />
                            <span className="text-xs font-medium">{holding.expectedYield}%</span>
                        </div>
                    )}
                    {holding.maturityDate && (
                        <div className="flex items-center gap-1 text-slate-400">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">
                                {new Date(holding.maturityDate).toLocaleDateString('en-BD', { month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </Card>
    )
}
