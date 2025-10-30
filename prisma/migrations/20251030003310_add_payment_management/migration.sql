-- CreateTable
CREATE TABLE "vendor_payments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vendor_id" INTEGER NOT NULL,
    "payment_date" DATETIME NOT NULL,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "payment_method" TEXT NOT NULL,
    "reference_number" TEXT,
    "invoice_number" TEXT,
    "order_id" INTEGER,
    "order_number" TEXT,
    "notes" TEXT,
    "balance_after" REAL NOT NULL,
    "payment_status" TEXT NOT NULL DEFAULT 'Completed',
    "recorded_by" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "vendor_documents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vendor_id" INTEGER NOT NULL,
    "document_name" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "upload_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiry_date" DATETIME,
    "description" TEXT,
    "uploaded_by" TEXT NOT NULL,
    "tags" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "vendor_notes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vendor_id" INTEGER NOT NULL,
    "note_text" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    "is_important" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "vendor_activity_logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vendor_id" INTEGER NOT NULL,
    "action_type" TEXT NOT NULL,
    "action_by" TEXT NOT NULL,
    "details" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "vendor_rating_history" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vendor_id" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "previous_rating" REAL,
    "rating_type" TEXT NOT NULL,
    "on_time_delivery_percent" REAL,
    "quality_rejection_rate" REAL,
    "communication_score" REAL,
    "total_orders" INTEGER,
    "notes" TEXT,
    "rated_by" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "vendor_performance_metrics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vendor_id" INTEGER NOT NULL,
    "total_orders" INTEGER NOT NULL DEFAULT 0,
    "completed_orders" INTEGER NOT NULL DEFAULT 0,
    "on_time_deliveries" INTEGER NOT NULL DEFAULT 0,
    "late_deliveries" INTEGER NOT NULL DEFAULT 0,
    "quality_accepted" INTEGER NOT NULL DEFAULT 0,
    "quality_rejected" INTEGER NOT NULL DEFAULT 0,
    "response_time_avg" REAL,
    "last_calculated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "payments_received" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "payment_number" TEXT NOT NULL,
    "payment_date" DATETIME NOT NULL,
    "payment_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "client_id" INTEGER,
    "client_name" TEXT NOT NULL,
    "order_id" INTEGER,
    "order_number" TEXT,
    "invoice_number" TEXT,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "exchange_rate" REAL DEFAULT 1,
    "amount_in_inr" REAL NOT NULL,
    "payment_method" TEXT NOT NULL,
    "reference_number" TEXT,
    "bank_account" TEXT,
    "notes" TEXT,
    "receipt_url" TEXT,
    "bank_statement_url" TEXT,
    "received_by" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "payments_made" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expense_number" TEXT NOT NULL,
    "expense_date" DATETIME NOT NULL,
    "expense_category" TEXT NOT NULL,
    "expense_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "vendor_id" INTEGER,
    "payee_name" TEXT NOT NULL,
    "order_id" INTEGER,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "amount_in_inr" REAL NOT NULL,
    "payment_method" TEXT NOT NULL,
    "reference_number" TEXT,
    "bank_account" TEXT,
    "invoice_number" TEXT,
    "tax_deductible" BOOLEAN NOT NULL DEFAULT false,
    "gst_amount" REAL DEFAULT 0,
    "tds_amount" REAL DEFAULT 0,
    "accounting_category" TEXT,
    "notes" TEXT,
    "receipt_url" TEXT,
    "invoice_url" TEXT,
    "paid_by" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "unofficial_expenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expense_code" TEXT NOT NULL,
    "expense_date" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Paid',
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "amount_in_inr" REAL NOT NULL,
    "payment_method" TEXT NOT NULL DEFAULT 'Cash',
    "purpose" TEXT NOT NULL,
    "recipient_code" TEXT NOT NULL,
    "location" TEXT,
    "related_order_id" INTEGER,
    "related_shipment" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_accessed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_log" TEXT
);

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_name" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "branch" TEXT,
    "ifsc_code" TEXT,
    "account_type" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "opening_balance" REAL NOT NULL DEFAULT 0,
    "current_balance" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "vendor_performance_metrics_vendor_id_key" ON "vendor_performance_metrics"("vendor_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_received_payment_number_key" ON "payments_received"("payment_number");

-- CreateIndex
CREATE UNIQUE INDEX "payments_made_expense_number_key" ON "payments_made"("expense_number");

-- CreateIndex
CREATE UNIQUE INDEX "unofficial_expenses_expense_code_key" ON "unofficial_expenses"("expense_code");
