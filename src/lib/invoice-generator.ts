// Invoice generation utilities
import { companyConfig } from '@/config/company';

interface InvoiceData {
  invoiceNumber: string;
  invoiceType: 'proforma' | 'commercial';
  invoiceDate: string;
  dueDate?: string;
  orderNumber: string;
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  billingAddress: string | null;
  shippingAddress: string | null;
  currency: string;
  paymentTerms: string | null;
  lineItems: Array<{
    productName: string;
    productCode: string | null;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
    specifications: string | null;
    hsCode?: string | null;
  }>;
  subtotal: number;
  taxAmount: number;
  taxRate?: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  notes: string | null;
  // Shipping details
  incoterm: string | null;
  portOfLoading: string | null;
  portOfDischarge: string | null;
  shippingMethod: string | null;
  // Package details
  numberOfPackages?: number;
  grossWeight?: number;
  netWeight?: number;
  weightUnit?: string;
}

export function generateInvoiceHTML(data: InvoiceData): string {
  const isProforma = data.invoiceType === 'proforma';
  const invoiceTitle = isProforma ? 'PROFORMA INVOICE' : 'COMMERCIAL INVOICE';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${invoiceTitle} - ${data.invoiceNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Arial', sans-serif; 
      font-size: 11px; 
      line-height: 1.5; 
      color: #000;
      padding: 30px;
    }
    .container { max-width: 800px; margin: 0 auto; }
    .header { 
      display: flex; 
      justify-content: space-between; 
      align-items: start;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 3px solid #000;
    }
    .company-info h1 { 
      font-size: 24px; 
      margin-bottom: 3px;
      font-weight: bold;
    }
    .company-info p { 
      font-size: 10px;
      margin: 1px 0;
    }
    .invoice-title {
      text-align: right;
    }
    .invoice-title h2 { 
      font-size: 28px; 
      font-weight: bold;
      margin-bottom: 8px;
      ${isProforma ? 'color: #d97706;' : 'color: #059669;'}
    }
    .invoice-title .watermark {
      font-size: 10px;
      color: #666;
      font-style: italic;
    }
    .invoice-meta { 
      background: #f3f4f6; 
      padding: 12px; 
      border: 1px solid #d1d5db;
      margin-bottom: 20px;
    }
    .invoice-meta table { width: 100%; }
    .invoice-meta td { padding: 4px 8px; font-size: 10px; }
    .invoice-meta td:first-child { 
      font-weight: bold; 
      width: 140px;
    }
    .addresses { 
      display: flex; 
      gap: 15px; 
      margin-bottom: 20px;
    }
    .address-box { 
      flex: 1; 
      border: 1px solid #000; 
      padding: 12px;
    }
    .address-box h3 { 
      font-size: 11px; 
      margin-bottom: 8px;
      text-transform: uppercase;
      font-weight: bold;
      border-bottom: 1px solid #000;
      padding-bottom: 4px;
    }
    .address-box p { 
      font-size: 10px; 
      line-height: 1.6;
    }
    table.items { 
      width: 100%; 
      border-collapse: collapse; 
      margin: 20px 0;
      border: 1px solid #000;
    }
    table.items th { 
      background: #000; 
      color: white; 
      padding: 8px 6px; 
      text-align: left;
      font-size: 10px;
      text-transform: uppercase;
      font-weight: bold;
      border: 1px solid #000;
    }
    table.items td { 
      padding: 8px 6px; 
      border: 1px solid #000;
      font-size: 10px;
    }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .totals { 
      margin-top: 15px; 
      float: right; 
      width: 320px;
      border: 1px solid #000;
    }
    .totals table { width: 100%; border-collapse: collapse; }
    .totals td { 
      padding: 6px 10px; 
      border-bottom: 1px solid #d1d5db;
      font-size: 10px;
    }
    .totals td:first-child { font-weight: 600; }
    .totals td:last-child { text-align: right; }
    .totals .grand-total { 
      background: #000; 
      color: white; 
      font-size: 14px; 
      font-weight: bold;
      border-bottom: none;
    }
    .shipping-details {
      clear: both;
      margin-top: 20px;
      padding: 12px;
      border: 1px solid #000;
      background: #f9fafb;
    }
    .shipping-details h3 {
      font-size: 11px;
      font-weight: bold;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .shipping-details table {
      width: 100%;
    }
    .shipping-details td {
      padding: 3px 8px;
      font-size: 10px;
    }
    .shipping-details td:first-child {
      font-weight: bold;
      width: 150px;
    }
    .declaration {
      margin-top: 20px;
      padding: 12px;
      border: 1px solid #000;
      background: #fffbeb;
    }
    .declaration h3 {
      font-size: 11px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .declaration p {
      font-size: 9px;
      line-height: 1.6;
    }
    .signature-section {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
    }
    .signature-box {
      width: 45%;
      border-top: 1px solid #000;
      padding-top: 8px;
    }
    .signature-box p {
      font-size: 10px;
      font-weight: bold;
    }
    .signature-box .date {
      font-size: 9px;
      color: #666;
      margin-top: 4px;
    }
    .footer { 
      margin-top: 30px; 
      padding-top: 15px; 
      border-top: 2px solid #000;
      text-align: center;
      font-size: 9px;
    }
    .footer p {
      margin: 2px 0;
    }
    .banking-info {
      margin-top: 15px;
      padding: 10px;
      background: #f3f4f6;
      border: 1px solid #d1d5db;
    }
    .banking-info h4 {
      font-size: 10px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .banking-info table {
      width: 100%;
    }
    .banking-info td {
      padding: 2px 6px;
      font-size: 9px;
    }
    .banking-info td:first-child {
      font-weight: bold;
      width: 140px;
    }
    @media print {
      body { padding: 15px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="company-info">
        <h1>${companyConfig.name}</h1>
        <p>${companyConfig.address.line1}, ${companyConfig.address.city}</p>
        <p>${companyConfig.address.state}, ${companyConfig.address.country} - ${companyConfig.address.postalCode}</p>
        <p>Phone: ${companyConfig.contact.phone} | Email: ${companyConfig.contact.email}</p>
        <p>GSTIN: ${companyConfig.business.gstin} | PAN: ${companyConfig.business.pan}</p>
        <p>IEC: ${companyConfig.business.iec}</p>
      </div>
      <div class="invoice-title">
        <h2>${invoiceTitle}</h2>
        <p><strong>${data.invoiceNumber}</strong></p>
        ${isProforma ? '<p class="watermark">For Customs Purpose Only</p>' : ''}
      </div>
    </div>

    <!-- Invoice Metadata -->
    <div class="invoice-meta">
      <table>
        <tr>
          <td>Invoice Date:</td>
          <td><strong>${new Date(data.invoiceDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></td>
          <td>Order Reference:</td>
          <td><strong>${data.orderNumber}</strong></td>
        </tr>
        ${data.dueDate ? `
        <tr>
          <td>Due Date:</td>
          <td><strong>${new Date(data.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></td>
          <td>Payment Terms:</td>
          <td>${data.paymentTerms || 'As per agreement'}</td>
        </tr>
        ` : `
        <tr>
          <td>Payment Terms:</td>
          <td colspan="3">${data.paymentTerms || 'As per agreement'}</td>
        </tr>
        `}
        <tr>
          <td>Currency:</td>
          <td><strong>${data.currency}</strong></td>
          <td>Incoterm:</td>
          <td><strong>${data.incoterm || 'N/A'}</strong></td>
        </tr>
      </table>
    </div>

    <!-- Client Information -->
    <div class="addresses">
      <div class="address-box">
        <h3>Bill To / Consignee</h3>
        <p><strong>${data.clientName}</strong></p>
        ${data.clientEmail ? `<p>Email: ${data.clientEmail}</p>` : ''}
        ${data.clientPhone ? `<p>Phone: ${data.clientPhone}</p>` : ''}
        ${data.billingAddress ? `<p style="margin-top: 6px;">${data.billingAddress}</p>` : ''}
      </div>
      ${data.shippingAddress && data.shippingAddress !== data.billingAddress ? `
      <div class="address-box">
        <h3>Ship To</h3>
        <p>${data.shippingAddress}</p>
      </div>
      ` : ''}
    </div>

    <!-- Line Items -->
    <table class="items">
      <thead>
        <tr>
          <th style="width: 5%;">#</th>
          <th style="width: 35%;">Description of Goods</th>
          ${!isProforma ? '<th style="width: 10%;">HS Code</th>' : ''}
          <th style="width: 10%;" class="text-center">Quantity</th>
          <th style="width: 12%;" class="text-right">Unit Price</th>
          <th style="width: 12%;" class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${data.lineItems.map((item, index) => `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td>
            <strong>${item.productName}</strong>
            ${item.productCode ? `<br><small>Code: ${item.productCode}</small>` : ''}
            ${item.specifications ? `<br><small style="font-style: italic;">${item.specifications}</small>` : ''}
          </td>
          ${!isProforma ? `<td class="text-center">${item.hsCode || '-'}</td>` : ''}
          <td class="text-center">${item.quantity.toLocaleString()} ${item.unit}</td>
          <td class="text-right">${data.currency} ${item.unitPrice.toFixed(2)}</td>
          <td class="text-right"><strong>${data.currency} ${item.totalPrice.toFixed(2)}</strong></td>
        </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Totals -->
    <div class="totals">
      <table>
        <tr>
          <td>Subtotal:</td>
          <td>${data.currency} ${data.subtotal.toFixed(2)}</td>
        </tr>
        ${data.discountAmount > 0 ? `
        <tr>
          <td>Discount:</td>
          <td>- ${data.currency} ${data.discountAmount.toFixed(2)}</td>
        </tr>
        ` : ''}
        ${data.taxAmount > 0 ? `
        <tr>
          <td>Tax ${data.taxRate ? `(${data.taxRate}%)` : ''}:</td>
          <td>${data.currency} ${data.taxAmount.toFixed(2)}</td>
        </tr>
        ` : ''}
        ${data.shippingCost > 0 ? `
        <tr>
          <td>Freight Charges:</td>
          <td>${data.currency} ${data.shippingCost.toFixed(2)}</td>
        </tr>
        ` : ''}
        <tr class="grand-total">
          <td>TOTAL AMOUNT:</td>
          <td>${data.currency} ${data.totalAmount.toFixed(2)}</td>
        </tr>
      </table>
    </div>

    <!-- Shipping Details -->
    ${data.portOfLoading || data.portOfDischarge || data.shippingMethod ? `
    <div class="shipping-details">
      <h3>Shipping Information</h3>
      <table>
        ${data.shippingMethod ? `
        <tr>
          <td>Mode of Transport:</td>
          <td>${data.shippingMethod}</td>
        </tr>
        ` : ''}
        ${data.portOfLoading ? `
        <tr>
          <td>Port of Loading:</td>
          <td>${data.portOfLoading}</td>
        </tr>
        ` : ''}
        ${data.portOfDischarge ? `
        <tr>
          <td>Port of Discharge:</td>
          <td>${data.portOfDischarge}</td>
        </tr>
        ` : ''}
        ${data.numberOfPackages ? `
        <tr>
          <td>Number of Packages:</td>
          <td>${data.numberOfPackages}</td>
        </tr>
        ` : ''}
        ${data.grossWeight ? `
        <tr>
          <td>Gross Weight:</td>
          <td>${data.grossWeight} ${data.weightUnit || 'kg'}</td>
        </tr>
        ` : ''}
        ${data.netWeight ? `
        <tr>
          <td>Net Weight:</td>
          <td>${data.netWeight} ${data.weightUnit || 'kg'}</td>
        </tr>
        ` : ''}
      </table>
    </div>
    ` : ''}

    <!-- Banking Information -->
    <div class="banking-info">
      <h4>Banking Details for Payment</h4>
      <table>
        <tr>
          <td>Bank Name:</td>
          <td>${companyConfig.banking.bankName}</td>
          <td>Account Number:</td>
          <td>${companyConfig.banking.accountNumber}</td>
        </tr>
        <tr>
          <td>IFSC Code:</td>
          <td>${companyConfig.banking.ifscCode}</td>
          <td>SWIFT Code:</td>
          <td>${companyConfig.banking.swiftCode}</td>
        </tr>
        <tr>
          <td>Branch:</td>
          <td colspan="3">${companyConfig.banking.branch}</td>
        </tr>
      </table>
    </div>

    ${!isProforma ? `
    <!-- Declaration -->
    <div class="declaration">
      <h3>Declaration</h3>
      <p>
        We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct. 
        The goods are of Indian origin and are being exported in accordance with the applicable export regulations.
      </p>
    </div>
    ` : ''}

    ${data.notes ? `
    <div style="margin-top: 15px; padding: 10px; border: 1px solid #d1d5db; background: #f9fafb;">
      <h4 style="font-size: 10px; font-weight: bold; margin-bottom: 6px;">Additional Notes:</h4>
      <p style="font-size: 9px; line-height: 1.6;">${data.notes}</p>
    </div>
    ` : ''}

    <!-- Signature Section -->
    <div class="signature-section">
      <div class="signature-box">
        <p>For ${companyConfig.name}</p>
        <div style="height: 40px;"></div>
        <p>Authorized Signatory</p>
        <p class="date">Date: ${new Date(data.invoiceDate).toLocaleDateString()}</p>
      </div>
      ${!isProforma ? `
      <div class="signature-box">
        <p>Received By</p>
        <div style="height: 40px;"></div>
        <p>Signature & Stamp</p>
        <p class="date">Date: _______________</p>
      </div>
      ` : ''}
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>${companyConfig.name}</strong></p>
      <p>CIN: ${companyConfig.business.cin}</p>
      <p style="margin-top: 8px; font-size: 8px;">
        ${isProforma ? 
          'This is a Proforma Invoice for customs and reference purposes only. Not a tax invoice.' : 
          'This is a computer-generated invoice and is valid without signature.'}
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateInvoiceNumber(type: 'proforma' | 'commercial', count: number): string {
  const year = new Date().getFullYear();
  const prefix = type === 'proforma' ? 'PI' : 'CI';
  return `${prefix}-${year}-${String(count + 1).padStart(4, '0')}`;
}

export function calculateDueDate(invoiceDate: Date, paymentTerms: string | null): Date | null {
  if (!paymentTerms) return null;
  
  // Extract days from payment terms like "Net 30", "Net 60", etc.
  const match = paymentTerms.match(/Net\s+(\d+)/i);
  if (match) {
    const days = parseInt(match[1]);
    const dueDate = new Date(invoiceDate);
    dueDate.setDate(dueDate.getDate() + days);
    return dueDate;
  }
  
  return null;
}
