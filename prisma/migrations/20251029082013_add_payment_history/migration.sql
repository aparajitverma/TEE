-- CreateTable
CREATE TABLE "payment_history" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_id" INTEGER NOT NULL,
    "payment_date" DATETIME NOT NULL,
    "amount" REAL NOT NULL,
    "payment_method" TEXT NOT NULL,
    "reference_number" TEXT,
    "received_by" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    CONSTRAINT "payment_history_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
