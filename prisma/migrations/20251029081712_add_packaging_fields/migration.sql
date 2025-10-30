-- AlterTable
ALTER TABLE "orders" ADD COLUMN "dimensions" TEXT;
ALTER TABLE "orders" ADD COLUMN "gross_weight" REAL;
ALTER TABLE "orders" ADD COLUMN "net_weight" REAL;
ALTER TABLE "orders" ADD COLUMN "number_of_packages" INTEGER;
ALTER TABLE "orders" ADD COLUMN "package_type" TEXT;
ALTER TABLE "orders" ADD COLUMN "special_handling" TEXT;
ALTER TABLE "orders" ADD COLUMN "weight_unit" TEXT DEFAULT 'kg';
