-- CreateTable
CREATE TABLE "products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_code" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_name_scientific" TEXT,
    "category" TEXT NOT NULL,
    "subcategory" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "short_description" TEXT,
    "long_description" TEXT,
    "meta_description" TEXT,
    "meta_keywords" TEXT,
    "seo_title" TEXT,
    "slug" TEXT,
    "specifications" TEXT,
    "cost_price" REAL NOT NULL,
    "selling_price" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "unit" TEXT NOT NULL,
    "moq" INTEGER NOT NULL DEFAULT 1,
    "margin_percentage" REAL,
    "bulk_pricing" TEXT,
    "current_stock" REAL NOT NULL DEFAULT 0,
    "stock_unit" TEXT NOT NULL DEFAULT 'kg',
    "reorder_level" REAL,
    "max_stock_level" REAL,
    "warehouse_location" TEXT,
    "primary_vendor_id" INTEGER,
    "vendor_product_code" TEXT,
    "vendor_lead_time_days" INTEGER,
    "packaging_options" TEXT,
    "certifications" TEXT,
    "hs_code" TEXT,
    "images" TEXT,
    "date_added" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "products_product_code_key" ON "products"("product_code");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
