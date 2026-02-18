// Asset Classes from Atlantis Concept
export type AssetClass =
    | 'equity'      // Stocks, ETFs
    | 'fixed_income' // T-Bills, Bonds, Sukuk
    | 'savings'     // FDR, DPS, Digital Savings
    | 'mutual_fund' // Equity/Debt/Balanced Funds
    | 'gold'        // Digital Gold, Commodity
    | 'agri'        // Agri-fintech products

export type RiskLevel = 'low' | 'medium' | 'high'

export interface Holding {
    id: string
    name: string
    ticker?: string
    assetClass: AssetClass
    issuer: string
    quantity: number
    avgCost: number
    currentPrice: number
    currentValue: number
    investedValue: number
    gain: number
    gainPercent: number
    riskLevel: RiskLevel
    maturityDate?: string
    expectedYield?: number
    lockInDays?: number
    lastUpdated: string
}

export interface PortfolioSummary {
    totalValue: number
    totalInvested: number
    totalGain: number
    totalGainPercent: number
    dailyChange: number
    dailyChangePercent: number
}

export interface AssetAllocation {
    assetClass: AssetClass
    label: string
    value: number
    percentage: number
    color: string
}

// Asset class metadata
export const assetClassMeta: Record<AssetClass, { label: string; icon: string; color: string }> = {
    equity: { label: 'Equities & ETFs', icon: '📈', color: '#00F0FF' },
    fixed_income: { label: 'Fixed Income', icon: '🏛️', color: '#10B981' },
    savings: { label: 'Savings', icon: '🏦', color: '#3B82F6' },
    mutual_fund: { label: 'Mutual Funds', icon: '📊', color: '#8B5CF6' },
    gold: { label: 'Gold & Commodities', icon: '🥇', color: '#F59E0B' },
    agri: { label: 'Agri-Fintech', icon: '🌾', color: '#22C55E' },
}

