// Carrier tracking utilities

export interface Carrier {
  name: string;
  code: string;
  trackingUrl: string;
  placeholder: string;
}

export const carriers: Carrier[] = [
  {
    name: 'Maersk',
    code: 'MAERSK',
    trackingUrl: 'https://www.maersk.com/tracking/#tracking=${trackingNumber}',
    placeholder: 'e.g., MAEU123456789'
  },
  {
    name: 'MSC (Mediterranean Shipping)',
    code: 'MSC',
    trackingUrl: 'https://www.msc.com/track-a-shipment?agencyPath=msc&trackingNumber=${trackingNumber}',
    placeholder: 'e.g., MSCU123456789'
  },
  {
    name: 'CMA CGM',
    code: 'CMACGM',
    trackingUrl: 'https://www.cma-cgm.com/ebusiness/tracking/search?SearchBy=Container&Reference=${trackingNumber}',
    placeholder: 'e.g., CMAU123456789'
  },
  {
    name: 'Hapag-Lloyd',
    code: 'HAPAG',
    trackingUrl: 'https://www.hapag-lloyd.com/en/online-business/track/track-by-container-solution.html?container=${trackingNumber}',
    placeholder: 'e.g., HLCU123456789'
  },
  {
    name: 'COSCO',
    code: 'COSCO',
    trackingUrl: 'https://elines.coscoshipping.com/ebusiness/cargoTracking?trackingType=CONTAINER&number=${trackingNumber}',
    placeholder: 'e.g., COSU123456789'
  },
  {
    name: 'DHL Express',
    code: 'DHL',
    trackingUrl: 'https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}',
    placeholder: 'e.g., 1234567890'
  },
  {
    name: 'FedEx',
    code: 'FEDEX',
    trackingUrl: 'https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}',
    placeholder: 'e.g., 123456789012'
  },
  {
    name: 'UPS',
    code: 'UPS',
    trackingUrl: 'https://www.ups.com/track?tracknum=${trackingNumber}',
    placeholder: 'e.g., 1Z999AA10123456784'
  },
  {
    name: 'Blue Dart',
    code: 'BLUEDART',
    trackingUrl: 'https://www.bluedart.com/tracking?trackingNumber=${trackingNumber}',
    placeholder: 'e.g., 12345678901'
  },
  {
    name: 'India Post',
    code: 'INDIAPOST',
    trackingUrl: 'https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx?consignmentno=${trackingNumber}',
    placeholder: 'e.g., RR123456789IN'
  },
  {
    name: 'Other / Custom',
    code: 'OTHER',
    trackingUrl: '',
    placeholder: 'Enter tracking number'
  }
];

export function getCarrierByCode(code: string): Carrier | undefined {
  return carriers.find(c => c.code === code);
}

export function getTrackingUrl(carrierCode: string, trackingNumber: string): string {
  const carrier = getCarrierByCode(carrierCode);
  if (!carrier || !carrier.trackingUrl) {
    return '';
  }
  return carrier.trackingUrl.replace('${trackingNumber}', encodeURIComponent(trackingNumber));
}

export function detectCarrier(trackingNumber: string): string {
  const num = trackingNumber.toUpperCase();
  
  // Container number patterns
  if (/^MAEU\d{10}$/.test(num)) return 'MAERSK';
  if (/^MSCU\d{10}$/.test(num)) return 'MSC';
  if (/^CMAU\d{10}$/.test(num)) return 'CMACGM';
  if (/^HLCU\d{10}$/.test(num)) return 'HAPAG';
  if (/^COSU\d{10}$/.test(num)) return 'COSCO';
  
  // Air waybill patterns
  if (/^\d{10}$/.test(num)) return 'DHL';
  if (/^\d{12}$/.test(num)) return 'FEDEX';
  if (/^1Z[A-Z0-9]{16}$/.test(num)) return 'UPS';
  if (/^RR\d{9}IN$/.test(num)) return 'INDIAPOST';
  
  return 'OTHER';
}
