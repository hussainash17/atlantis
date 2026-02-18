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
    cash: mockWalletBalance.available,
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

// ===================== BUY/SELL — INSTRUMENTS & PARTNERS =====================

export interface IntegrationPartner {
    id: string
    name: string
    icon: string
    type: 'broker' | 'bank' | 'amcf' | 'exchange' | 'fintech'
    settlementDays: string
}

export const mockPartners: Record<string, IntegrationPartner> = {
    lankabangla: { id: 'p-1', name: 'LankaBangla Securities', icon: '🏢', type: 'broker', settlementDays: 'T+2' },
    bbDealer: { id: 'p-2', name: 'BB Primary Dealer', icon: '🏛️', type: 'bank', settlementDays: 'At Maturity' },
    dbbl: { id: 'p-3', name: 'Dutch Bangla Bank', icon: '🏦', type: 'bank', settlementDays: '1-3 days' },
    icb: { id: 'p-4', name: 'ICB Asset Management', icon: '📊', type: 'amcf', settlementDays: 'T+3' },
    goldExchange: { id: 'p-5', name: 'BD Gold Exchange', icon: '🥇', type: 'exchange', settlementDays: 'Instant' },
    ifarmer: { id: 'p-6', name: 'iFarmer', icon: '🌾', type: 'fintech', settlementDays: 'At Harvest' },
    bracBank: { id: 'p-7', name: 'BRAC Bank', icon: '🏦', type: 'bank', settlementDays: '1-3 days' },
    aims: { id: 'p-8', name: 'AIMS Bangladesh', icon: '📊', type: 'amcf', settlementDays: 'T+3' },
}

export type AISuitability = 'suitable' | 'caution' | 'not_recommended'
export type OrderType = 'market' | 'limit'

export interface Instrument {
    id: string
    name: string
    ticker?: string
    assetClass: AssetClass
    issuer: string
    partnerId: string
    description: string
    riskLevel: RiskLevel
    aiScore: number // 0-100
    aiSuitability: AISuitability
    aiReason: string
    minInvestment: number
    currentPrice: number
    expectedReturn?: number
    // Equity specific
    orderTypes?: OrderType[]
    lotSize?: number
    marketCap?: string
    sector?: string
    peRatio?: number
    // Fixed income specific
    couponRate?: number
    maturityDate?: string
    faceValue?: number
    // Savings specific
    tenureOptions?: number[] // years
    interestRate?: number
    lockInDays?: number
    // Mutual fund specific
    navPrice?: number
    fundType?: string
    expenseRatio?: number
    exitLoad?: number // percentage
    // Gold specific
    spotPrice?: number // per gram
    minGrams?: number
    purity?: string
    // Agri specific
    campaignName?: string
    campaignEndDate?: string
    harvestDate?: string
    targetYield?: number
    funded?: number // percentage
}

