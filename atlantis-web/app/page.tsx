'use client'

import { HeroWallet } from '@/components/organisms/HeroWallet'
import { InsightRail } from '@/components/organisms/InsightRail'
import { mockPortfolio, mockInsights } from '@/data/mock'
import { Bell, UserCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/atoms/base'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const marketData = [
  { name: 'DSEX', value: '5,847.32', change: 1.24, up: true },
  { name: 'DS30', value: '2,103.45', change: 0.87, up: true },
  { name: 'Gold/g', value: '৳9,450', change: -0.32, up: false },
  { name: 'USD/BDT', value: '119.50', change: 0.02, up: true },
]

export default function Dashboard() {
  const router = useRouter()

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
              Atlantis
            </h1>
            <p className="text-xs text-slate-400">Good Evening, Tanvir</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-navy-900" />
            </button>
            <Link href="/profile" className="p-1 rounded-full ring-2 ring-cyan-500/30 hover:ring-cyan-500/60 transition-all">
              <UserCircle className="w-8 h-8 text-slate-300" />
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-8">
        {/* Hero Wallet */}
        <HeroWallet data={mockPortfolio} onAddMoney={() => router.push('/wallet')} />

        {/* AI Insights */}
        <InsightRail insights={mockInsights} />

        {/* Market Pulse */}
        <section>
          <div className="flex items-center justify-between mb-5 px-1">
            <div>
              <h2 className="text-base font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Market Pulse
              </h2>
              <p className="text-xs text-slate-400">Real-time market overview</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-emerald-400 font-medium">Market Open</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {marketData.map((item) => (
              <Card key={item.name} variant="solid" className="p-4 hover:bg-navy-700/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-xs font-medium">{item.name}</span>
                  {item.up ? (
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-orange-400" />
                  )}
                </div>
                <div className="text-white font-semibold text-lg mb-1" style={{ fontFeatureSettings: "'tnum'" }}>
                  {item.value}
                </div>
                <div className={`text-xs font-medium ${item.up ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {item.up ? '+' : ''}{item.change}%
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-3 gap-3">
          {[
            { icon: '📊', label: 'Portfolio', href: '/portfolio' },
            { icon: '💳', label: 'Wallet', href: '/wallet' },
            { icon: '📚', label: 'Learn', href: '/learn' },
          ].map((action) => (
            <Link key={action.label} href={action.href}>
              <Card variant="glass" className="p-4 flex flex-col items-center gap-2 hover:bg-white/10 cursor-pointer transition-colors">
                <span className="text-2xl">{action.icon}</span>
                <span className="text-sm text-slate-300 font-medium">{action.label}</span>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
