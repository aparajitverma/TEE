-- CreateTable
CREATE TABLE "saved_searches" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "module" TEXT NOT NULL DEFAULT 'orders',
    "filters" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
