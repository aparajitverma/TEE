-- CreateTable
CREATE TABLE "media_library" (
    "media_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_type" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "dimensions" TEXT,
    "alt_text" TEXT,
    "title" TEXT,
    "description" TEXT,
    "uploaded_by" INTEGER,
    "uploaded_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used_in" TEXT,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "folder" TEXT DEFAULT 'Uncategorized',
    "tags" TEXT
);
