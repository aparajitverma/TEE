# Prisma Migration Guide

## New VendorPayment Model Added

A new `VendorPayment` model has been added to the Prisma schema to track vendor payment history.

## Required Steps

### 1. Generate Prisma Migration

Run the following command to create and apply the database migration:

```bash
npx prisma migrate dev --name add_vendor_payments
```

This will:
- Create a new migration file in `prisma/migrations/`
- Apply the migration to your SQLite database
- Create the `vendor_payments` table

### 2. Regenerate Prisma Client

After the migration, regenerate the Prisma client:

```bash
npx prisma generate
```

This will:
- Update the Prisma client with the new `VendorPayment` model
- Remove TypeScript errors in the API routes
- Enable full type safety for vendor payments

### 3. Verify the Migration

Check that the migration was successful:

```bash
npx prisma studio
```

This will open Prisma Studio where you can:
- View the new `vendor_payments` table
- Verify the schema structure
- Test adding sample data

## What Was Added

### VendorPayment Model Fields:

- **id**: Auto-incrementing primary key
- **vendorId**: Link to vendor
- **paymentDate**: Date of payment
- **amount**: Payment amount
- **currency**: Currency code (USD, EUR, GBP, INR)
- **paymentMethod**: Method used (Bank Transfer, Cash, Cheque, UPI, etc.)
- **referenceNumber**: Transaction reference
- **invoiceNumber**: Related invoice
- **orderId**: Optional link to order
- **orderNumber**: Order reference
- **notes**: Additional notes
- **balanceAfter**: Outstanding balance after payment
- **paymentStatus**: Status (Completed, Pending, Failed, Cancelled)
- **recordedBy**: User who recorded the payment
- **createdAt**: Timestamp
- **updatedAt**: Timestamp

## Files Affected

After running the migration, the following files will work correctly:

1. `src/app/api/vendors/[id]/payments/route.ts` - API endpoints
2. `src/components/VendorPayments.tsx` - Payment UI component

## Troubleshooting

### If migration fails:

1. **Check database connection**:
   ```bash
   npx prisma db push
   ```

2. **Reset database** (⚠️ This will delete all data):
   ```bash
   npx prisma migrate reset
   ```

3. **Manual migration**:
   ```bash
   npx prisma db push --skip-generate
   npx prisma generate
   ```

### If TypeScript errors persist:

1. Restart your IDE/TypeScript server
2. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```

## Next Steps

After completing the migration:

1. ✅ Test the vendor payments API endpoints
2. ✅ Add sample payment data through the UI
3. ✅ Verify balance calculations
4. ✅ Test payment history display

## Support

For more information:
- [Prisma Migrate Documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Prisma Client Documentation](https://www.prisma.io/docs/concepts/components/prisma-client)
