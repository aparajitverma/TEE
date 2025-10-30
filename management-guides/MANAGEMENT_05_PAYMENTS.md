# Payment & Financial Tracking Module - Development Checklist

## 📋 Module Overview
Complete financial management system to track all income, expenses, payments (official and unofficial), profit/loss, and generate financial reports. **Includes secure tracking of facilitation payments/bribes.**

---

## 🎯 Core Features

### 1. Income Tracking
- [x] Client payments (advance, balance, full)
- [x] Payment method tracking
- [x] Multi-currency support
- [x] Payment reconciliation

### 2. Expense Tracking
- [x] Vendor payments
- [x] Operational expenses
- [x] **Unofficial expenses (bribes/facilitation payments)**
- [x] Tax payments
- [x] Salary/wages

### 3. Financial Reports
- [x] Profit & Loss statements
- [x] Cash flow reports
- [x] Expense breakdown
- [x] Tax-ready reports
- [x] **Private financial reports (including unofficial expenses)**

---

## 📊 Database Schema

### Payments Received Table (Income)

#### Basic Information
- [x] `payment_id` (Primary key)
- [x] `payment_number` (Unique, e.g., "PAY-IN-2025-001")
- [x] `payment_date`
- [x] `payment_type` (Advance, Balance, Full Payment, Refund)
- [x] `status` (Pending, Received, Cleared, Bounced)

#### Client & Order Information
- [x] `client_id` (Foreign key)
- [x] `client_name` (Denormalized)
- [x] `order_id` (Foreign key, if linked to order)
- [x] `order_number`
- [x] `invoice_number`

#### Payment Details
- [x] `amount` (Payment amount)
- [x] `currency` (USD, EUR, INR, etc.)
- [x] `exchange_rate` (If not INR)
- [x] `amount_in_inr` (Converted amount)
- [x] `payment_method` (Wire Transfer, LC, PayPal, Cash, Cheque, etc.)
- [x] `reference_number` (Transaction ID, Cheque number, etc.)
- [x] `bank_account` (Which account received payment)

#### Additional Information
- [x] `notes` (Internal notes)
- [x] `receipt_url` (PDF receipt)
- [x] `bank_statement_url` (Proof of payment)
- [x] `received_by` (User ID)
- [x] `created_at`
- [x] `updated_at`

---

### Payments Made Table (Expenses - Official)

#### Basic Information
- [x] `expense_id` (Primary key)
- [x] `expense_number` (Unique, e.g., "PAY-OUT-2025-001")
- [x] `expense_date`
- [x] `expense_category` (Vendor Payment, Salary, Rent, Utilities, Transport, Marketing, etc.)
- [x] `expense_type` (Official, Recurring, One-time)
- [x] `status` (Pending, Paid, Cancelled)

#### Vendor/Payee Information
- [x] `vendor_id` (Foreign key, if vendor payment)
- [x] `payee_name` (Who received payment)
- [x] `order_id` (If linked to purchase order)

#### Payment Details
- [x] `amount`
- [x] `currency`
- [x] `amount_in_inr`
- [x] `payment_method` (Bank Transfer, Cash, Cheque, UPI, etc.)
- [x] `reference_number`
- [x] `bank_account` (Which account paid from)
- [x] `invoice_number` (Vendor invoice)

#### Tax & Accounting
- [x] `tax_deductible` (Boolean)
- [x] `gst_amount` (If applicable)
- [x] `tds_amount` (Tax Deducted at Source)
- [x] `accounting_category` (For tax filing)

#### Additional Information
- [x] `notes`
- [x] `receipt_url`
- [x] `invoice_url`
- [x] `paid_by` (User ID)
- [x] `created_at`
- [x] `updated_at`

---

### Unofficial Expenses Table (SECURE - Bribes/Facilitation Payments)

⚠️ **SECURITY NOTE:** This table requires highest security:
- Encrypted at rest
- Separate access permissions
- No audit logs visible to others
- Optional: Store locally instead of cloud

#### Basic Information
- [x] `unofficial_expense_id` (Primary key)
- [x] `expense_code` (Code name, e.g., "UE-001")
- [x] `expense_date`
- [x] `category` (Customs, Police, Government Official, Inspector, License, Other)
- [x] `status` (Paid, Pending)

