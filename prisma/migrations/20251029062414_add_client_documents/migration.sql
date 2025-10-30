-- CreateTable
CREATE TABLE "client_documents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client_id" INTEGER NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "file_type" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "upload_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploaded_by" TEXT,
    "description" TEXT
);
