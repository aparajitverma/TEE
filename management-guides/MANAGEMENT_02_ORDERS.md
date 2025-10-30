# Order Management Module - Development Checklist

## 📋 Module Overview
Complete order lifecycle management from inquiry to delivery, including documentation, tracking, and status updates.

---

## 🎯 Core Features

### 1. Order Pipeline
- [ ] Inquiry management
- [ ] Quote generation
- [ ] Order confirmation
- [ ] Production/sourcing tracking
- [ ] Shipping coordination
- [ ] Delivery confirmation
- [ ] Post-delivery follow-up

---

## 📊 Database Schema

### Orders Table Fields

#### Order Identification
- [x] `order_id` (Primary key, auto-increment)
- [x] `order_number` (Unique, e.g., "ORD-2025-001")
- [x] `inquiry_number` (Link to original inquiry)
- [x] `quote_number` (Link to quote if applicable)
- [x] `order_type` (Export, Domestic, Sample)
- [x] `order_status` (Inquiry, Quoted, Confirmed, Processing, Shipped, Delivered, Cancelled)
- [x] `priority` (Low, Medium, High, Urgent)

#### Client Information
- [x] `client_id` (Foreign key to clients table)
- [x] `client_name` (Denormalized for quick access)
- [x] `client_email`
- [x] `client_phone`
- [x] `billing_address` (JSON)
- [x] `shipping_address` (JSON)

#### Order Details
- [x] `order_date` (Date order was confirmed)
- [x] `inquiry_date` (When inquiry was received)
- [x] `quote_date` (When quote was sent)
- [x] `expected_delivery_date`
- [x] `actual_delivery_date`
- [x] `lead_time_days`

#### Products & Pricing
- [x] `products` (JSON array or separate line items table)
- [x] `subtotal` (Before taxes and shipping)
- [x] `tax_amount`
- [x] `shipping_cost`
- [x] `discount_amount`
- [x] `total_amount`
- [x] `currency` (USD, EUR, INR, etc.)
- [x] `exchange_rate` (If not INR)

#### Shipping Information
- [x] `incoterm` (FOB, CIF, EXW, etc.)
- [x] `port_of_loading`
- [x] `port_of_discharge`
- [x] `shipping_method` (Sea, Air, Courier)
- [x] `shipping_line` (Maersk, MSC, etc.)
- [x] `container_number`
- [x] `bl_number` (Bill of Lading)
- [x] `awb_number` (Air Waybill)
- [x] `tracking_number`
- [x] `estimated_departure_date`
- [x] `actual_departure_date`
- [x] `estimated_arrival_date`
- [x] `actual_arrival_date`

#### Payment Information
- [x] `payment_terms` (Advance, LC, Net 30, etc.)
- [x] `payment_status` (Pending, Partial, Paid)
- [x] `advance_percentage`
- [x] `advance_amount`
- [x] `advance_received_date`
- [x] `balance_amount`
- [x] `balance_received_date`
- [x] `payment_method` (Wire Transfer, LC, PayPal, etc.)

#### Documents
- [x] `proforma_invoice_url`
- [x] `commercial_invoice_url`
- [x] `packing_list_url`
- [x] `certificate_of_origin_url`
- [x] `phytosanitary_certificate_url`
- [x] `bill_of_lading_url`
- [x] `other_documents` (JSON array)

#### Internal Tracking
- [x] `assigned_to` (User ID of person handling)
- [x] `source` (Website, Email, WhatsApp, Phone, Referral)
- [x] `notes` (Internal notes)
- [x] `follow_up_date`
- [x] `last_contact_date`
- [x] `created_at`
- [x] `updated_at`
- [x] `created_by`
- [x] `updated_by`

---

### Order Line Items Table (Separate table for products in order)

- [x] `line_item_id` (Primary key)
- [x] `order_id` (Foreign key)
- [x] `product_id` (Foreign key to products table)
- [x] `product_name` (Denormalized)
- [x] `product_code`
- [x] `quantity`
- [x] `unit` (kg, MT, pieces, etc.)
- [x] `unit_price`
- [x] `total_price`
- [x] `specifications` (JSON - custom requirements)
- [x] `vendor_id` (Which vendor will supply this)
- [x] `vendor_cost` (Cost from vendor)
- [x] `margin` (Profit margin)

---

## 🖥️ User Interface Components

### Orders Dashboard (`/admin/orders`)

#### Header Section
- [x] Page title: "Order Management"
- [ ] Create New Inquiry button
- [x] Create New Order button
- [x] Export Orders button
- [x] Quick stats cards:
  - [x] Total Active Orders
  - [x] Pending Quotes
  - [x] Orders in Transit
  - [x] This Month's Revenue

