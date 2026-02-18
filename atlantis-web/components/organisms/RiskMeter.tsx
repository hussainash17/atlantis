'use client'

import { Card, Badge, Button } from '../atoms/base'
import { RiskProfile } from '@/data/mock'
import { Sparkles, Target, Wallet, RefreshCw } from 'lucide-react'

interface RiskMeterProps {
    risk: RiskProfile
}

const categoryConfig = {
    conservative: { color: '#10B981', label: 'Conservative', bgClass: 'bg-emerald-500/10', textClass: 'text-emerald-400', badgeVariant: 'emerald' as const },
    balanced: { color: '#00F0FF', label: 'Balanced', bgClass: 'bg-cyan-500/10', textClass: 'text-cyan-400', badgeVariant: 'cyan' as const },
    growth: { color: '#F97316', label: 'Growth', bgClass: 'bg-orange-500/10', textClass: 'text-orange-400', badgeVariant: 'orange' as const },
}

export const RiskMeter = ({ risk }: RiskMeterProps) => {
    const config = categoryConfig[risk.category]

    // Arc calculation for the gauge: 180-degree arc from left to right
    const radius = 80
    const centerX = 100
    const centerY = 95
    const startAngle = Math.PI // 180 degrees (left)
    const endAngle = 0 // 0 degrees (right)

    // Score position on the arc (0-100 mapped to 180-0 degrees)
    const scoreAngle = startAngle - (risk.score / 100) * Math.PI
    const needleX = centerX + radius * Math.cos(scoreAngle)
    const needleY = centerY - radius * Math.sin(scoreAngle)

    // Arc path for background
    const arcPath = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`

    return (
        <Card variant="solid" className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${config.bgClass}`}>
                        <Target className={`w-5 h-5 ${config.textClass}`} />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                            Risk Profile
                        </h3>
                        <p className="text-xs text-slate-400">AI-assessed investment personality</p>
                    </div>
                </div>
                <Badge variant={config.badgeVariant}>{config.label}</Badge>
            </div>

            {/* Gauge Visualization */}
            <div className="flex justify-center mb-6">
                <svg width="200" height="110" viewBox="0 0 200 110">
                    {/* Background Arc */}
                    <path
                        d={arcPath}
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    {/* Gradient Arc (filled to score) */}
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="50%" stopColor="#00F0FF" />
                            <stop offset="100%" stopColor="#F97316" />
                        </linearGradient>
                    </defs>
                    <path
                        d={arcPath}
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${(risk.score / 100) * Math.PI * radius} ${Math.PI * radius}`}
                    />
                    {/* Needle Dot */}
                    <circle cx={needleX} cy={needleY} r="8" fill={config.color} opacity="0.3" />
                    <circle cx={needleX} cy={needleY} r="5" fill={config.color} />
                    {/* Score Text */}
                    <text x={centerX} y={centerY - 10} textAnchor="middle" className="fill-white text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                        {risk.score}
                    </text>
                    <text x={centerX} y={centerY + 8} textAnchor="middle" className="fill-slate-400 text-xs">
                        Risk Score
                    </text>
                </svg>
            </div>

            {/* Investment Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-xl bg-navy-800/50 border border-white/5">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                        <Target className="w-3.5 h-3.5" />
                        <span>Investment Goal</span>
                    </div>
                    <p className="text-white text-sm font-semibold">{risk.investmentGoal}</p>
                </div>
                <div className="p-3 rounded-xl bg-navy-800/50 border border-white/5">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                        <Wallet className="w-3.5 h-3.5" />
                        <span>Income Range</span>
                    </div>
                    <p className="text-white text-sm font-semibold">{risk.incomeRange}</p>
                </div>
            </div>

            {/* AI Explanation */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 border border-cyan-500/10 mb-5">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">AI Analysis</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{risk.aiExplanation}</p>
            </div>

            {/* Action */}
            <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                    Last assessed: {new Date(risk.lastAssessedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <Button variant="ghost" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retake Quiz
                </Button>
            </div>
        </Card>
    )
}
