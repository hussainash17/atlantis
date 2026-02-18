'use client'

import { ProfileHero } from '@/components/organisms/ProfileHero'
import { KYCProgress } from '@/components/organisms/KYCProgress'
import { RiskMeter } from '@/components/organisms/RiskMeter'
import { Card, Badge, Button } from '@/components/atoms/base'
import { ToggleSwitch } from '@/components/atoms/ToggleSwitch'
import {
    mockUserProfile,
    mockKYCStatus,
    mockRiskProfile,
    mockLinkedBanks,
    mockSecuritySettings,
} from '@/data/mock'
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    CalendarDays,
    MapPin,
    Edit3,
    Building2,
    CreditCard,
    Plus,
    Lock,
    Smartphone,
    Bell,
    Globe,
    KeyRound,
    ChevronRight,
    FileText,
    HelpCircle,
    LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ProfilePage() {
    const [security, setSecurity] = useState(mockSecuritySettings)

    const toggleNotification = (key: 'push' | 'email' | 'sms') => {
        setSecurity(prev => ({
            ...prev,
            notifications: { ...prev.notifications, [key]: !prev.notifications[key] },
        }))
    }

    const toggleTwoFactor = () => {
        setSecurity(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))
    }

    return (
        <main className="min-h-screen pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                    My Profile
                                </h1>
                                <p className="text-xs text-slate-400">Manage your account</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">
                {/* 1. Profile Hero */}
                <ProfileHero user={mockUserProfile} kyc={mockKYCStatus} risk={mockRiskProfile} />

                {/* 2. Personal Information */}
                <Card variant="solid" className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-cyan-500/10">
                            <User className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                Personal Information
                            </h3>
                            <p className="text-xs text-slate-400">Your account details</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { icon: User, label: 'Full Name', value: mockUserProfile.fullName },
                            { icon: Mail, label: 'Email', value: mockUserProfile.email },
                            { icon: Phone, label: 'Mobile', value: mockUserProfile.mobile },
                            { icon: CalendarDays, label: 'Date of Birth', value: new Date(mockUserProfile.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
                            { icon: MapPin, label: 'Address', value: mockUserProfile.address || 'Not provided' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm text-slate-400">{item.label}</span>
                                </div>
                                <span className="text-sm text-white font-medium">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* 3. KYC Verification */}
                <KYCProgress kyc={mockKYCStatus} />

                {/* 4. Risk Profile & Investment Preferences */}
                <RiskMeter risk={mockRiskProfile} />

                {/* 5. Linked Bank Accounts */}
                <Card variant="solid" className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-cyan-500/10">
                                <Building2 className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                    Linked Accounts
                                </h3>
                                <p className="text-xs text-slate-400">{mockLinkedBanks.length} bank accounts linked</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm">
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {mockLinkedBanks.map((bank) => (
                            <div
                                key={bank.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-navy-800/50 border border-white/5 hover:border-cyan-500/20 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-white/5 flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{bank.bankName}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <CreditCard className="w-3 h-3 text-slate-500" />
                                            <span className="text-xs text-slate-400">{bank.accountNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {bank.isPrimary && (
                                        <Badge variant="cyan">Primary</Badge>
                                    )}
                                    <Badge variant={bank.status === 'active' ? 'emerald' : 'orange'}>
                                        {bank.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* 6. Security & Preferences */}
                <Card variant="solid" className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-orange-500/10">
                            <Lock className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                Security & Preferences
                            </h3>
                            <p className="text-xs text-slate-400">Manage security and notification settings</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Password */}
                        <div className="flex items-center justify-between py-3 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <KeyRound className="w-4 h-4 text-slate-500" />
                                <div>
                                    <span className="text-sm text-white font-medium">Password</span>
                                    <p className="text-xs text-slate-500">
                                        Last changed {new Date(security.passwordLastChanged).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">
                                Change <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>

                        {/* Two-Factor */}
                        <div className="py-3 border-b border-white/5">
                            <div className="flex items-center gap-3 mb-0">
                                <Smartphone className="w-4 h-4 text-slate-500" />
                                <ToggleSwitch
                                    enabled={security.twoFactorEnabled}
                                    onToggle={toggleTwoFactor}
                                    label="Two-Factor Authentication"
                                    description="Add an extra layer of security to your account"
                                />
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="py-3 border-b border-white/5">
                            <div className="flex items-center gap-2 mb-4">
                                <Bell className="w-4 h-4 text-slate-500" />
                                <span className="text-sm text-white font-medium">Notifications</span>
                            </div>
                            <div className="space-y-4 pl-6">
                                <ToggleSwitch
                                    enabled={security.notifications.push}
                                    onToggle={() => toggleNotification('push')}
                                    label="Push Notifications"
                                />
                                <ToggleSwitch
                                    enabled={security.notifications.email}
                                    onToggle={() => toggleNotification('email')}
                                    label="Email Alerts"
                                />
                                <ToggleSwitch
                                    enabled={security.notifications.sms}
                                    onToggle={() => toggleNotification('sms')}
                                    label="SMS Alerts"
                                />
                            </div>
                        </div>

                        {/* Language */}
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4 text-slate-500" />
                                <span className="text-sm text-white font-medium">Language</span>
                            </div>
                            <span className="text-sm text-slate-400">{security.language === 'en' ? 'English' : 'বাংলা'}</span>
                        </div>
                    </div>
                </Card>

                {/* 7. Quick Actions Footer */}
                <section className="grid grid-cols-3 gap-3">
                    {[
                        { icon: Edit3, label: 'Edit Profile', href: '#' },
                        { icon: FileText, label: 'Statement', href: '#' },
                        { icon: HelpCircle, label: 'Help Center', href: '/learn' },
                    ].map((action) => (
                        <Link key={action.label} href={action.href}>
                            <Card variant="glass" className="p-4 flex flex-col items-center gap-2 hover:bg-white/10 cursor-pointer transition-colors">
                                <action.icon className="w-5 h-5 text-cyan-400" />
                                <span className="text-sm text-slate-300 font-medium">{action.label}</span>
                            </Card>
                        </Link>
                    ))}
                </section>

                {/* Sign Out */}
                <button className="w-full flex items-center justify-center gap-2 py-4 text-sm text-orange-400/70 hover:text-orange-400 transition-colors cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </main>
    )
}
