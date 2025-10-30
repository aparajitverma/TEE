-- CreateTable
CREATE TABLE "lead_forms" (
    "lead_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "form_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "country" TEXT,
    "message" TEXT,
    "products_interested" TEXT,
    "source_page" TEXT,
    "status" TEXT NOT NULL DEFAULT 'New',
    "assigned_to" INTEGER,
    "submitted_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "notes" TEXT,
    "follow_up_date" DATETIME,
    "converted_to_client_id" INTEGER
);