#### Pipeline View (Kanban Board)
- [x] Column for each status:
  - [x] Inquiry (count)
  - [x] Quoted (count)
  - [x] Confirmed (count)
  - [x] Processing (count)
  - [x] Shipped (count)
  - [x] Delivered (count)
- [x] Drag-and-drop to change status
- [x] Order cards showing:
  - [x] Order number
  - [x] Client name
  - [x] Total amount
  - [x] Expected delivery date
  - [x] Priority indicator
  - [x] Quick view button

#### List View (Table)
- [x] Toggle between Kanban and Table view
- [x] Columns:
  - [x] Order number (clickable)
  - [x] Date
  - [x] Client name
  - [ ] Products (summary)
  - [x] Amount
  - [x] Status badge
  - [x] Payment status
  - [x] Expected delivery
  - [x] Actions dropdown
- [ ] Sortable columns
- [x] Filterable columns

#### Filters & Search
- [x] Search by order number, client name, product
- [x] Filter by status
- [ ] Filter by date range
- [ ] Filter by client
- [x] Filter by payment status
- [ ] Filter by priority
- [ ] Filter by assigned person
- [ ] Saved filter presets

---

### Order Detail Page (`/admin/orders/[id]`)

#### Header
- [x] Order number (large heading)
- [ ] Status badge (with dropdown to change)
- [x] Priority indicator (with dropdown to change)
- [x] Client name (clickable to client profile)
- [x] Total amount (prominent display)
- [x] Edit Order button
- [ ] Print/Download button
- [x] Delete button (with confirmation)

#### Progress Timeline
- [x] Visual timeline showing:
  - [x] Inquiry received (date/time)
  - [x] Quote sent (date/time)
  - [x] Order confirmed (date/time)
  - [x] Production started (date/time)
  - [x] Quality check completed (date/time)
  - [x] Shipped (date/time)
  - [x] Delivered (date/time)
- [x] Current stage highlighted
- [x] Add milestone button

#### Tabs Navigation
- [x] Overview
- [x] Products
- [x] Shipping
- [x] Payments
- [x] Documents
- [x] Communication
- [x] Activity Log

#### Overview Tab
**Client Information Card**
- [x] Client name (link to profile)
- [x] Contact person
- [x] Email (click to email)
- [x] Phone (click to call)
- [x] Billing address
- [x] Shipping address

**Order Summary Card**
- [x] Order date
- [x] Inquiry date
- [x] Quote date
- [x] Expected delivery
- [x] Actual delivery
- [x] Lead time
- [x] Source (how inquiry came)
- [x] Assigned to

**Financial Summary Card**
- [x] Subtotal
- [x] Tax
- [x] Shipping cost
- [x] Discount
- [x] Total amount
- [x] Currency
- [x] Payment terms
- [x] Payment status
- [ ] Amount received
- [ ] Balance due

**Quick Actions Card**
- [ ] Send quote button
- [ ] Confirm order button
- [x] Update status button
- [x] Record payment button
- [ ] Upload document button
- [x] Send email button
- [ ] Schedule follow-up button

#### Products Tab
- [x] Product line items table:
  - [x] Product name
  - [x] Product code
  - [x] Quantity
  - [x] Unit
  - [x] Unit price
  - [x] Total price
  - [x] Vendor assigned
  - [x] Vendor cost
  - [x] Margin
  - [x] Specifications
  - [x] Edit button
  - [x] Remove button
- [x] Add product button
- [x] Total calculation
- [x] Margin percentage display

#### Shipping Tab
**Shipping Details Card**
- [x] Incoterm
- [x] Shipping method
- [x] Port of loading
- [x] Port of discharge
- [x] Shipping line
- [x] Container number
- [x] BL/AWB number
- [x] Tracking number (with live tracking link)

**Timeline Card**
- [x] Estimated departure date
- [x] Actual departure date
- [x] Estimated arrival date
- [x] Actual arrival date
- [x] Current location (if tracking available)

**Packaging Details Card**
- [x] Number of packages
- [x] Package type (cartons, bags, pallets)
- [x] Gross weight
- [x] Net weight
- [x] Dimensions
- [x] Special handling instructions

#### Payments Tab
- [x] Payment schedule:
  - [x] Advance payment (amount, due date, status)
  - [x] Balance payment (amount, due date, status)
- [x] Payment history table:
  - [x] Date
  - [x] Amount
  - [x] Method
  - [x] Reference number
  - [x] Received by
  - [x] Notes
