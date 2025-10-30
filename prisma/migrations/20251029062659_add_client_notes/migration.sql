-- CreateTable
CREATE TABLE "client_notes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client_id" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "note_text" TEXT NOT NULL,
    "created_by" TEXT,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" DATETIME NOT NULL
);