#### Payment Details
- [x] `amount`
- [x] `currency`
- [x] `amount_in_inr`
- [x] `payment_method` (Cash, Other)

#### Context (Encrypted)
- [x] `purpose` (Why payment was made - encrypted)
- [x] `recipient_code` (Code name for recipient - encrypted)
- [x] `location` (Where payment was made - encrypted)
- [x] `related_order_id` (If linked to specific order)
- [x] `related_shipment` (If for shipment clearance)

#### Security
- [x] `notes` (Encrypted notes)
- [x] `created_at`
- [x] `last_accessed` (Track who viewed)
- [x] `access_log` (Encrypted log of access)

---

### Bank Accounts Table

- [x] `account_id` (Primary key)
- [x] `account_name` (e.g., "HDFC Current Account")
- [x] `account_number` (Encrypted)
- [x] `bank_name`
- [x] `branch`
- [x] `ifsc_code`
- [x] `account_type` (Current, Savings, Foreign Currency)
- [x] `currency`
- [x] `opening_balance`
- [x] `current_balance` (Auto-calculated)
- [x] `status` (Active, Inactive)

---

## 🖥️ User Interface Components

### Financial Dashboard (`/admin/payments`)

#### Header Section
- [x] Page title: "Financial Management"
- [x] Quick action buttons:
  - [x] Record Payment Received
  - [x] Record Expense
  - [x] **Record Unofficial Expense** (with password/2FA)
  - [ ] Bank Reconciliation
  - [ ] Generate Report

#### Summary Cards (Current Month)
- [x] Total Income
- [x] Total Expenses (Official)
- [x] Net Profit (Income - Official Expenses)
- [ ] **Actual Profit** (Income - All Expenses) - Password protected view
- [ ] Outstanding Receivables
- [ ] Outstanding Payables
- [x] Bank Balance (All accounts)

#### Tabs Navigation
- [x] Payments Received
- [x] Expenses (Official)
- [x] **Unofficial Expenses** (Password protected)
- [x] Bank Accounts
- [x] Reports

---

### Payments Received Tab

#### Filters & Search
- [x] Search by client name, order number, reference
- [ ] Filter by date range
- [ ] Filter by payment method
- [ ] Filter by status
- [ ] Filter by client
- [ ] Filter by currency

#### Payments Table
- [x] Columns:
  - [x] Payment date
  - [x] Payment number
  - [x] Client name (clickable)
  - [x] Order number (clickable)
  - [x] Amount (with currency)
  - [x] Amount in INR
  - [x] Payment method
  - [x] Reference number
  - [x] Status badge
  - [x] Actions (View, Edit, Delete, Download Receipt)
- [x] Total amount (sum of filtered results)
- [x] Export to Excel button

#### Add Payment Form (Modal or Page)
- [x] Payment date (date picker)
- [x] Client (searchable dropdown)
- [x] Order (dropdown, filtered by client)
- [x] Payment type (Advance/Balance/Full)
- [x] Amount
- [x] Currency
- [x] Exchange rate (auto-fetch or manual)
- [x] Payment method
- [x] Reference number
- [x] Bank account (where received)
- [x] Upload receipt/proof
- [x] Notes
- [x] Save button

---

### Expenses (Official) Tab

#### Expense Categories Quick View
- [x] Vendor Payments
- [x] Salaries & Wages
- [x] Rent & Utilities
- [x] Transport & Logistics
- [x] Marketing & Advertising
- [x] Office Supplies
- [x] Professional Fees
- [x] Taxes
- [x] Other

#### Filters & Search
- [x] Search by payee name, reference
- [ ] Filter by date range
- [ ] Filter by category
- [ ] Filter by payment method
- [ ] Filter by vendor
- [ ] Filter by tax deductible

#### Expenses Table
- [x] Columns:
  - [x] Expense date
  - [x] Expense number
  - [x] Category badge
  - [x] Payee name
  - [x] Amount (with currency)
  - [x] Payment method
  - [x] Reference
  - [x] Tax deductible (Yes/No)
  - [x] Status
  - [x] Actions
