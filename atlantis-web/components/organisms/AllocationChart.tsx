'use client'

import { AssetAllocation, assetClassMeta, AssetClass } from '@/data/mock'

interface AllocationChartProps {
    data: AssetAllocation[]
    totalValue: number
}

export const AllocationChart = ({ data, totalValue }: AllocationChartProps) => {
    // Calculate the circumference and stroke dasharray for a donut chart
    const size = 200
    const strokeWidth = 24
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius

    let cumulativePercent = 0

    return (
        <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Donut Chart */}
            <div className="relative">
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth={strokeWidth}
                    />

                    {/* Data segments */}
                    {data.map((item, index) => {
                        const strokeDasharray = (item.percentage / 100) * circumference
                        const strokeDashoffset = -(cumulativePercent / 100) * circumference
                        cumulativePercent += item.percentage

                        return (
                            <circle
                                key={item.assetClass}
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                fill="none"
                                stroke={item.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${strokeDasharray} ${circumference}`}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                                className="transition-all duration-500"
                                style={{ filter: `drop-shadow(0 0 6px ${item.color}40)` }}
                            />
                        )
                    })}
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-slate-400 text-xs font-medium">Total Value</span>
                    <span className="text-white text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                        ৳{(totalValue / 1000).toFixed(0)}K
                    </span>
                </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 flex-1">
                {data.map((item) => {
                    const meta = assetClassMeta[item.assetClass]
                    return (
                        <div
                            key={item.assetClass}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                            <div
                                className="w-3 h-3 rounded-full ring-2 ring-offset-1 ring-offset-navy-900"
                                style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}60` }}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-sm">{meta.icon}</span>
                                    <span className="text-xs text-slate-400 truncate">{meta.label}</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-white font-semibold text-sm">
                                        ৳{item.value.toLocaleString()}
                                    </span>
                                    <span className="text-slate-400 text-xs">
                                        {item.percentage.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
