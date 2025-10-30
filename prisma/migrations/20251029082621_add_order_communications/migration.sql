-- CreateTable
CREATE TABLE "order_communications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_id" INTEGER NOT NULL,
    "communication_type" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "date_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" TEXT,
    "summary" TEXT,
    "full_content" TEXT,
    "attachments" TEXT,
    "email_template" TEXT,
    "sent_to" TEXT,
    "logged_by" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "order_communications_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