// Mock Holdings Data
export const mockHoldings: Holding[] = [
    // Equities
    {
        id: 'eq-1',
        name: 'Grameenphone Ltd',
        ticker: 'GP',
        assetClass: 'equity',
        issuer: 'DSE',
        quantity: 50,
        avgCost: 380,
        currentPrice: 412,
        investedValue: 19000,
        currentValue: 20600,
        gain: 1600,
        gainPercent: 8.42,
        riskLevel: 'medium',
        lastUpdated: '2026-01-23T10:30:00Z',
    },
    {
        id: 'eq-2',
        name: 'BRAC Bank Ltd',
        ticker: 'BRACBANK',
        assetClass: 'equity',
        issuer: 'DSE',
        quantity: 100,
        avgCost: 42,
        currentPrice: 38.5,
        investedValue: 4200,
        currentValue: 3850,
        gain: -350,
        gainPercent: -8.33,
        riskLevel: 'medium',
        lastUpdated: '2026-01-23T10:30:00Z',
    },
    {
        id: 'eq-3',
        name: 'Square Pharma',
        ticker: 'SQURPHARMA',
        assetClass: 'equity',
        issuer: 'DSE',
        quantity: 30,
        avgCost: 195,
        currentPrice: 218,
        investedValue: 5850,
        currentValue: 6540,
        gain: 690,
        gainPercent: 11.79,
        riskLevel: 'low',
        lastUpdated: '2026-01-23T10:30:00Z',
    },
    // Fixed Income
    {
        id: 'fi-1',
        name: 'TB Bond 2028',
        assetClass: 'fixed_income',
        issuer: 'Bangladesh Bank',
        quantity: 1,
        avgCost: 50000,
        currentPrice: 51250,
        investedValue: 50000,
        currentValue: 51250,
        gain: 1250,
        gainPercent: 2.5,
        riskLevel: 'low',
        expectedYield: 9.2,
        maturityDate: '2028-06-15',
        lastUpdated: '2026-01-23T10:30:00Z',
    },
    {
        id: 'fi-2',
        name: 'GP Corporate Bond',
        assetClass: 'fixed_income',
        issuer: 'Grameenphone Ltd',
        quantity: 1,
        avgCost: 25000,
        currentPrice: 25750,
        investedValue: 25000,
        currentValue: 25750,
        gain: 750,
        gainPercent: 3.0,
        riskLevel: 'low',
        expectedYield: 8.5,
        maturityDate: '2027-12-01',
        lastUpdated: '2026-01-23T10:30:00Z',
    },
    // Savings
    {
        id: 'sv-1',
        name: '3-Year FDR',
        assetClass: 'savings',
        issuer: 'Dutch Bangla Bank',
        quantity: 1,
        avgCost: 100000,
        currentPrice: 109500,
        investedValue: 100000,
        currentValue: 109500,
        gain: 9500,
        gainPercent: 9.5,
        riskLevel: 'low',
        expectedYield: 9.5,
        maturityDate: '2028-01-15',
        lockInDays: 730,
        lastUpdated: '2026-01-23T10:30:00Z',
    },
    // Mutual Funds
    {
        id: 'mf-1',
        name: 'ICB AMCL Growth Fund',
        assetClass: 'mutual_fund',
        issuer: 'ICB Asset Management',
        quantity: 500,
        avgCost: 12.5,
        currentPrice: 14.2,
        investedValue: 6250,
        currentValue: 7100,
        gain: 850,
        gainPercent: 13.6,
        riskLevel: 'medium',
        lastUpdated: '2026-01-23T10:30:00Z',
    },
    {
        id: 'mf-2',
        name: 'AIMS Balanced Fund',
        assetClass: 'mutual_fund',
        issuer: 'AIMS Bangladesh',
        quantity: 300,
        avgCost: 10.8,
        currentPrice: 11.5,
        investedValue: 3240,
        currentValue: 3450,
        gain: 210,
        gainPercent: 6.48,
        riskLevel: 'low',
        lastUpdated: '2026-01-23T10:30:00Z',
    },
    // Gold
    {
        id: 'gd-1',
        name: 'Digital Gold',
        assetClass: 'gold',
        issuer: 'Bangladesh Gold Exchange',
        quantity: 5, // grams
        avgCost: 9200,
        currentPrice: 9450,
        investedValue: 46000,
        currentValue: 47250,
        gain: 1250,
        gainPercent: 2.72,
        riskLevel: 'low',
        lastUpdated: '2026-01-23T10:30:00Z',
    },
    // Agri-Fintech
    {
        id: 'ag-1',
        name: 'iFarmer Crop Investment',
        assetClass: 'agri',
        issuer: 'iFarmer',
        quantity: 1,
        avgCost: 15000,
        currentPrice: 16800,
        investedValue: 15000,
        currentValue: 16800,
        gain: 1800,
        gainPercent: 12.0,
        riskLevel: 'high',
        expectedYield: 14.0,
        maturityDate: '2026-06-30',
        lastUpdated: '2026-01-23T10:30:00Z',
    },
]

// ===================== USER PROFILE =====================

export interface UserProfile {
    id: string
    fullName: string
    email: string
    mobile: string
    dateOfBirth: string
    address?: string
    avatarUrl?: string
    memberSince: string
    accountTier: 'starter' | 'silver' | 'gold' | 'platinum'
}

export interface KYCStep {
    name: string
    status: 'complete' | 'pending' | 'not_started'
    completedAt?: string
}

export interface KYCStatus {
    overall: 'not_started' | 'pending' | 'verified' | 'rejected'
    steps: KYCStep[]
}

export interface RiskProfile {
    category: 'conservative' | 'balanced' | 'growth'
    score: number
    investmentGoal: string
    incomeRange: string
    aiExplanation: string
    lastAssessedAt: string
}

export interface LinkedBank {
    id: string
    bankName: string
    accountNumber: string
    isPrimary: boolean
    status: 'active' | 'inactive'
}

export interface SecuritySettings {
    passwordLastChanged: string
    twoFactorEnabled: boolean
    notifications: { push: boolean; email: boolean; sms: boolean }
    language: 'en' | 'bn'
}

export const mockUserProfile: UserProfile = {
    id: 'usr-001',
    fullName: 'Tanvir Ahmed',
    email: 't****r@gmail.com',
    mobile: '+880****7821',
    dateOfBirth: '1994-03-15',
    memberSince: '2025-09-01',
    accountTier: 'gold',
}

export const mockKYCStatus: KYCStatus = {
    overall: 'verified',
    steps: [
        { name: 'Personal Details', status: 'complete', completedAt: '2025-09-01T10:00:00Z' },
        { name: 'NID Verification', status: 'complete', completedAt: '2025-09-01T10:15:00Z' },
        { name: 'Selfie Verification', status: 'complete', completedAt: '2025-09-01T10:20:00Z' },
        { name: 'Bank Account Linked', status: 'complete', completedAt: '2025-09-02T14:30:00Z' },
    ],
}

