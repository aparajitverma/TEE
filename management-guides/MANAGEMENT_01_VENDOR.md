# Vendor Management Module - Development Checklist

## 📋 Module Overview
Comprehensive vendor/supplier management system to track all sources of raw materials, products, and services.

---

## 🎯 Core Features

### 1. Vendor Database
- [x] Create vendor master table in database
- [x] Design vendor profile page
- [x] Build vendor list/grid view
- [x] Add search and filter functionality
- [x] Implement sorting (by name, rating, location, etc.)

---

## 📊 Database Schema

### Vendor Table Fields

#### Basic Information
- [x] `vendor_id` (Primary key, auto-increment)
- [x] `vendor_code` (Unique identifier, e.g., "VEN-001")
- [x] `vendor_name` (Full business name)
- [x] `vendor_type` (Farmer, Processor, Wholesaler, Service Provider)
- [x] `status` (Active, Inactive, Blacklisted)
- [x] `rating` (1-5 stars)
- [x] `date_added` (Timestamp)
- [x] `last_updated` (Timestamp)

#### Contact Information
- [x] `contact_person` (Primary contact name)
- [x] `phone_primary` (Main phone number)
- [x] `phone_secondary` (Alternate number)
- [x] `email` (Email address)
- [x] `whatsapp` (WhatsApp number)
- [x] `address_line1`
- [x] `address_line2`
- [x] `city`
- [x] `state`
- [x] `pincode`
- [x] `country` (Default: India)

#### Business Details
- [x] `gstin` (GST number)
- [x] `pan` (PAN number)
- [x] `bank_name`
- [x] `bank_account_number`
- [x] `bank_ifsc`
- [x] `bank_branch`
- [x] `payment_terms` (Net 30, Net 60, Advance, etc.)
- [x] `credit_limit` (Maximum outstanding amount)

#### Product & Capacity
- [x] `products_supplied` (JSON array or separate table)
- [x] `monthly_capacity` (In MT or units)
- [x] `minimum_order_qty`
- [x] `lead_time_days` (How many days to fulfill order)
- [x] `certifications` (Organic, ISO, etc.)

#### Performance Metrics
- [x] `total_orders` (Count)
- [x] `total_value` (Lifetime purchase value)
- [x] `quality_rating` (1-5)
- [x] `delivery_rating` (1-5)
- [x] `communication_rating` (1-5)
- [x] `last_order_date`
- [x] `outstanding_amount` (Current dues)

#### Documents & Notes
- [x] `documents` (JSON array of file URLs)
- [x] `notes` (Internal notes, not visible to vendor)
- [x] `contract_start_date`
- [x] `contract_end_date`
- [x] `contract_file_url`

---

## 🖥️ User Interface Components

### Vendor List Page (`/admin/vendors`)

#### Header Section
- [x] Page title: "Vendor Management"
- [x] Add New Vendor button (+ icon)
- [x] Export to Excel button
- [ ] Import from CSV button
- [x] Total vendor count display

#### Filter & Search Bar
- [x] Search box (search by name, code, phone, email)
- [x] Filter by vendor type dropdown
- [x] Filter by status (Active/Inactive/Blacklisted)
- [ ] Filter by rating (5 star, 4+, 3+, etc.)
- [ ] Filter by location (state/city)
- [x] Clear filters button

#### Vendor Table/Grid
- [x] Vendor code (clickable to view details)
- [x] Vendor name (clickable to view details)
- [x] Type badge (color-coded)
- [x] Contact person
- [x] Phone number (click to call)
- [x] Products supplied (truncated list)
- [x] Rating (star display)
- [x] Status badge (Active/Inactive)
- [x] Outstanding amount (highlighted if > 0)
- [x] Last order date
- [x] Quick actions dropdown:
  - [x] View details
  - [x] Edit
  - [ ] Create order
  - [ ] View orders
  - [ ] Mark inactive
  - [x] Delete (with confirmation)

#### Pagination
- [x] Items per page selector (10, 25, 50, 100)
- [x] Page navigation
- [x] Total records count

---

### Vendor Detail Page (`/admin/vendors/[id]`)

#### Header
- [x] Vendor name (large heading)
- [x] Vendor code
- [x] Status badge
- [x] Overall rating (stars)
- [x] Edit button
- [x] Delete button
- [x] Back to list button

#### Tabs Navigation
- [ ] Overview tab
- [ ] Orders tab
- [ ] Payments tab
- [ ] Documents tab
- [ ] Notes tab
- [ ] Activity Log tab

#### Overview Tab
**Contact Card**
- [x] Contact person name
- [x] Phone numbers (with click-to-call)
- [x] Email (with click-to-email)
- [x] WhatsApp (with click-to-chat)
- [x] Full address
- [ ] Map view (optional, Google Maps embed)

