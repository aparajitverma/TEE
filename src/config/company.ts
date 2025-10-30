// Company configuration for quotes, invoices, and documents

export const companyConfig = {
  name: "The Export Express",
  tagline: "Your Global Trade Partner",
  
  // Contact Information
  address: {
    line1: "123 Export Street",
    line2: "Trade Zone",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    postalCode: "400001",
  },
  
  contact: {
    phone: "+91-22-1234-5678",
    email: "info@theexportexpress.com",
    website: "www.theexportexpress.com",
  },
  
  // Business Details
  business: {
    gstin: "27XXXXX1234X1ZX",
    pan: "XXXXX1234X",
    iec: "1234567890",
    cin: "U12345MH2020PTC123456",
  },
  
  // Banking Details
  banking: {
    bankName: "HDFC Bank",
    accountNumber: "1234567890",
    ifscCode: "HDFC0001234",
    branch: "Mumbai Main Branch",
    swiftCode: "HDFCINBB",
  },
  
  // Quote Settings
  quote: {
    validityDays: 30, // Default validity period
    termsAndConditions: [
      "Prices are quoted in the specified currency and are subject to change without notice.",
      "Payment terms as mentioned in the quote must be strictly followed.",
      "Delivery timelines are approximate and may vary based on product availability.",
      "All products are subject to quality inspection before shipment.",
      "Any additional charges (customs, duties, taxes) are the responsibility of the buyer.",
      "This quote is valid for the period mentioned and subject to our standard terms of service.",
      "Minimum order quantities (MOQ) apply as specified for each product.",
      "Shipping and handling charges are additional unless otherwise stated.",
    ],
    notes: "Thank you for your interest in our products. We look forward to serving you.",
  },
  
  // Logo (base64 or URL)
  logo: {
    url: "/images/logo.png", // Path to logo file
    width: 150,
    height: 60,
  },
  
  // Social Media
  social: {
    linkedin: "https://linkedin.com/company/theexportexpress",
    facebook: "https://facebook.com/theexportexpress",
    instagram: "https://instagram.com/theexportexpress",
  },
};

export default companyConfig;