export const mockInstruments: Instrument[] = [
    // ── EQUITIES ──
    {
        id: 'inst-eq-1',
        name: 'Grameenphone Ltd',
        ticker: 'GP',
        assetClass: 'equity',
        issuer: 'Dhaka Stock Exchange',
        partnerId: 'lankabangla',
        description: 'Bangladesh\'s largest telecom operator with 85M+ subscribers, strong cash flows, and consistent dividend payouts.',
        riskLevel: 'medium',
        aiScore: 87,
        aiSuitability: 'suitable',
        aiReason: 'Strong fundamentals with 8.2% dividend yield. Defensive stock suitable for moderate-risk profiles.',
        minInvestment: 412,
        currentPrice: 412,
        orderTypes: ['market', 'limit'],
        lotSize: 1,
        marketCap: '৳556B',
        sector: 'Telecommunication',
        peRatio: 12.4,
        expectedReturn: 12.5,
    },
    {
        id: 'inst-eq-2',
        name: 'Square Pharmaceuticals',
        ticker: 'SQURPHARMA',
        assetClass: 'equity',
        issuer: 'Dhaka Stock Exchange',
        partnerId: 'lankabangla',
        description: 'Leading pharmaceutical company with 18% market share. Export revenue growing at 15% YoY.',
        riskLevel: 'low',
        aiScore: 92,
        aiSuitability: 'suitable',
        aiReason: 'Best-in-class pharma with export diversification. Low beta suitable for conservative investors.',
        minInvestment: 218,
        currentPrice: 218,
        orderTypes: ['market', 'limit'],
        lotSize: 1,
        marketCap: '৳154B',
        sector: 'Pharmaceuticals',
        peRatio: 15.8,
        expectedReturn: 15.0,
    },
    {
        id: 'inst-eq-3',
        name: 'BRAC Bank Ltd',
        ticker: 'BRACBANK',
        assetClass: 'equity',
        issuer: 'Dhaka Stock Exchange',
        partnerId: 'lankabangla',
        description: 'Leading private bank focusing on SME lending. Strong digital banking push with bKash subsidiary.',
        riskLevel: 'medium',
        aiScore: 74,
        aiSuitability: 'caution',
        aiReason: 'Banking sector under margin pressure. NPL concerns but strong digital moat via bKash.',
        minInvestment: 38,
        currentPrice: 38.5,
        orderTypes: ['market', 'limit'],
        lotSize: 1,
        marketCap: '৳62B',
        sector: 'Banking',
        peRatio: 8.2,
        expectedReturn: 18.0,
    },
    // ── FIXED INCOME ──
    {
        id: 'inst-fi-1',
        name: 'Treasury Bond 2030',
        assetClass: 'fixed_income',
        issuer: 'Bangladesh Bank',
        partnerId: 'bbDealer',
        description: 'Government treasury bond with sovereign guarantee. Interest paid semi-annually.',
        riskLevel: 'low',
        aiScore: 95,
        aiSuitability: 'suitable',
        aiReason: 'Risk-free sovereign bond. Ideal for capital preservation and steady income.',
        minInvestment: 10000,
        currentPrice: 10000,
        couponRate: 8.75,
        maturityDate: '2030-06-15',
        faceValue: 10000,
        expectedReturn: 8.75,
    },
    {
        id: 'inst-fi-2',
        name: 'GP Corporate Bond 2028',
        assetClass: 'fixed_income',
        issuer: 'Grameenphone Ltd',
        partnerId: 'bbDealer',
        description: 'AAA-rated corporate bond backed by GP\'s cash flows. Higher yield than treasury with minimal credit risk.',
        riskLevel: 'low',
        aiScore: 88,
        aiSuitability: 'suitable',
        aiReason: 'AAA-rated corporate with excellent credit profile. 85bps spread over treasury compensates for credit risk.',
        minInvestment: 25000,
        currentPrice: 25000,
        couponRate: 9.6,
        maturityDate: '2028-12-01',
        faceValue: 25000,
        expectedReturn: 9.6,
    },
    {
        id: 'inst-fi-3',
        name: 'Bangladesh Sukuk Al-Ijarah',
        assetClass: 'fixed_income',
        issuer: 'Bangladesh Bank',
        partnerId: 'bbDealer',
        description: 'Shariah-compliant government Sukuk instrument. Asset-backed with sovereign guarantee.',
        riskLevel: 'low',
        aiScore: 90,
        aiSuitability: 'suitable',
        aiReason: 'Sovereign-backed Shariah-compliant instrument. Ideal for investors seeking halal fixed-income.',
        minInvestment: 10000,
        currentPrice: 10000,
        couponRate: 7.85,
        maturityDate: '2029-03-30',
        faceValue: 10000,
        expectedReturn: 7.85,
    },
    // ── SAVINGS ──
    {
        id: 'inst-sv-1',
        name: 'DBBL Fixed Deposit',
        assetClass: 'savings',
        issuer: 'Dutch Bangla Bank',
        partnerId: 'dbbl',
        description: 'Term deposit with guaranteed returns. Capital fully protected by deposit insurance up to BDT 200,000.',
        riskLevel: 'low',
        aiScore: 82,
        aiSuitability: 'suitable',
        aiReason: 'Capital-protected with 9.5% annual return. Suitable for emergency fund and low-risk allocation.',
        minInvestment: 5000,
        currentPrice: 5000,
        tenureOptions: [1, 2, 3, 5],
        interestRate: 9.5,
        lockInDays: 365,
        expectedReturn: 9.5,
    },
    {
        id: 'inst-sv-2',
        name: 'BRAC Bank DPS',
        assetClass: 'savings',
        issuer: 'BRAC Bank',
        partnerId: 'bracBank',
        description: 'Monthly deposit pension scheme. Disciplined savings with attractive maturity value.',
        riskLevel: 'low',
        aiScore: 78,
        aiSuitability: 'suitable',
        aiReason: 'Good for systematic savings habit. Monthly BDT 1,000+ contributions with 9.0% return.',
        minInvestment: 1000,
        currentPrice: 1000,
        tenureOptions: [3, 5, 7, 10],
        interestRate: 9.0,
        lockInDays: 1095,
        expectedReturn: 9.0,
    },
    {
        id: 'inst-sv-3',
        name: 'DBBL Digital Savings',
        assetClass: 'savings',
        issuer: 'Dutch Bangla Bank',
        partnerId: 'dbbl',
        description: 'Flexible digital savings with daily interest accrual. No lock-in period. Withdraw anytime.',
        riskLevel: 'low',
        aiScore: 75,
        aiSuitability: 'suitable',
        aiReason: 'Flexible savings with no lock-in. Good for parking idle funds while earning some return.',
        minInvestment: 1000,
        currentPrice: 1000,
        tenureOptions: [],
        interestRate: 5.5,
        lockInDays: 0,
        expectedReturn: 5.5,
    },
    // ── MUTUAL FUNDS ──
    {
        id: 'inst-mf-1',
        name: 'ICB AMCL Growth Fund',
        assetClass: 'mutual_fund',
        issuer: 'ICB Asset Management',
        partnerId: 'icb',
        description: 'Open-end equity mutual fund investing in top DSE-listed companies. NAV updated daily.',
        riskLevel: 'medium',
        aiScore: 84,
        aiSuitability: 'suitable',
        aiReason: 'Well-diversified equity fund with 13.6% 1Y return. Low expense ratio of 2.1%.',
        minInvestment: 1000,
        currentPrice: 14.2,
        navPrice: 14.2,
        fundType: 'Equity Growth',
        expenseRatio: 2.1,
        exitLoad: 1.0,
        expectedReturn: 13.6,
    },
    {
        id: 'inst-mf-2',
        name: 'AIMS Balanced Fund',
        assetClass: 'mutual_fund',
        issuer: 'AIMS Bangladesh',
        partnerId: 'aims',
        description: 'Balanced fund with 60% equity and 40% fixed income allocation. Lower volatility.',
        riskLevel: 'low',
        aiScore: 80,
        aiSuitability: 'suitable',
        aiReason: 'Balanced allocation reduces risk while capturing equity upside. Good starter fund.',
        minInvestment: 1000,
        currentPrice: 11.5,
        navPrice: 11.5,
        fundType: 'Balanced',
        expenseRatio: 1.8,
        exitLoad: 0.5,
        expectedReturn: 8.5,
    },
    {
        id: 'inst-mf-3',
        name: 'ICB Shariah Fund',
        assetClass: 'mutual_fund',
        issuer: 'ICB Asset Management',
        partnerId: 'icb',
        description: 'Shariah-compliant equity fund investing only in halal-screened companies.',
        riskLevel: 'medium',
        aiScore: 79,
        aiSuitability: 'suitable',
        aiReason: 'Shariah-compliant with competitive returns. Limited sector coverage may reduce diversification.',
        minInvestment: 1000,
        currentPrice: 12.8,
        navPrice: 12.8,
        fundType: 'Shariah Equity',
        expenseRatio: 2.3,
        exitLoad: 1.0,
        expectedReturn: 11.2,
    },
    // ── GOLD ──
    {
        id: 'inst-gd-1',
        name: 'Digital Gold 24K',
        assetClass: 'gold',
        issuer: 'BD Gold Exchange',
        partnerId: 'goldExchange',
        description: '24-karat digital gold backed by physical vault storage. Buy from 0.01 grams. Instant settlement.',
        riskLevel: 'low',
        aiScore: 86,
        aiSuitability: 'suitable',
        aiReason: 'Inflation hedge with zero storage cost. Gold at 5-year high — suitable for 5-10% portfolio allocation.',
        minInvestment: 100,
        currentPrice: 9450,
        spotPrice: 9450,
        minGrams: 0.01,
        purity: '24K (99.9%)',
        expectedReturn: 8.0,
    },
    {
        id: 'inst-gd-2',
        name: 'Digital Gold 22K',
        assetClass: 'gold',
        issuer: 'BD Gold Exchange',
        partnerId: 'goldExchange',
        description: '22-karat digital gold. Lower price point, same security. Backed by physical vaults.',
        riskLevel: 'low',
        aiScore: 82,
        aiSuitability: 'suitable',
        aiReason: 'Budget-friendly gold option. Good entry point for small investors wanting gold exposure.',
        minInvestment: 100,
        currentPrice: 8750,
        spotPrice: 8750,
        minGrams: 0.01,
        purity: '22K (91.6%)',
        expectedReturn: 7.5,
    },
    // ── AGRI-FINTECH ──
    {
        id: 'inst-ag-1',
        name: 'iFarmer Rice Campaign — Boro 2026',
        assetClass: 'agri',
        issuer: 'iFarmer',
        partnerId: 'ifarmer',
        description: 'Invest in Boro rice cultivation across Rangpur. Structured return at harvest with crop insurance.',
        riskLevel: 'high',
        aiScore: 72,
        aiSuitability: 'caution',
        aiReason: 'High return potential but weather-dependent. Mitigated by crop insurance. Lock-in until harvest.',
        minInvestment: 5000,
        currentPrice: 5000,
        campaignName: 'Boro Rice 2026 — Rangpur',
        campaignEndDate: '2026-03-15',
        harvestDate: '2026-07-30',
        targetYield: 14.0,
        funded: 72,
        expectedReturn: 14.0,
    },
    {
        id: 'inst-ag-2',
        name: 'iFarmer Shrimp Export — Cox\'s Bazar',
        assetClass: 'agri',
        issuer: 'iFarmer',
        partnerId: 'ifarmer',
        description: 'Export-grade shrimp cultivation in Cox\'s Bazar. Dollar-linked returns from export proceeds.',
        riskLevel: 'high',
        aiScore: 68,
        aiSuitability: 'caution',
        aiReason: 'Export-linked currency upside but disease risk in aquaculture. Lock-in 6 months.',
        minInvestment: 10000,
        currentPrice: 10000,
        campaignName: 'Shrimp Export Q2 2026',
        campaignEndDate: '2026-04-01',
        harvestDate: '2026-09-15',
        targetYield: 16.5,
        funded: 45,
        expectedReturn: 16.5,
    },
    {
        id: 'inst-ag-3',
        name: 'iFarmer Mango Season — Rajshahi',
        assetClass: 'agri',
        issuer: 'iFarmer',
        partnerId: 'ifarmer',
        description: 'Premium Rajshahi mango cultivation. Short 4-month cycle with strong domestic demand.',
        riskLevel: 'medium',
        aiScore: 76,
        aiSuitability: 'suitable',
        aiReason: 'Short cycle reduces risk. Mango has strong domestic demand. Good entry for agri exposure.',
        minInvestment: 3000,
        currentPrice: 3000,
        campaignName: 'Rajshahi Mango 2026',
        campaignEndDate: '2026-03-01',
        harvestDate: '2026-06-30',
        targetYield: 12.0,
        funded: 88,
        expectedReturn: 12.0,
    },
]
