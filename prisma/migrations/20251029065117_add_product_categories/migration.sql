-- CreateTable
CREATE TABLE "product_categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL,
    "category_slug" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "product_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "product_subcategories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_id" INTEGER NOT NULL,
    "subcategory_name" TEXT NOT NULL,
    "subcategory_slug" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "product_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_category_name_key" ON "product_categories"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_category_slug_key" ON "product_categories"("category_slug");

-- CreateIndex
CREATE UNIQUE INDEX "product_subcategories_subcategory_slug_key" ON "product_subcategories"("subcategory_slug");