**Business Details Card**
- [x] Vendor type
- [x] GST number
- [x] PAN number
- [x] Payment terms
- [x] Credit limit
- [x] Current outstanding

**Bank Details Card**
- [x] Bank name
- [x] Account number (masked, show on click)
- [x] IFSC code
- [x] Branch name

**Products & Capacity Card**
- [x] List of products supplied
- [x] Monthly capacity
- [x] Minimum order quantity
- [x] Lead time
- [x] Certifications (badges)

**Performance Metrics Card**
- [x] Total orders count
- [x] Total purchase value
- [x] Quality rating (with stars)
- [x] Delivery rating (with stars)
- [x] Communication rating (with stars)
- [ ] Last order date
- [x] Average order value

#### Orders Tab
- [x] List of all orders from this vendor
- [x] Order number (clickable)
- [x] Order date
- [x] Products ordered
- [x] Quantity
- [x] Amount
- [x] Status
- [x] Payment status
- [x] Create new order button

#### Payments Tab
- [x] Payment history table
- [x] Payment date
- [x] Amount paid
- [x] Payment method
- [x] Reference number
- [x] Invoice number
- [x] Outstanding balance after payment
- [x] Add payment button

#### Documents Tab
- [x] Upload document button
- [x] Document list:
  - [x] Document name
  - [x] Document type (Contract, Certificate, Invoice, etc.)
  - [x] Upload date
  - [x] File size
  - [x] Download button
  - [x] Delete button
- [x] Document preview (for images/PDFs)

#### Notes Tab
- [x] Add note button
- [x] Note list (chronological):
  - [x] Note text
  - [x] Created by (user name)
  - [x] Created date/time
  - [x] Edit button
  - [x] Delete button
- [x] Rich text editor for notes

#### Activity Log Tab
- [x] Automatic log of all actions:
  - [x] Action type (Created, Updated, Order placed, Payment received)
  - [x] Date/time
  - [x] User who performed action
  - [x] Details of change
- [x] Filter by action type
- [x] Export log button

---

### Add/Edit Vendor Form (`/admin/vendors/new` or `/admin/vendors/[id]/edit`)

#### Form Sections

**Basic Information**
- [x] Vendor name (required)
- [x] Vendor type dropdown (required)
- [x] Status dropdown (Active/Inactive)
- [x] Auto-generate vendor code checkbox

**Contact Information**
- [x] Contact person name (required)
- [x] Primary phone (required, with validation)
- [x] Secondary phone (optional)
- [x] Email (with email validation)
- [x] WhatsApp number
- [x] Address fields (line 1, line 2, city, state, pincode)

**Business Details**
- [x] GST number (with format validation)
- [x] PAN number (with format validation)
- [x] Payment terms dropdown
- [x] Credit limit (number input)

**Bank Details**
- [x] Bank name
- [x] Account number
- [x] IFSC code (with validation)
- [x] Branch name

**Products & Capacity**
- [x] Products supplied (multi-select or tag input)
- [x] Monthly capacity (number input with unit)
- [x] Minimum order quantity
- [x] Lead time (in days)
- [x] Certifications (multi-select)

**Initial Rating** (for new vendors)
- [ ] Quality rating (1-5 stars)
- [ ] Delivery rating (1-5 stars)
- [ ] Communication rating (1-5 stars)

**Form Actions**
- [x] Save button
- [ ] Save & Add Another button
- [x] Cancel button
- [x] Form validation (client-side and server-side)
- [ ] Success message on save
- [x] Error handling

---

## 🔧 Functionality Checklist

### CRUD Operations
- [x] **Create**: Add new vendor
- [x] **Read**: View vendor list and details
- [x] **Update**: Edit vendor information
- [x] **Delete**: Remove vendor (with confirmation)
- [ ] **Soft Delete**: Mark as inactive instead of deleting

### Search & Filter
- [x] Full-text search across name, code, contact person
- [x] Filter by multiple criteria simultaneously
- [ ] Save filter presets (e.g., "Active Farmers", "High Rating Vendors")
- [x] Clear all filters option

### Import/Export
- [x] Export vendor list to Excel/CSV
- [x] Export selected vendors only
- [x] Import vendors from CSV template
- [x] Validate data during import
- [x] Show import errors clearly

### Bulk Operations
- [x] Select multiple vendors (checkboxes)
- [x] Bulk status update (Active/Inactive)
- [x] Bulk delete (with confirmation)
- [x] Bulk export
- [x] Bulk email/message

### Rating System
- [x] Manual rating update
- [x] Automatic rating calculation based on:
  - [x] On-time delivery percentage
  - [x] Quality rejection rate
  - [x] Communication responsiveness
