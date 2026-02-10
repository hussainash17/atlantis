# **User Journey & UX Flow Specification**

---

## **Purpose**

This document translates the Atlantis SRS into clear, screen-by-screen user journeys and UX flows so that frontend developers, backend engineers, designers, and QA teams can build without ambiguity. It is designed for zero-knowledge users in finance while remaining robust for advanced users.

---

## **User Personas**

### **P1: First-time Investor (Zero Knowledge)**

* **Age**: 22–45  
* **Experience**: None  
* **Goal**: Invest safely with confidence, small ticket size (BDT 1,000)  
* **Pain Points**: Fear of loss, complex terminology

### **P2: Growing Retail Investor**

* **Experience**: Basic (FDR, DPS, stocks)  
* **Goal**: Diversification, better returns  
* **Pain Points**: Fragmented platforms, poor insights

### **P3: Advanced Retail Trader**

* **Experience**: High  
* **Goal**: Execution speed, analytics  
* **Pain Points**: Poor local tools, lack of AI insights

---

## **Global UX Principles**

* Plain-language financial explanations  
* Progressive disclosure (hide complexity until needed)  
* AI explanations are mandatory, never hidden  
* Safety nudges for beginners  
* Wallet balance always visible

---

## **Journey 1: First-Time User (Zero Knowledge)**

### **Step 1: Landing Page**

**URL**: `/`

#### **Header Components**

* Logo (Atlantis)  
* Navigation: How It Works | Instruments | AI Insights | Safety | Login | Sign Up

#### **Hero Section**

* **Headline**: "Invest Confidently. Even If You're Just Starting."  
* **Subtext**: "Analyze, understand, and invest in Bangladesh's financial instruments with AI."  
* **CTA**: Get Started (Primary), Watch Demo (Secondary)

#### **Trust Layer**

* Partner bank & broker logos  
* Regulatory disclaimers (BSEC, Bangladesh Bank)

#### **Footer**

* About | Compliance | Risk Disclosure | Help Center | Contact

---

### **Step 2: Sign Up**

**URL**: `/signup`

#### **Form Fields**

* Full Name  
* Mobile Number (OTP verification)  
* Email  
* Password

#### **UX Rules**

* Inline validation  
* Password strength meter  
* **CTA**: Create Account

---

### **Step 3: KYC Onboarding**

**URL**: `/kyc`

#### **Steps (Progress Bar)**

1. Personal Details  
2. National ID Upload  
3. Selfie Verification  
4. Bank Account Linking

#### **UX Notes**

* Explain why KYC is required  
* Save & resume later

---

### **Step 4: Welcome & Risk Profiling**

**URL**: `/onboarding`

#### **Screens**

* Welcome message  
* 7-question risk tolerance quiz  
* Time horizon selection

#### **AI Output**

* **Risk Category**: Conservative / Balanced / Growth  
* Explanation in simple language

---

### **Step 5: Dashboard (First View)**

**URL**: `/dashboard`

#### **Widgets**

* Wallet Balance (BDT)  
* Suggested First Investment (AI)  
* Portfolio (empty state)  
* Market Snapshot

#### **Empty State UX**

* "You haven't invested yet. Let's start with BDT 1,000."

---

## **Journey 2: Instrument Discovery**

### **Instrument Marketplace**

**URL**: `/marketplace`

#### **Filters**

* Instrument Type (FDR, DPS, Mutual Fund, Bond, Sukuk, Stock)  
* Risk Level  
* Minimum Investment  
* Issuer (Bank, Broker, Fintech)

#### **Instrument Card**

* Name  
* Expected Return (AI-adjusted)  
* Risk Level (Color-coded)  
* Minimum Amount

---

### **Instrument Detail Page**

**URL**: `/instrument/{id}`

#### **Tabs**

1. Overview  
2. AI Analysis  
3. Risk & Scenarios  
4. Issuer Details  
5. How to Invest

#### **AI Explanation Box**

* "Why Atlantis recommends this"  
* Confidence score

---

## **Journey 3: Invest Flow**

### **Invest Modal**

#### **Inputs**

* Amount (Min BDT 1,000)  
* Payment Source (Wallet)

#### **AI Safety Check**

* Suitability warning if mismatch

#### **Confirmation Screen**

* Amount  
* Expected return  
* Lock-in period

---

## **Journey 4: Wallet**

### **Wallet Dashboard**

**URL**: `/wallet`

#### **Components**

* Available Balance  
* Invested Amount  
* Pending Settlements

#### **Actions**

* Add Money  
* Withdraw  
* Transaction History

---

## **Journey 5: Sell / Exit**

### **Sell Flow**

**URL**: `/sell/{holdingId}`

#### **UX Rules**

* Show penalties or lock-in  
* AI timing suggestion

---

## **Journey 6: Education & Help**

### **Learn Hub**

**URL**: `/learn`

#### **Modules**

* Basics of Investing  
* Understanding Risk  
* AI Explained

---

## **Admin & Edge UX**

* Error handling screens  
* Market closed banners  
* API downtime fallback

---

