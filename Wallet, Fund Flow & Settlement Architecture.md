# **Wallet, Fund Flow & Settlement Architecture**

---

## **Purpose**

This document defines how money moves inside Atlantis, how user funds are protected, how transactions are executed via third-party partners, and how balances are represented using a global-standard wallet & ledger system. This is written to meet expectations of banks, regulators, auditors, and senior engineers.

---

## **Design Principles**

* User funds are always segregated from Atlantis operating funds  
* Atlantis never directly holds financial instruments  
* All transactions are ledger-backed (double-entry)  
* Every taka movement is traceable  
* Real-time balance ≠ settled balance

---

## **Wallet Architecture Overview**

### **Wallet Types**

#### **1\. User Wallet (BDT)**

* Virtual wallet per user  
* Holds available, blocked, and pending balances  
* Backed by partner escrow account

#### **2\. Escrow Wallet (Partner Bank)**

* Real bank account  
* Holds pooled user funds  
* Operated by licensed bank / MFS

#### **3\. Settlement Wallet (Internal Ledger)**

* Logical wallet for settlement tracking  
* No real money held

#### **4\. Revenue Wallet (Atlantis)**

* Holds platform fees  
* Separate from user funds

---

### **Wallet Balance Structure**

Each user wallet shows:

* **Available Balance** (can invest or withdraw)  
* **Blocked Balance** (investment in progress)  
* **Pending Balance** (awaiting settlement)

---

## **Add Money Flow (Top-Up)**

### **Step-by-Step**

1. User selects "Add Money"  
2. Chooses payment method (Bank, MFS, Card)  
3. Redirected to partner payment gateway  
4. Partner confirms payment via webhook  
5. Ledger entry created  
6. User wallet updated (Available Balance)

### **Ledger Entries**

* **Debit**: Partner Escrow Account  
* **Credit**: User Wallet Available Balance

---

## **Invest Flow (Buy Instrument)**

### **Step-by-Step**

1. User selects instrument  
2. Enters investment amount  
3. AI suitability check  
4. User confirms investment  
5. Amount moved to Blocked Balance  
6. Buy order sent to partner API  
7. Partner confirms execution  
8. Settlement initiated

### **Ledger Entries**

* **Debit**: User Available Balance  
* **Credit**: User Blocked Balance

---

## **Settlement Flow**

### **T+0 / T+1 / T+2 Handling**

* Settlement timelines vary by instrument  
* Pending balance shown separately

### **Post-Settlement**

* Blocked → Invested  
* Holding created in portfolio

---

## **Holdings & Portfolio Representation**

Each holding contains:

* Instrument ID  
* Issuer  
* Purchase price  
* Units  
* Lock-in period  
* Current valuation (AI \+ market)

---

## **Sell / Exit Flow**

### **Step-by-Step**

1. User selects holding  
2. Chooses Sell  
3. AI exit timing suggestion  
4. Sell order sent to partner  
5. Funds marked Pending  
6. Settlement confirmation  
7. Wallet credited

### **Ledger Entries**

* **Debit**: Instrument Settlement Wallet  
* **Credit**: User Available Balance

---

## **Withdraw Flow**

### **Step-by-Step**

1. User initiates withdrawal  
2. Balance availability check  
3. Compliance & fraud check  
4. Partner bank transfer initiated  
5. Wallet updated

---

## **Failure & Reversal Handling**

### **Scenarios**

* API timeout  
* Partial execution  
* Market closed

### **Rules**

* No silent failures  
* Automatic reversals  
* User notified

---

## **Reconciliation & Audit**

* Daily reconciliation with partners  
* Ledger vs bank balance checks  
* Immutable transaction logs

---

## **Security & Controls**

* Role-based access  
* Transaction signing  
* Rate limiting  
* AML monitoring

---

