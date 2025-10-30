-- CreateTable
CREATE TABLE "order_activity_logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_id" INTEGER NOT NULL,
    "action_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "field_name" TEXT,
    "old_value" TEXT,
    "new_value" TEXT,
    "performed_by" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" TEXT,
    CONSTRAINT "order_activity_logs_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