- [x] Total expenses (sum)
- [x] Export button

#### Add Expense Form
- [x] Expense date
- [x] Category (dropdown)
- [x] Payee name (or select vendor)
- [x] Amount
- [x] Currency
- [x] Payment method
- [x] Reference number
- [x] Bank account (paid from)
- [x] Tax deductible checkbox
- [x] GST amount
- [x] TDS amount
- [x] Upload invoice/receipt
- [x] Notes
- [x] Save button

---

### Unofficial Expenses Tab (🔒 SECURE)

#### Security Gate
- [x] Password prompt before access
- [ ] Or 2FA verification
- [ ] Session timeout (5 minutes)
- [x] Access logging

#### Warning Banner
- [x] "This section contains sensitive information. Access is logged."
- [x] "Do not share screen while viewing this section."

#### Quick Stats (Password Protected)
- [x] Total unofficial expenses (current month)
- [x] Total unofficial expenses (current year)
- [x] Breakdown by category
- [ ] Trend chart (monthly)

#### Filters
- [ ] Filter by date range
- [ ] Filter by category
- [ ] Filter by related order/shipment

#### Expenses Table (Minimal Info)
- [x] Columns:
  - [x] Date
  - [x] Code (e.g., "UE-001")
  - [x] Category
  - [x] Amount
  - [x] Purpose (truncated, click to view full)
  - [x] Actions (View, Edit, Delete)
- [x] Total (sum)
- [x] **No export button** (security)

#### Add Unofficial Expense Form (Secure)
- [x] Expense date
- [x] Category dropdown
- [x] Amount
- [x] Currency
- [x] Payment method (usually Cash)
- [x] Purpose (encrypted text area)
- [x] Recipient code name (encrypted)
- [x] Location (encrypted)
- [x] Related order (optional)
- [x] Related shipment (optional)
- [x] Notes (encrypted)
- [x] Save button (with confirmation)

#### View Details (Modal)
- [x] All encrypted fields decrypted for viewing
- [x] Edit button
- [x] Delete button (with password confirmation)
- [x] Close button

---

### Bank Accounts Tab

#### Accounts List
- [x] Account cards showing:
  - [x] Account name
  - [x] Bank name
  - [x] Account number (masked)
  - [x] Current balance
  - [x] Currency
  - [x] Status
  - [ ] View transactions button
  - [ ] Reconcile button

#### Add Bank Account Form
- [x] Account name
- [x] Bank name
- [x] Account number
- [x] IFSC code
- [x] Branch
- [x] Account type
- [x] Currency
- [x] Opening balance
- [x] Status
- [x] Save button

#### Bank Reconciliation
- [x] Select account
- [x] Select date range
- [x] Upload bank statement (CSV/Excel)
- [x] Auto-match transactions
- [x] Manual matching interface
- [x] Unmatched transactions list
- [x] Reconciliation summary
- [x] Mark as reconciled button

---

### Reports Tab

#### Report Types
- [x] **Profit & Loss Statement**
  - [x] Date range selector
  - [x] Include unofficial expenses toggle (password protected)
  - [x] Generate button
  - [x] Export to PDF/Excel

- [x] **Cash Flow Statement**
  - [x] Monthly/Quarterly/Yearly
  - [x] Cash in vs Cash out
  - [x] Net cash flow
  - [x] Chart visualization

- [x] **Expense Breakdown**
  - [x] By category (pie chart)
  - [x] By month (bar chart)
  - [x] Official vs Unofficial (password protected)

- [x] **Client Payment Report**
  - [x] Outstanding payments
  - [x] Payment collection rate
  - [x] Average payment time
  - [x] Top paying clients

- [x] **Vendor Payment Report**
  - [x] Outstanding payables
  - [x] Payment made by vendor
  - [x] Payment terms compliance

- [x] **Tax Report** (Official expenses only)
  - [x] Tax deductible expenses
  - [x] GST paid/collected
  - [x] TDS deducted
  - [x] Export for CA/accountant

