-- CreateTable
CREATE TABLE "communication_logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client_id" INTEGER NOT NULL,
    "communication_type" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "date_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" TEXT,
    "summary" TEXT,
    "full_content" TEXT,
    "attachments" TEXT,
    "outcome" TEXT,
    "next_action" TEXT,
    "logged_by" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
