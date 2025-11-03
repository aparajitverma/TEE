-- CreateTable
CREATE TABLE "blog_categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "post_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_blog_posts" (
    "post_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "featured_image_url" TEXT,
    "author_id" INTEGER,
    "author_name" TEXT,
    "category" TEXT NOT NULL,
    "tags" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "published_date" DATETIME,
    "scheduled_date" DATETIME,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "keywords" TEXT,
    "author_email" TEXT,
    "read_time" TEXT,
    "images" TEXT,
    "website_post_id" TEXT,
    "sync_status" TEXT NOT NULL DEFAULT 'not_synced',
    "last_synced" DATETIME,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_blog_posts" ("author_id", "author_name", "category", "content", "created_at", "excerpt", "featured_image_url", "meta_description", "meta_title", "post_id", "published_date", "scheduled_date", "slug", "status", "tags", "title", "updated_at", "views_count") SELECT "author_id", "author_name", "category", "content", "created_at", "excerpt", "featured_image_url", "meta_description", "meta_title", "post_id", "published_date", "scheduled_date", "slug", "status", "tags", "title", "updated_at", "views_count" FROM "blog_posts";
DROP TABLE "blog_posts";
ALTER TABLE "new_blog_posts" RENAME TO "blog_posts";
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "blog_categories_name_key" ON "blog_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "blog_categories_slug_key" ON "blog_categories"("slug");
