# **ATLANTIS SYSTEM BLUEPRINT**

**Platform Type**: AI-Powered Financial Marketplace, Wallet & Execution System  
 **Goal**: Enable zero-knowledge users to confidently invest from BDT 1,000 using AI

---

## **SECTION 1 — DETAILED USER JOURNEY MAP**

### **Journey A: Zero-Knowledge User → First Investment**

#### **Step A1: Landing Page Entry**

**URL**: `/`  
 **User Intent**: "I want to grow my money but don't understand investing"

**System Behavior**:

* Show simplified hero CTA  
* No jargon, no charts

**Primary CTA**: Get Started

---

#### **Step A2: Registration Flow**

**Screens**:

1. Phone / Email input  
2. OTP verification  
3. Password setup

**Backend**:

* Create `user_id`  
* Create empty wallet (status: inactive)

---

#### **Step A3: AI Investment Onboarding (Critical)**

**Form Pages**:

* Monthly income range  
* Investment goal (Emergency / Growth / Future)  
* Risk comfort (3-question slider)

**Backend**:

* Create `user_risk_profile`  
* Lock high-risk instruments for beginners

---

#### **Step A4: KYC Flow**

**Forms**:

* NID upload  
* Face verification  
* Bank account linking

**Backend**:

* KYC status \= pending → approved  
* Wallet activated only after approval

---

#### **Step A5: Wallet Funding**

**Screen**: Wallet \> Add Money  
 **Minimum**: BDT 1,000

**Backend Flow**:

* Payment API call  
* Ledger entry: credit  
* Wallet balance update (real-time)

---

#### **Step A6: First AI Recommendation**

**Screen**: Home Dashboard

**Components**:

* "Recommended for You" card  
* Expected return range  
* Risk label

---

#### **Step A7: Investment Execution**

**Flow**:

1. Enter amount  
2. Risk acknowledgement modal  
3. Confirm investment

**Backend**:

* Wallet debit  
* Partner API execution  
* Holding created

---

#### **Step A8: Post-Investment Confidence Loop**

**System Actions**:

* Push notification: "Your money is now working"  
* Show holding status

---

## **SECTION 2 — FRONTEND PAGE-BY-PAGE SPECIFICATION**

### **2.1 Landing Page**

**Header**:

* Logo  
* Login | Get Started

**Hero**:

* Headline  
* CTA button

**Footer**:

* Legal links

---

### **2.2 Dashboard**

**Widgets**:

* Wallet summary  
* AI suggestion  
* Portfolio snapshot

---

### **2.3 Wallet Page**

**Fields**:

* Available balance  
* Invested balance  
* Pending

**Actions**:

* Add money  
* Withdraw

---

### **2.4 Instrument Listing Page**

**Each Card**:

* Name  
* Risk label  
* Min amount

---

### **2.5 Instrument Detail Page**

**Tabs**: Overview | AI | Risk | Issuer

---

## **SECTION 3 — WALLET & FUND FLOW (TECHNICAL)**

### **3.1 Wallet Design**

* Custodial wallet per user  
* Double-entry ledger

**Ledger Fields**:

* `transaction_id`  
* `user_id`  
* `debit`  
* `credit`  
* `balance_after`

---

### **3.2 Fund Flow**

1. User → Atlantis Wallet  
2. Wallet → Partner Escrow  
3. Partner → Instrument Issuer

---

## **SECTION 4 — BACKEND SERVICE ARCHITECTURE**

### **Core Microservices**

* Auth Service  
* User Profile Service  
* KYC Service  
* Wallet Service  
* Instrument Service  
* AI Engine Service  
* Order Execution Service  
* Notification Service

---

## **SECTION 5 — API CONTRACT**

### **Wallet APIs**

* `POST /wallet/add-funds`  
* `POST /wallet/withdraw`  
* `GET /wallet/balance`

### **Investment APIs**

* `POST /invest`  
* `POST /sell`  
* `GET /portfolio`

---

## **SECTION 6 — AI ENGINE SPECIFICATION**

### **AI Layers**

* Recommendation AI  
* Risk AI  
* Suitability AI

**Outputs**:

* Recommendation  
* Confidence score  
* Explanation text

---

## **SECTION 7 — ADMIN & COMPLIANCE**

### **Admin Panel**

* User overview  
* Transaction logs

### **Compliance Panel**

* KYC queue  
* AML alerts

---

