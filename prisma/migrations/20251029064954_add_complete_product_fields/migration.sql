-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
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
    "quality_tests_performed" TEXT,
    "quality_certificate_url" TEXT,
    "coa_template_url" TEXT,
    "test_report_url" TEXT,
    "cas_number" TEXT,
    "fssai_approved" BOOLEAN NOT NULL DEFAULT false,
    "fda_approved" BOOLEAN NOT NULL DEFAULT false,
    "eu_compliant" BOOLEAN NOT NULL DEFAULT false,
    "images" TEXT,
    "thumbnail_url" TEXT,
    "video_url" TEXT,
    "brochure_url" TEXT,
    "published_on_website" BOOLEAN NOT NULL DEFAULT false,
    "website_url" TEXT,
    "page_views" INTEGER NOT NULL DEFAULT 0,
    "inquiries_count" INTEGER NOT NULL DEFAULT 0,
    "orders_count" INTEGER NOT NULL DEFAULT 0,
    "total_quantity_sold" REAL NOT NULL DEFAULT 0,
    "total_revenue" REAL NOT NULL DEFAULT 0,
    "average_order_quantity" REAL,
    "last_sold_date" DATETIME,
    "popularity_score" INTEGER NOT NULL DEFAULT 0,
    "date_added" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated" DATETIME NOT NULL
);
INSERT INTO "new_products" ("bulk_pricing", "category", "certifications", "coa_template_url", "cost_price", "currency", "current_stock", "date_added", "featured", "hs_code", "id", "images", "last_updated", "long_description", "margin_percentage", "max_stock_level", "meta_description", "meta_keywords", "moq", "packaging_options", "primary_vendor_id", "product_code", "product_name", "product_name_scientific", "quality_certificate_url", "quality_tests_performed", "reorder_level", "selling_price", "seo_title", "short_description", "slug", "specifications", "status", "stock_unit", "subcategory", "test_report_url", "unit", "vendor_lead_time_days", "vendor_product_code", "warehouse_location") SELECT "bulk_pricing", "category", "certifications", "coa_template_url", "cost_price", "currency", "current_stock", "date_added", "featured", "hs_code", "id", "images", "last_updated", "long_description", "margin_percentage", "max_stock_level", "meta_description", "meta_keywords", "moq", "packaging_options", "primary_vendor_id", "product_code", "product_name", "product_name_scientific", "quality_certificate_url", "quality_tests_performed", "reorder_level", "selling_price", "seo_title", "short_description", "slug", "specifications", "status", "stock_unit", "subcategory", "test_report_url", "unit", "vendor_lead_time_days", "vendor_product_code", "warehouse_location" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_product_code_key" ON "products"("product_code");
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
