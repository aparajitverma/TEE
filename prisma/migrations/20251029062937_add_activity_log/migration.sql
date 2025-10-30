-- CreateTable
CREATE TABLE "activity_logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client_id" INTEGER NOT NULL,
    "action_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "performed_by" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" TEXT
);