- [x] Add payment button
- [x] Outstanding balance (highlighted)
- [x] Send payment reminder button

#### Documents Tab
- [x] Document checklist:
  - [x] Proforma Invoice (upload/view/download)
  - [x] Commercial Invoice
  - [x] Packing List
  - [x] Certificate of Origin
  - [x] Phytosanitary Certificate
  - [x] Bill of Lading
  - [x] Insurance Certificate
  - [x] Other documents
- [x] Upload document button
- [x] Generate invoice button
- [x] Generate packing list button
- [x] Email documents to client button
- [x] Download all as ZIP button

#### Communication Tab
- [x] Communication log (chronological):
  - [x] Date/time
  - [x] Type (Email, Phone, WhatsApp, Meeting)
  - [x] Direction (Inbound/Outbound)
  - [x] Summary
  - [x] Full message (expandable)
  - [x] Attachments
- [x] Add communication log button
- [x] Send email button (with template selection)
- [x] Email templates:
  - [x] Quote email
  - [x] Order confirmation
  - [x] Shipping notification
  - [x] Delivery confirmation
  - [x] Follow-up email

#### Activity Log Tab
- [x] Automatic log of all changes:
  - [x] Status changes
  - [x] Payment updates
  - [x] Document uploads
  - [x] Product modifications
  - [x] User who made change
  - [x] Timestamp
  - [x] Before/after values

---

### Create/Edit Order Form

#### Step 1: Client Selection
- [x] Search existing client
- [x] Select from dropdown
- [x] Or create new client (quick add)
- [x] Auto-fill contact details

 

#### Step 3: Add Products
- [x] Search and select products
- [x] Enter quantity
- [x] Enter unit price
- [x] Select vendor for each product
- [x] Enter vendor cost
- [x] Auto-calculate margin
- [x] Add specifications/notes
- [x] Add multiple products
- [x] Remove product
- [x] Auto-calculate totals

#### Step 4: Shipping Details
- [x] Incoterm selection
- [x] Shipping method
- [x] Port of loading
- [x] Port of discharge
- [x] Shipping cost
- [x] Packaging details

#### Step 5: Additional Details
- [x] Billing address
- [x] Shipping address (if different)
- [x] Special instructions
- [x] Internal notes
- [x] Follow-up date

#### Form Actions
- [ ] Save as Draft
- [x] Save as Inquiry
- [ ] Save as Quote
- [ ] Confirm Order
- [x] Cancel

---

## 🔧 Functionality Checklist

### Order Creation & Management
- [x] Create inquiry from website form
- [x] Convert inquiry to quote
- [x] Convert quote to order
- [x] Edit order details
- [x] Cancel order (with reason)
- [x] Clone order (for repeat orders)
- [ ] Split order (if partial delivery)

### Status Management
- [x] Update status manually
- [x] Auto-update status based on actions:
  - [x] Quote sent → Status: Quoted
  - [x] Payment received → Status: Confirmed
  - [x] Shipped → Status: Shipped
- [x] Status change notifications
- [x] Prevent backward status changes (with override)

### Quote Generation
- [x] Generate PDF quote from order
- [x] Customizable quote template
- [x] Include company logo and details
- [x] Add terms and conditions
- [x] Add validity period
- [x] Email quote to client
- [x] Track quote views (if sent via link)

### Invoice Generation
- [x] Generate proforma invoice
- [x] Generate commercial invoice
- [x] Auto-increment invoice numbers
- [x] Customizable invoice template
- [x] Include all order details
- [x] Calculate taxes automatically
- [x] Multi-currency support
- [x] Email invoice to client

### Packing List Generation
- [x] Generate packing list PDF
- [x] Include all products with quantities
- [x] Package-wise breakdown
- [x] Weight and dimensions
- [x] HS codes
- [x] Email to client and shipping agent

### Shipping Tracking
- [x] Enter tracking number
- [x] Link to carrier tracking page
- [x] Manual status updates
- [ ] API integration for auto-tracking (future)
- [x] Email notifications to client

### Payment Tracking
- [x] Record advance payment
- [x] Record balance payment
- [x] Partial payment support
- [x] Payment reminders (auto-email)
- [x] Link to payment management module

### Communication Logging
- [x] Log emails (manual entry or auto-sync)
- [x] Log phone calls
- [x] Log WhatsApp messages
- [x] Log meetings
- [x] Attach files to communications

### Reminders & Notifications
- [x] Follow-up reminders
- [x] Payment due reminders
- [x] Delivery date approaching alerts
- [x] Overdue order alerts
- [x] Document pending alerts

