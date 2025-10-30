// Quote generation utilities
// This uses a simple HTML-to-PDF approach that can work with various libraries
// For production, you might want to use libraries like:
// - jsPDF + html2canvas
// - Puppeteer (server-side)
// - PDFKit
// - React-PDF

import { companyConfig } from '@/config/company';

interface QuoteData {
  orderNumber: string;
  quoteDate: string;
  validUntil: string;
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
  }>;
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  notes: string | null;
  incoterm: string | null;
  portOfLoading: string | null;
  portOfDischarge: string | null;
}

export function generateQuoteHTML(data: QuoteData): string {
  const { quote } = companyConfig;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Quote - ${data.orderNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Arial', sans-serif; 
      font-size: 12px; 
      line-height: 1.6; 
      color: #333;
      padding: 40px;
    }
    .container { max-width: 800px; margin: 0 auto; }
    .header { 
      display: flex; 
      justify-content: space-between; 
      align-items: start;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px solid #059669;
    }
    .company-info h1 { 
      color: #059669; 
      font-size: 28px; 
      margin-bottom: 5px;
    }
    .company-info p { 
      color: #666; 
      font-size: 11px;
      margin: 2px 0;
    }
    .quote-title {
      text-align: right;
    }
    .quote-title h2 { 
      font-size: 32px; 
      color: #059669;
      margin-bottom: 10px;
    }
    .quote-meta { 
      background: #f3f4f6; 
      padding: 15px; 
      border-radius: 8px;
      margin-bottom: 25px;
    }
    .quote-meta table { width: 100%; }
    .quote-meta td { padding: 5px 10px; }
    .quote-meta td:first-child { 
      font-weight: bold; 
      width: 150px;
      color: #374151;
    }
    .addresses { 
      display: flex; 
      gap: 20px; 
      margin-bottom: 25px;
    }
    .address-box { 
      flex: 1; 
      background: #f9fafb; 
      padding: 15px; 
      border-radius: 8px;
      border-left: 4px solid #059669;
    }
    .address-box h3 { 
      color: #059669; 
      font-size: 14px; 
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .address-box p { 
      font-size: 11px; 
      line-height: 1.8;
    }
    table.items { 
      width: 100%; 
      border-collapse: collapse; 
      margin: 25px 0;
    }
    table.items th { 
      background: #059669; 
      color: white; 
      padding: 12px 8px; 
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
    }
    table.items td { 
      padding: 10px 8px; 
      border-bottom: 1px solid #e5e7eb;
    }
    table.items tr:hover { background: #f9fafb; }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .totals { 
      margin-top: 20px; 
      float: right; 
      width: 300px;
    }
    .totals table { width: 100%; }
    .totals td { 
      padding: 8px 12px; 
      border-bottom: 1px solid #e5e7eb;
    }
    .totals td:first-child { font-weight: 500; }
    .totals td:last-child { text-align: right; }
    .totals .grand-total { 
      background: #059669; 
      color: white; 
      font-size: 16px; 
      font-weight: bold;
    }
    .terms { 
      clear: both; 
      margin-top: 40px; 
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
    }
    .terms h3 { 
      color: #059669; 
      font-size: 14px; 
      margin-bottom: 15px;
      text-transform: uppercase;
    }
    .terms ul { 
      list-style: none; 
      padding-left: 0;
    }
    .terms li { 
      padding: 5px 0 5px 20px; 
      position: relative;
      font-size: 10px;
      line-height: 1.6;
    }
    .terms li:before { 
      content: "•"; 
      position: absolute; 
      left: 0; 
      color: #059669;
      font-weight: bold;
    }
    .footer { 
      margin-top: 40px; 
      padding-top: 20px; 
      border-top: 2px solid #e5e7eb;
      text-align: center;
      font-size: 10px;
      color: #666;
    }
    .validity-notice {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 12px 15px;
      margin: 20px 0;
      font-size: 11px;
      border-radius: 4px;
    }
    .validity-notice strong {
      color: #92400e;
    }
    @media print {
      body { padding: 20px; }
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
        <p>${companyConfig.tagline}</p>
        <p>${companyConfig.address.line1}, ${companyConfig.address.city}</p>
        <p>${companyConfig.address.state}, ${companyConfig.address.country} - ${companyConfig.address.postalCode}</p>
        <p>Phone: ${companyConfig.contact.phone} | Email: ${companyConfig.contact.email}</p>
        <p>Website: ${companyConfig.contact.website}</p>
      </div>
      <div class="quote-title">
        <h2>QUOTATION</h2>
        <p><strong>${data.orderNumber}</strong></p>
      </div>
    </div>

    <!-- Quote Metadata -->
    <div class="quote-meta">
      <table>
        <tr>
          <td>Quote Date:</td>
          <td>${new Date(data.quoteDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
          <td>Valid Until:</td>
          <td><strong>${new Date(data.validUntil).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></td>
        </tr>
        <tr>
          <td>Payment Terms:</td>
          <td>${data.paymentTerms || 'As per agreement'}</td>
          <td>Currency:</td>
          <td><strong>${data.currency}</strong></td>
        </tr>
        ${data.incoterm ? `
        <tr>
          <td>Incoterm:</td>
          <td>${data.incoterm}</td>
          <td>Port of Loading:</td>
          <td>${data.portOfLoading || 'TBD'}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Validity Notice -->
    <div class="validity-notice">
      <strong>⚠ Important:</strong> This quotation is valid until ${new Date(data.validUntil).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. 
      Prices and availability are subject to change after this date.
    </div>

    <!-- Client Information -->
    <div class="addresses">
      <div class="address-box">
        <h3>Bill To</h3>
        <p><strong>${data.clientName}</strong></p>
        ${data.clientEmail ? `<p>Email: ${data.clientEmail}</p>` : ''}
        ${data.clientPhone ? `<p>Phone: ${data.clientPhone}</p>` : ''}
        ${data.billingAddress ? `<p>${data.billingAddress}</p>` : ''}
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
          <th style="width: 35%;">Product Description</th>
          <th style="width: 12%;" class="text-center">Quantity</th>
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
            ${item.productCode ? `<br><small style="color: #666;">Code: ${item.productCode}</small>` : ''}
            ${item.specifications ? `<br><small style="color: #666; font-style: italic;">${item.specifications}</small>` : ''}
          </td>
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
          <td>Tax:</td>
          <td>${data.currency} ${data.taxAmount.toFixed(2)}</td>
        </tr>
        ` : ''}
        ${data.shippingCost > 0 ? `
        <tr>
          <td>Shipping:</td>
          <td>${data.currency} ${data.shippingCost.toFixed(2)}</td>
        </tr>
        ` : ''}
        <tr class="grand-total">
          <td>TOTAL:</td>
          <td>${data.currency} ${data.totalAmount.toFixed(2)}</td>
        </tr>
      </table>
    </div>

    <!-- Terms and Conditions -->
    <div class="terms">
      <h3>Terms & Conditions</h3>
      <ul>
        ${quote.termsAndConditions.map(term => `<li>${term}</li>`).join('')}
      </ul>
    </div>

    ${data.notes ? `
    <div class="terms" style="margin-top: 20px;">
      <h3>Additional Notes</h3>
      <p style="font-size: 11px; line-height: 1.8;">${data.notes}</p>
    </div>
    ` : ''}

    <!-- Footer -->
    <div class="footer">
      <p><strong>${companyConfig.name}</strong></p>
      <p>GSTIN: ${companyConfig.business.gstin} | PAN: ${companyConfig.business.pan} | IEC: ${companyConfig.business.iec}</p>
      <p>${quote.notes}</p>
      <p style="margin-top: 10px; font-size: 9px;">
        This is a computer-generated quotation and does not require a signature.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function calculateValidityDate(days: number = companyConfig.quote.validityDays): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}
