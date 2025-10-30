# PowerShell script to migrate VendorPayment model
# Run this script to apply the database migration and regenerate Prisma client

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Vendor Payment Migration Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create and apply migration
Write-Host "Step 1: Creating database migration..." -ForegroundColor Yellow
npx prisma migrate dev --name add_vendor_payments

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Migration created and applied successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Migration failed. Please check the error above." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: Generate Prisma Client
Write-Host "Step 2: Regenerating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Prisma Client regenerated successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Client generation failed. Please check the error above." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Migration Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Restart your IDE or TypeScript server" -ForegroundColor White
Write-Host "2. Test the vendor payments API at /api/vendors/[id]/payments" -ForegroundColor White
Write-Host "3. Use the VendorPayments component in your vendor detail page" -ForegroundColor White
Write-Host ""
Write-Host "To view the database, run: npx prisma studio" -ForegroundColor Cyan