### Bulk Operations
- [x] Select multiple orders
- [x] Bulk status update
- [x] Bulk export (CSV and JSON)
- [x] Bulk email
- [x] Bulk delete (with confirmation)

### Search & Filter
- [x] Full-text search
- [x] Advanced filters
- [x] Saved searches
- [x] Quick filters (Today's orders, This week, Overdue, etc.)

---

## 📱 Mobile Responsiveness
- [x] Mobile-friendly order list (responsive grid layouts)
- [ ] Swipe actions for quick updates (not implemented)
- [x] Mobile-optimized order detail view (responsive breakpoints)
- [x] Mobile form for quick order entry (responsive forms)
- [ ] Click-to-call/email from mobile (not implemented)

---

## 📊 Reports & Analytics

### Order Reports
- [x] Orders by status
- [x] Orders by client
- [x] Orders by product
- [x] Orders by date range
- [x] Revenue by month/quarter
- [x] Average order value
- [x] Order fulfillment time
- [x] Conversion rate (inquiry to order)

### Performance Metrics
- [x] Total orders (count)
- [x] Total revenue
- [ ] Average margin
- [x] On-time delivery rate
- [x] Payment collection rate
- [x] Top clients by revenue
- [x] Top products by quantity/value

### Export Options
- [ ] PDF reports
- [ ] Excel export
- [x] CSV export
- [x] JSON export

---

## 🔔 Notification System

### Email Notifications
- [x] New inquiry received
- [x] Quote sent to client
- [x] Order confirmed
- [x] Payment received
- [x] Order shipped
- [x] Order delivered
- [x] Follow-up reminder
- [x] Payment reminder

### In-App Notifications
- [x] Dashboard alerts
- [x] Badge counts
- [x] Toast notifications
- [x] Notification center

---

## ✅ Testing Checklist

### Functionality Testing
- [ ] Create inquiry
- [ ] Convert to quote
- [ ] Convert to order
- [ ] Add products
- [ ] Calculate totals correctly
- [ ] Generate quote PDF
- [ ] Generate invoice PDF
- [ ] Update status
- [ ] Record payment
- [ ] Upload documents
- [ ] Send emails
- [ ] Track shipping

### Validation Testing
- [ ] Required fields
- [ ] Date validations
- [ ] Amount calculations
- [ ] Duplicate order number prevention
- [ ] Negative quantity prevention

### Edge Cases
- [ ] Order with no products
- [ ] Order with 100+ products
- [ ] Multi-currency orders
- [ ] Partial deliveries
- [ ] Cancelled orders
- [ ] Refunded orders

---

## 🚀 Implementation Priority

### Phase 1: MVP (Week 1-2)
- [x] Order database schema
- [x] Create order form
- [x] Order list view
- [x] Order detail view
- [ ] Basic status management
- [x] Add products to order

### Phase 2: Core Features (Week 3-4)
- [ ] Quote generation
- [ ] Invoice generation
- [ ] Payment tracking
- [ ] Document upload
- [ ] Email notifications
- [x] Search and filters

### Phase 3: Advanced Features (Week 5-6)
- [ ] Kanban board view
- [ ] Communication logging
- [ ] Shipping tracking
- [ ] Reports and analytics
- [ ] Bulk operations
- [ ] Mobile optimization

---

## 📝 Sample Data Structure

```json
{
  "order_id": 1,
  "order_number": "ORD-2025-001",
  "order_type": "Export",
  "order_status": "Shipped",
  "priority": "High",
  "client_id": 5,
  "client_name": "ABC Trading LLC",
  "order_date": "2025-10-15",
  "expected_delivery_date": "2025-11-15",
  "products": [
    {
      "product_id": 12,
      "product_name": "Organic Turmeric Powder",
      "quantity": 1000,
      "unit": "kg",
      "unit_price": 5.50,
      "total_price": 5500,
      "vendor_id": 3,
      "vendor_cost": 4.00,
      "margin": 27.27
    }
  ],
  "subtotal": 5500,
  "tax_amount": 0,
  "shipping_cost": 500,
  "total_amount": 6000,
  "currency": "USD",
  "payment_terms": "50% Advance, 50% on BL",
  "payment_status": "Partial",
  "shipping": {
    "incoterm": "FOB",
    "method": "Sea Freight",
    "port_of_loading": "Nhava Sheva, India",
    "port_of_discharge": "Los Angeles, USA",
    "bl_number": "MAEU123456789",
    "estimated_arrival": "2025-11-10"
  }
}
```

---

**Next:** Review and approve, then proceed to Client Management (CRM) module.
