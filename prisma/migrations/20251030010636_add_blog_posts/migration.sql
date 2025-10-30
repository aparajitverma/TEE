-- CreateTable
CREATE TABLE "blog_posts" (
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
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "published_date" DATETIME,
    "scheduled_date" DATETIME,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");
