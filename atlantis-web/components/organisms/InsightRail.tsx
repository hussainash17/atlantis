'use client'

import { Insight } from '@/data/mock'
import { Badge, Card } from '../atoms/base'
import { Sparkles, ArrowRight, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react'

const insightIcons = {
    opportunity: TrendingUp,
    education: Lightbulb,
    risk: AlertTriangle,
}

export const InsightRail = ({ insights }: { insights: Insight[] }) => {
    return (
        <section className="mt-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-5 px-1">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10">
                        <Sparkles className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                            Atlantis Insights
                        </h2>
                        <p className="text-xs text-slate-400">AI-powered recommendations</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span className="text-xs text-cyan-400 font-medium">Live</span>
                </div>
            </div>

            {/* Horizontal Scroll */}
            <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x scrollbar-hide">
                {insights.map(insight => {
                    const IconComponent = insightIcons[insight.type]

                    return (
                        <Card
                            key={insight.id}
                            variant="glass"
                            className="snap-center min-w-[320px] p-5 hover:bg-white/10 cursor-pointer group relative overflow-hidden"
                        >
                            {/* Left Accent Bar */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${insight.type === 'opportunity' ? 'bg-emerald-500' :
                                    insight.type === 'risk' ? 'bg-orange-500' : 'bg-cyan-500'
                                }`} />

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${insight.type === 'opportunity' ? 'bg-emerald-500/10' :
                                            insight.type === 'risk' ? 'bg-orange-500/10' : 'bg-cyan-500/10'
                                        }`}>
                                        <IconComponent className={`w-5 h-5 ${insight.type === 'opportunity' ? 'text-emerald-400' :
                                                insight.type === 'risk' ? 'text-orange-400' : 'text-cyan-400'
                                            }`} />
                                    </div>
                                    <Badge variant={insight.confidence > 90 ? 'emerald' : 'cyan'}>
                                        {insight.confidence}% Match
                                    </Badge>
                                </div>
                                {insight.yield && (
                                    <span className="text-emerald-400 font-bold text-lg">
                                        {insight.yield}%
                                    </span>
                                )}
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                                {insight.title}
                            </h3>

                            <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                {insight.summary}
                            </p>

                            <div className="flex items-center text-xs text-cyan-400 font-semibold tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                Explore <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </Card>
                    )
                })}
            </div>
        </section>
    )
}
