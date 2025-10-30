/**
 * Encryption utility for sensitive data
 * Uses Web Crypto API for encryption/decryption
 */

// In production, store this in environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-in-production';

/**
 * Generate a key from the encryption key string
 */
async function getKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32));
  
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt sensitive data
 */
export async function encrypt(data: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    const key = await getKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      dataBuffer
    );
    
    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);
    
    // Convert to base64
    return Buffer.from(combined).toString('base64');
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt sensitive data
 */
export async function decrypt(encryptedData: string): Promise<string> {
  try {
    // Convert from base64
    const combined = Buffer.from(encryptedData, 'base64');
    
    // Extract IV and encrypted data
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);
    
    const key = await getKey();
    
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Mask sensitive data for display (e.g., bank account numbers)
 */
export function maskSensitiveData(data: string, visibleChars: number = 4): string {
  if (!data || data.length <= visibleChars) {
    return data;
  }
  
  const masked = '*'.repeat(data.length - visibleChars);
  const visible = data.slice(-visibleChars);
  
  return masked + visible;
}

/**
 * Hash data for comparison (one-way)
 */
export async function hash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  
  return Buffer.from(hashBuffer).toString('hex');
}

/**
 * Encrypt sensitive vendor fields
 */
export async function encryptVendorSensitiveData(vendor: any): Promise<any> {
  const sensitiveFields = ['bankAccountNumber', 'bankIfsc', 'pan'];
  const encrypted = { ...vendor };
  
  for (const field of sensitiveFields) {
    if (encrypted[field]) {
      encrypted[field] = await encrypt(encrypted[field]);
    }
  }
  
  return encrypted;
}

/**
 * Decrypt sensitive vendor fields
 */
export async function decryptVendorSensitiveData(vendor: any): Promise<any> {
  const sensitiveFields = ['bankAccountNumber', 'bankIfsc', 'pan'];
  const decrypted = { ...vendor };
  
  for (const field of sensitiveFields) {
    if (decrypted[field]) {
      try {
        decrypted[field] = await decrypt(decrypted[field]);
      } catch (error) {
        console.error(`Failed to decrypt ${field}:`, error);
        // If decryption fails, the data might not be encrypted
        // Keep the original value
      }
    }
  }
  
  return decrypted;
}

/**
 * Get masked version of vendor sensitive data for display
 */
export function getMaskedVendorData(vendor: any): any {
  const masked = { ...vendor };
  
  if (masked.bankAccountNumber) {
    masked.bankAccountNumber = maskSensitiveData(masked.bankAccountNumber, 4);
  }
  if (masked.bankIfsc) {
    masked.bankIfsc = maskSensitiveData(masked.bankIfsc, 4);
  }
  if (masked.pan) {
    masked.pan = maskSensitiveData(masked.pan, 4);
  }
  
  return masked;
}