export const mockRiskProfile: RiskProfile = {
    category: 'balanced',
    score: 58,
    investmentGoal: 'Long-term Growth',
    incomeRange: '৳40,000 – ৳80,000 / month',
    aiExplanation:
        'Based on your responses, you have a moderate tolerance for risk. You are comfortable with short-term market fluctuations in exchange for potentially higher long-term returns. We recommend a diversified mix of equities, fixed income, and savings instruments.',
    lastAssessedAt: '2025-09-01T11:00:00Z',
}

export const mockLinkedBanks: LinkedBank[] = [
    {
        id: 'bnk-1',
        bankName: 'Dutch Bangla Bank',
        accountNumber: '****4521',
        isPrimary: true,
        status: 'active',
    },
    {
        id: 'bnk-2',
        bankName: 'BRAC Bank',
        accountNumber: '****7890',
        isPrimary: false,
        status: 'active',
    },
]

export const mockSecuritySettings: SecuritySettings = {
    passwordLastChanged: '2026-01-10T08:00:00Z',
    twoFactorEnabled: true,
    notifications: { push: true, email: true, sms: false },
    language: 'en',
}

// Calculate portfolio summary
export const calculatePortfolioSummary = (holdings: Holding[]): PortfolioSummary => {
    const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0)
    const totalInvested = holdings.reduce((sum, h) => sum + h.investedValue, 0)
    const totalGain = totalValue - totalInvested
    const totalGainPercent = (totalGain / totalInvested) * 100

    return {
        totalValue,
        totalInvested,
        totalGain,
        totalGainPercent,
        dailyChange: 1850, // Mock
        dailyChangePercent: 0.65, // Mock
    }
}

// Calculate asset allocation
export const calculateAllocation = (holdings: Holding[]): AssetAllocation[] => {
    const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0)

    const grouped = holdings.reduce((acc, h) => {
        if (!acc[h.assetClass]) {
            acc[h.assetClass] = 0
        }
        acc[h.assetClass] += h.currentValue
        return acc
    }, {} as Record<AssetClass, number>)

    return Object.entries(grouped).map(([assetClass, value]) => ({
        assetClass: assetClass as AssetClass,
        label: assetClassMeta[assetClass as AssetClass].label,
        value,
        percentage: (value / totalValue) * 100,
        color: assetClassMeta[assetClass as AssetClass].color,
    }))
}

// Export original mock data (for dashboard)
export interface PortfolioData {
    balance: number
    invested: number
    cash: number
    dailyChange: number
    dailyChangePercent: number
}

export interface Insight {
    id: string
    type: 'opportunity' | 'education' | 'risk'
    title: string
    summary: string
    confidence: number
    yield?: number
}

export const mockPortfolio: PortfolioData = {
    balance: 292090,
    invested: 274540,
    cash: 17550,
    dailyChange: 1850,
    dailyChangePercent: 0.65,
}

export const mockInsights: Insight[] = [
    {
        id: '1',
        type: 'opportunity',
        title: 'Grameenphone Bond',
        summary: 'High yield corporate bond available for 7 days.',
        confidence: 95,
        yield: 9.2,
    },
    {
        id: '2',
        type: 'education',
        title: 'Why is the market down?',
        summary: 'Global inflation concerns are impacting DSEX indices.',
        confidence: 80,
    },
    {
        id: '3',
        type: 'risk',
        title: 'Portfolio Alert',
        summary: 'Your exposure to textile sector is high.',
        confidence: 88,
    }
]

// ===================== WALLET =====================

export interface WalletBalance {
    available: number
    blocked: number
    pending: number
    totalDeposited: number
    totalWithdrawn: number
}

export type TransactionType = 'deposit' | 'withdrawal' | 'investment' | 'settlement' | 'fee'
export type TransactionStatus = 'completed' | 'pending' | 'failed'

export interface Transaction {
    id: string
    type: TransactionType
    title: string
    description: string
    amount: number
    status: TransactionStatus
    date: string
    method?: string
}

export interface PaymentMethod {
    id: string
    name: string
    icon: string
    type: 'mfs' | 'bank' | 'card'
}

export const mockWalletBalance: WalletBalance = {
    available: 17550,
    blocked: 5000,
    pending: 2500,
    totalDeposited: 350000,
    totalWithdrawn: 58000,
}

