-- CreateTable
CREATE TABLE "vendors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vendor_code" TEXT NOT NULL,
    "vendor_name" TEXT NOT NULL,
    "vendor_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "rating" REAL DEFAULT 0,
    "date_added" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated" DATETIME NOT NULL,
    "contact_person" TEXT NOT NULL,
    "phone_primary" TEXT NOT NULL,
    "phone_secondary" TEXT,
    "email" TEXT,
    "whatsapp" TEXT,
    "address_line1" TEXT,
    "address_line2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "country" TEXT DEFAULT 'India',
    "gstin" TEXT,
    "pan" TEXT,
    "bank_name" TEXT,
    "bank_account_number" TEXT,
    "bank_ifsc" TEXT,
    "bank_branch" TEXT,
    "payment_terms" TEXT,
    "credit_limit" REAL DEFAULT 0,
    "products_supplied" TEXT,
    "monthly_capacity" TEXT,
    "minimum_order_qty" TEXT,
    "lead_time_days" INTEGER DEFAULT 0,
    "certifications" TEXT,
    "total_orders" INTEGER NOT NULL DEFAULT 0,
    "total_value" REAL NOT NULL DEFAULT 0,
    "quality_rating" REAL DEFAULT 0,
    "delivery_rating" REAL DEFAULT 0,
    "communication_rating" REAL DEFAULT 0,
    "last_order_date" DATETIME,
    "outstanding_amount" REAL NOT NULL DEFAULT 0,
    "documents" TEXT,
    "notes" TEXT,
    "contract_start_date" DATETIME,
    "contract_end_date" DATETIME,
    "contract_file_url" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "vendors_vendor_code_key" ON "vendors"("vendor_code");

-- CreateIndex
CREATE UNIQUE INDEX "vendors_gstin_key" ON "vendors"("gstin");