- [x] **Monthly Financial Summary**
  - [x] Income
  - [x] Expenses (Official)
  - [x] Profit (Official)
  - [x] **Actual Profit** (password protected)
  - [x] Month-over-month comparison

---

## 🔧 Functionality Checklist

### Payment Tracking
- [x] Record payment received
- [x] Record expense/payment made
- [x] Record unofficial expense (secure)
- [x] Link payment to order
- [x] Link payment to invoice
- [x] Multi-currency support
- [x] Auto currency conversion
- [ ] Payment reminders
- [ ] Overdue payment alerts

### Bank Management
- [x] Add/edit bank accounts
- [x] Track balance per account
- [x] Bank reconciliation
- [ ] Transfer between accounts
- [x] Bank statement import
- [x] Auto-match transactions

### Financial Calculations
- [x] Auto-calculate totals
- [x] Calculate profit/loss
- [x] Calculate margins
- [x] Calculate tax amounts
- [x] Currency conversion
- [x] Running balance

### Security Features (Unofficial Expenses)
- [x] Encryption at rest
- [x] Password protection
- [ ] 2FA option
- [x] Access logging
- [ ] Session timeout
- [x] Secure deletion
- [ ] Optional local-only storage

### Reporting
- [x] Generate P&L statement
- [x] Generate cash flow report
- [x] Generate expense breakdown
- [x] Generate tax reports
- [x] Custom date ranges
- [x] Export to PDF/Excel
- [ ] Print-friendly format
- [ ] Email reports

### Notifications
- [x] Payment received notification
- [x] Payment due reminder
- [x] Overdue payment alert
- [x] Low bank balance alert
- [x] Large expense alert
- [x] Monthly financial summary email

---

## 📱 Mobile Responsiveness
- [ ] Mobile-friendly payment entry
- [ ] Quick payment recording
- [ ] View balances on mobile
- [ ] Mobile reports (simplified)
- [ ] **Unofficial expenses NOT accessible on mobile** (security)

---

## ✅ Testing Checklist

### Functionality Testing
- [ ] Record payment received
- [ ] Record official expense
- [ ] Record unofficial expense
- [ ] Bank reconciliation
- [ ] Generate reports
- [ ] Currency conversion
- [ ] Payment linking to orders
- [ ] Search and filter
- [ ] Export data

### Security Testing (Unofficial Expenses)
- [ ] Password protection works
- [ ] Data is encrypted
- [ ] Access is logged
- [ ] Session timeout works
- [ ] Cannot export sensitive data
- [ ] Secure deletion works

### Calculation Testing
- [ ] Totals calculate correctly
- [ ] Currency conversion accurate
- [ ] Profit/loss calculation correct
- [ ] Tax calculations correct
- [ ] Bank balance updates correctly

---

## 🚀 Implementation Priority

### Phase 1: MVP (Week 1-2)
- [ ] Payment received tracking
- [ ] Official expense tracking
- [ ] Basic bank accounts
- [ ] Simple P&L report

### Phase 2: Core Features (Week 3)
- [ ] Multi-currency support
- [ ] Payment linking to orders
- [ ] Expense categories
- [ ] Basic reports

### Phase 3: Secure Module (Week 4)
- [ ] **Unofficial expense tracking**
- [ ] **Encryption implementation**
- [ ] **Password protection**
- [ ] **Access logging**

### Phase 4: Advanced Features (Week 5-6)
- [ ] Bank reconciliation
- [ ] Advanced reports
- [ ] Notifications
- [ ] Export functionality

---

## 🔐 Security Best Practices

### For Unofficial Expenses
1. **Encryption:** AES-256 encryption for all sensitive fields
2. **Access Control:** Password + 2FA required
3. **Audit Trail:** Log all access (encrypted)
4. **No Cloud Sync:** Option to store locally only
5. **Auto-Delete:** Option to auto-delete after X days
6. **Code Names:** Use codes instead of real names
7. **Separate Database:** Consider separate encrypted database
8. **Backup:** Encrypted backups only
9. **No Screenshots:** Disable screenshot in this section (if possible)
10. **Session Management:** Auto-logout after 5 minutes of inactivity

---

**Next:** Review and approve, then proceed to Website Management module.
