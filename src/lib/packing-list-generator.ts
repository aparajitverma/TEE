// Packing list generation utilities
import { companyConfig } from '@/config/company';

interface PackingListItem {
  productName: string;
  productCode: string | null;
  quantity: number;
  unit: string;
  specifications: string | null;
  hsCode?: string | null;
  packageNumber?: number;
  itemsPerPackage?: number;
}

interface PackageInfo {
  packageNumber: number;
  packageType: string;
  items: Array<{
    productName: string;
    quantity: number;
    unit: string;
  }>;
  grossWeight: number;
  netWeight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
}

interface PackingListData {
  packingListNumber: string;
  packingListDate: string;
  orderNumber: string;
  invoiceNumber?: string;
  clientName: string;
  clientAddress: string | null;
  shippingAddress: string | null;
  items: PackingListItem[];
  packages?: PackageInfo[];
  totalPackages: number;
  totalGrossWeight: number;
  totalNetWeight: number;
  weightUnit: string;
  // Shipping details
  portOfLoading: string | null;
  portOfDischarge: string | null;
  shippingMethod: string | null;
  containerNumber?: string | null;
  sealNumber?: string | null;
  notes?: string | null;
}

export function generatePackingListHTML(data: PackingListData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Packing List - ${data.packingListNumber}</title>
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
      border-bottom: 3px solid #2563eb;
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
    .doc-title {
      text-align: right;
    }
    .doc-title h2 { 
      font-size: 28px; 
      font-weight: bold;
      margin-bottom: 8px;
      color: #2563eb;
    }
    .meta { 
      background: #eff6ff; 
      padding: 12px; 
      border: 1px solid #2563eb;
      margin-bottom: 20px;
    }
    .meta table { width: 100%; }
    .meta td { padding: 4px 8px; font-size: 10px; }
    .meta td:first-child { 
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
      border: 1px solid #2563eb; 
      padding: 12px;
      background: #f8fafc;
    }
    .address-box h3 { 
      font-size: 11px; 
      margin-bottom: 8px;
      text-transform: uppercase;
      font-weight: bold;
      color: #2563eb;
      border-bottom: 1px solid #2563eb;
      padding-bottom: 4px;
    }
    .address-box p { 
      font-size: 10px; 
      line-height: 1.6;
    }
    .section-title {
      background: #2563eb;
      color: white;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      margin: 20px 0 10px 0;
    }
    table.items { 
      width: 100%; 
      border-collapse: collapse; 
      margin: 10px 0;
      border: 1px solid #000;
    }
    table.items th { 
      background: #1e40af; 
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
    table.items tr:nth-child(even) {
      background: #f8fafc;
    }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .package-box {
      border: 2px solid #2563eb;
      padding: 12px;
      margin: 15px 0;
      background: #f8fafc;
    }
    .package-box h4 {
      color: #2563eb;
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 8px;
      padding-bottom: 6px;
      border-bottom: 1px solid #2563eb;
    }
    .package-details {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 10px;
    }
    .package-details div {
      font-size: 10px;
    }
    .package-details strong {
      display: block;
      color: #1e40af;
      margin-bottom: 2px;
    }
    .summary-box {
      background: #1e40af;
      color: white;
      padding: 15px;
      margin-top: 20px;
      border-radius: 4px;
    }
    .summary-box h3 {
      font-size: 12px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
    .summary-item {
      text-align: center;
    }
    .summary-item .label {
      font-size: 9px;
      opacity: 0.9;
      margin-bottom: 4px;
    }
    .summary-item .value {
      font-size: 18px;
      font-weight: bold;
    }
    .footer { 
      margin-top: 30px; 
      padding-top: 15px; 
      border-top: 2px solid #2563eb;
      text-align: center;
      font-size: 9px;
    }
    .signature-section {
      margin-top: 40px;
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
        <p>IEC: ${companyConfig.business.iec}</p>
      </div>
      <div class="doc-title">
        <h2>PACKING LIST</h2>
        <p><strong>${data.packingListNumber}</strong></p>
      </div>
    </div>

    <!-- Metadata -->
    <div class="meta">
      <table>
        <tr>
          <td>Packing List Date:</td>
          <td><strong>${new Date(data.packingListDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></td>
          <td>Order Reference:</td>
          <td><strong>${data.orderNumber}</strong></td>
        </tr>
        ${data.invoiceNumber ? `
        <tr>
          <td>Invoice Number:</td>
          <td colspan="3"><strong>${data.invoiceNumber}</strong></td>
        </tr>
        ` : ''}
        <tr>
          <td>Shipping Method:</td>
          <td>${data.shippingMethod || 'N/A'}</td>
          <td>Total Packages:</td>
          <td><strong>${data.totalPackages}</strong></td>
        </tr>
        ${data.containerNumber ? `
        <tr>
          <td>Container Number:</td>
          <td>${data.containerNumber}</td>
          <td>Seal Number:</td>
          <td>${data.sealNumber || 'N/A'}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Addresses -->
    <div class="addresses">
      <div class="address-box">
        <h3>Consignee / Buyer</h3>
        <p><strong>${data.clientName}</strong></p>
        ${data.clientAddress ? `<p style="margin-top: 6px;">${data.clientAddress}</p>` : ''}
      </div>
      ${data.shippingAddress && data.shippingAddress !== data.clientAddress ? `
      <div class="address-box">
        <h3>Delivery Address</h3>
        <p>${data.shippingAddress}</p>
      </div>
      ` : ''}
    </div>

    <!-- Shipping Route -->
    ${data.portOfLoading || data.portOfDischarge ? `
    <div style="background: #f1f5f9; padding: 10px; border-left: 4px solid #2563eb; margin-bottom: 20px;">
      <strong style="font-size: 10px; color: #1e40af;">Shipping Route:</strong>
      <span style="font-size: 10px;">
        ${data.portOfLoading || 'Origin'} → ${data.portOfDischarge || 'Destination'}
      </span>
    </div>
    ` : ''}

    ${data.packages && data.packages.length > 0 ? `
    <!-- Package-wise Breakdown -->
    <div class="section-title">Package-wise Breakdown</div>
    ${data.packages.map(pkg => `
    <div class="package-box">
      <h4>Package ${pkg.packageNumber} - ${pkg.packageType}</h4>
      <div class="package-details">
        <div>
          <strong>Gross Weight:</strong>
          ${pkg.grossWeight} ${data.weightUnit}
        </div>
        <div>
          <strong>Net Weight:</strong>
          ${pkg.netWeight} ${data.weightUnit}
        </div>
        ${pkg.dimensions ? `
        <div>
          <strong>Dimensions (L×W×H):</strong>
          ${pkg.dimensions.length} × ${pkg.dimensions.width} × ${pkg.dimensions.height} ${pkg.dimensions.unit}
        </div>
        ` : ''}
      </div>
      <table class="items">
        <thead>
          <tr>
            <th style="width: 60%;">Product Description</th>
            <th style="width: 20%;" class="text-center">Quantity</th>
            <th style="width: 20%;" class="text-center">Unit</th>
          </tr>
        </thead>
        <tbody>
          ${pkg.items.map(item => `
          <tr>
            <td>${item.productName}</td>
            <td class="text-center">${item.quantity.toLocaleString()}</td>
            <td class="text-center">${item.unit}</td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    `).join('')}
    ` : ''}

    <!-- Complete Items List -->
    <div class="section-title">Complete Items List</div>
    <table class="items">
      <thead>
        <tr>
          <th style="width: 5%;">#</th>
          <th style="width: 35%;">Product Description</th>
          <th style="width: 12%;">Product Code</th>
          ${data.items.some(item => item.hsCode) ? '<th style="width: 12%;">HS Code</th>' : ''}
          <th style="width: 12%;" class="text-center">Quantity</th>
          <th style="width: 10%;" class="text-center">Unit</th>
          ${data.packages && data.packages.length > 0 ? '<th style="width: 10%;" class="text-center">Package #</th>' : ''}
        </tr>
      </thead>
      <tbody>
        ${data.items.map((item, index) => `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td>
            <strong>${item.productName}</strong>
            ${item.specifications ? `<br><small style="font-style: italic; color: #666;">${item.specifications}</small>` : ''}
          </td>
          <td>${item.productCode || '-'}</td>
          ${data.items.some(i => i.hsCode) ? `<td class="text-center">${item.hsCode || '-'}</td>` : ''}
          <td class="text-center"><strong>${item.quantity.toLocaleString()}</strong></td>
          <td class="text-center">${item.unit}</td>
          ${data.packages && data.packages.length > 0 ? `<td class="text-center">${item.packageNumber || '-'}</td>` : ''}
        </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Summary -->
    <div class="summary-box">
      <h3>Shipment Summary</h3>
      <div class="summary-grid">
        <div class="summary-item">
          <div class="label">Total Packages</div>
          <div class="value">${data.totalPackages}</div>
        </div>
        <div class="summary-item">
          <div class="label">Gross Weight</div>
          <div class="value">${data.totalGrossWeight} ${data.weightUnit}</div>
        </div>
        <div class="summary-item">
          <div class="label">Net Weight</div>
          <div class="value">${data.totalNetWeight} ${data.weightUnit}</div>
        </div>
      </div>
    </div>

    ${data.notes ? `
    <div style="margin-top: 20px; padding: 12px; border: 1px solid #cbd5e1; background: #f8fafc;">
      <strong style="font-size: 10px; color: #1e40af;">Special Instructions:</strong>
      <p style="font-size: 10px; margin-top: 6px; line-height: 1.6;">${data.notes}</p>
    </div>
    ` : ''}

    <!-- Signature Section -->
    <div class="signature-section">
      <div class="signature-box">
        <p>Prepared By</p>
        <div style="height: 40px;"></div>
        <p>${companyConfig.name}</p>
        <p class="date">Date: ${new Date(data.packingListDate).toLocaleDateString()}</p>
      </div>
      <div class="signature-box">
        <p>Received By</p>
        <div style="height: 40px;"></div>
        <p>Signature & Stamp</p>
        <p class="date">Date: _______________</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>${companyConfig.name}</strong></p>
      <p>This packing list is an integral part of the shipment documentation.</p>
      <p style="margin-top: 8px; font-size: 8px;">
        Please verify the contents upon receipt and report any discrepancies immediately.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generatePackingListNumber(count: number): string {
  const year = new Date().getFullYear();
  return `PL-${year}-${String(count + 1).padStart(4, '0')}`;
}