- [x] Rating history tracking
- [x] Alert when rating drops below threshold

### Notifications & Reminders
- [x] Alert when outstanding amount exceeds credit limit
- [x] Reminder for contract renewal (30 days before expiry)
- [x] Alert for vendors with no orders in 90 days
- [x] Birthday/anniversary reminders (optional)

### Document Management
- [x] Upload multiple documents
- [x] Supported formats: PDF, JPG, PNG, DOC, XLS
- [x] File size limit (e.g., 10MB per file)
- [x] Secure storage (cloud or local)
- [x] Document expiry tracking (for certificates)

### Integration Points
- [x] Link to orders (show vendor's orders)
- [ ] Link to products (show products supplied by vendor)
- [x] Link to payments (show payment history)
- [ ] Auto-populate vendor details in order creation

---

## 📱 Mobile Responsiveness
- [x] Responsive table (stack columns on mobile)
- [x] Touch-friendly buttons and links
- [x] Mobile-optimized forms
- [ ] Swipe actions for quick operations
- [x] Mobile-friendly document upload

---

## 🔐 Security & Permissions
- [x] Only admin can access vendor module
- [x] Sensitive data encryption (bank details)
- [x] Audit log for all changes
- [x] Role-based access (for future team expansion)
- [x] Secure file storage for documents

`

---

## 📊 Reports & Analytics

### Vendor Reports
- [x] Top vendors by purchase value
- [x] Vendor performance scorecard
- [x] Vendor-wise product supply matrix
- [x] Outstanding payments by vendor
- [x] Vendor addition trend (monthly)
- [x] Inactive vendors report
- [x] Vendor rating distribution

### Export Options
- [x] PDF report generation
- [x] Excel export with charts
- [x] Print-friendly format

---

## ✅ Testing Checklist

### Functionality Testing
- [ ] Add vendor with all fields
- [ ] Add vendor with minimum required fields
- [ ] Edit vendor information
- [ ] Delete vendor
- [ ] Search vendors
- [ ] Filter vendors by each criterion
- [ ] Sort by each column
- [ ] Upload documents
- [ ] Add notes
- [ ] View activity log

### Validation Testing
- [ ] Required field validation
- [ ] Email format validation
- [ ] Phone number format validation
- [ ] GST number format validation
- [ ] PAN number format validation
- [ ] IFSC code validation
- [ ] Duplicate vendor detection

### Edge Cases
- [ ] Very long vendor names
- [ ] Special characters in names
- [ ] Multiple vendors with same name
- [ ] Vendor with no orders
- [ ] Vendor with large outstanding amount
- [ ] Expired documents

### Performance Testing
- [ ] Load time with 100 vendors
- [ ] Load time with 1000 vendors
- [ ] Search performance
- [ ] Filter performance
- [ ] Document upload speed

---

## 🚀 Implementation Priority

### Phase 1: MVP (Week 1)
- [ ] Basic vendor table schema
- [ ] Add vendor form
- [ ] Vendor list page
- [ ] View vendor details
- [ ] Edit vendor

### Phase 2: Enhanced Features (Week 2)
- [ ] Search and filters
- [ ] Rating system
- [ ] Document upload
- [ ] Notes functionality
- [ ] Activity log

### Phase 3: Advanced Features (Week 3)
- [ ] Import/Export
- [ ] Bulk operations
- [ ] Reports and analytics
- [ ] Notifications
- [ ] Mobile optimization

---

## 📝 Sample Data Structure

```json
{
  "vendor_id": 1,
  "vendor_code": "VEN-001",
  "vendor_name": "Rajasthan Organic Farms",
  "vendor_type": "Farmer",
  "status": "Active",
  "rating": 4.5,
  "contact_person": "Ramesh Kumar",
  "phone_primary": "+91-9876543210",
  "email": "ramesh@rajorganic.com",
  "address": {
    "line1": "Village Khejroli",
    "city": "Jodhpur",
    "state": "Rajasthan",
    "pincode": "342001"
  },
  "business_details": {
    "gstin": "08AABCU9603R1ZM",
    "pan": "AABCU9603R",
    "payment_terms": "Net 30",
    "credit_limit": 500000
  },
  "products_supplied": ["Cumin Seeds", "Fennel Seeds", "Coriander"],
  "monthly_capacity": "50 MT",
  "certifications": ["India Organic", "USDA Organic"],
  "performance": {
    "total_orders": 45,
    "total_value": 2500000,
    "quality_rating": 4.5,
    "delivery_rating": 4.8,
    "last_order_date": "2025-10-15"
  }
}
```

---

**Next:** Review and approve this checklist, then proceed to Order Management module.