export const mockPaymentMethods: PaymentMethod[] = [
    { id: 'pm-1', name: 'bKash', icon: '📱', type: 'mfs' },
    { id: 'pm-2', name: 'Nagad', icon: '💳', type: 'mfs' },
    { id: 'pm-3', name: 'Bank Transfer', icon: '🏦', type: 'bank' },
    { id: 'pm-4', name: 'Debit Card', icon: '💎', type: 'card' },
]

export const mockTransactions: Transaction[] = [
    {
        id: 'txn-01',
        type: 'deposit',
        title: 'Added Money',
        description: 'via bKash',
        amount: 25000,
        status: 'completed',
        date: '2026-02-17T14:30:00Z',
        method: 'bKash',
    },
    {
        id: 'txn-02',
        type: 'investment',
        title: 'Invested in Grameenphone Ltd',
        description: 'Equity purchase — 50 shares',
        amount: -19000,
        status: 'completed',
        date: '2026-02-16T10:15:00Z',
    },
    {
        id: 'txn-03',
        type: 'deposit',
        title: 'Added Money',
        description: 'via Bank Transfer',
        amount: 50000,
        status: 'completed',
        date: '2026-02-15T09:00:00Z',
        method: 'Bank Transfer',
    },
    {
        id: 'txn-04',
        type: 'investment',
        title: 'Invested in 3-Year FDR',
        description: 'Dutch Bangla Bank — Fixed Deposit',
        amount: -100000,
        status: 'completed',
        date: '2026-02-14T11:30:00Z',
    },
    {
        id: 'txn-05',
        type: 'settlement',
        title: 'Settlement — TB Bond 2028',
        description: 'Bond maturity interest credited',
        amount: 1250,
        status: 'completed',
        date: '2026-02-13T16:00:00Z',
    },
    {
        id: 'txn-06',
        type: 'withdrawal',
        title: 'Withdrawal to Bank',
        description: 'Dutch Bangla Bank ****4521',
        amount: -15000,
        status: 'completed',
        date: '2026-02-12T13:45:00Z',
        method: 'Bank Transfer',
    },
    {
        id: 'txn-07',
        type: 'fee',
        title: 'Platform Fee',
        description: 'Monthly service charge',
        amount: -99,
        status: 'completed',
        date: '2026-02-10T00:00:00Z',
    },
    {
        id: 'txn-08',
        type: 'deposit',
        title: 'Added Money',
        description: 'via Nagad',
        amount: 10000,
        status: 'completed',
        date: '2026-02-08T17:20:00Z',
        method: 'Nagad',
    },
    {
        id: 'txn-09',
        type: 'investment',
        title: 'Invested in ICB AMCL Growth Fund',
        description: 'Mutual fund — 500 units',
        amount: -6250,
        status: 'completed',
        date: '2026-02-07T10:00:00Z',
    },
    {
        id: 'txn-10',
        type: 'settlement',
        title: 'Settlement — iFarmer Crop',
        description: 'Return on agri-fintech investment',
        amount: 1800,
        status: 'pending',
        date: '2026-02-06T14:00:00Z',
    },
    {
        id: 'txn-11',
        type: 'investment',
        title: 'Invested in Digital Gold',
        description: '5 grams purchased',
        amount: -46000,
        status: 'completed',
        date: '2026-02-05T12:30:00Z',
    },
    {
        id: 'txn-12',
        type: 'deposit',
        title: 'Added Money',
        description: 'via Debit Card',
        amount: 100000,
        status: 'completed',
        date: '2026-02-03T09:15:00Z',
        method: 'Debit Card',
    },
    {
        id: 'txn-13',
        type: 'withdrawal',
        title: 'Withdrawal to Bank',
        description: 'BRAC Bank ****7890',
        amount: -8000,
        status: 'completed',
        date: '2026-02-01T11:00:00Z',
        method: 'Bank Transfer',
    },
    {
        id: 'txn-14',
        type: 'investment',
        title: 'Invested in BRAC Bank Ltd',
        description: 'Equity purchase — 100 shares',
        amount: -4200,
        status: 'completed',
        date: '2026-01-28T10:45:00Z',
    },
    {
        id: 'txn-15',
        type: 'deposit',
        title: 'Initial Deposit',
        description: 'via bKash — Welcome!',
        amount: 5000,
        status: 'completed',
        date: '2025-09-01T12:00:00Z',
        method: 'bKash',
    },
]
