import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { hash } from './encryption';

/**
 * Secure file storage configuration
 */
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

/**
 * Validate file before upload
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'File type not allowed. Allowed types: PDF, Images (JPG, PNG), Word, Excel',
    };
  }

  return { valid: true };
}

/**
 * Generate secure filename
 */
export async function generateSecureFilename(originalFilename: string): Promise<string> {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = path.extname(originalFilename);
  const nameWithoutExt = path.basename(originalFilename, extension);
  
  // Create a hash of the original filename for uniqueness
  const nameHash = await hash(`${nameWithoutExt}-${timestamp}-${random}`);
  
  return `${nameHash.substring(0, 16)}-${timestamp}${extension}`;
}

/**
 * Get upload directory for specific entity type
 */
export function getUploadDirectory(entityType: 'vendor' | 'client' | 'order' | 'product', entityId: number): string {
  return path.join(UPLOAD_DIR, entityType, entityId.toString());
}

/**
 * Ensure directory exists
 */
async function ensureDirectoryExists(dirPath: string): Promise<void> {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
}

/**
 * Save file securely
 */
export async function saveFile(
  file: File,
  entityType: 'vendor' | 'client' | 'order' | 'product',
  entityId: number
): Promise<{ success: boolean; filePath?: string; error?: string }> {
  try {
    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Generate secure filename
    const secureFilename = await generateSecureFilename(file.name);
    
    // Get upload directory
    const uploadDir = getUploadDirectory(entityType, entityId);
    await ensureDirectoryExists(uploadDir);

    // Full file path
    const filePath = path.join(uploadDir, secureFilename);

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save file
    await writeFile(filePath, buffer);

    // Return relative path for storage in database
    const relativePath = path.join(entityType, entityId.toString(), secureFilename);

    return {
      success: true,
      filePath: relativePath,
    };
  } catch (error) {
    console.error('File save error:', error);
    return {
      success: false,
      error: 'Failed to save file',
    };
  }
}

/**
 * Get file URL for serving
 */
export function getFileUrl(relativePath: string): string {
  // In production, this should return a signed URL or serve through a secure endpoint
  return `/api/files/${relativePath}`;
}

/**
 * Delete file
 */
export async function deleteFile(relativePath: string): Promise<boolean> {
  try {
    const fs = await import('fs/promises');
    const fullPath = path.join(UPLOAD_DIR, relativePath);
    
    if (existsSync(fullPath)) {
      await fs.unlink(fullPath);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('File deletion error:', error);
    return false;
  }
}

/**
 * Sanitize filename to prevent path traversal attacks
 */
export function sanitizeFilename(filename: string): string {
  // Remove any path separators and special characters
  return filename
    .replace(/[/\\]/g, '')
    .replace(/\.\./g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '_');
}

/**
 * Get file metadata
 */
export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
}

/**
 * Parse file metadata from stored document
 */
export function parseFileMetadata(document: any): FileMetadata {
  return {
    name: document.fileName || document.documentName || 'Unknown',
    size: document.fileSize || 0,
    type: document.mimeType || document.fileType || 'application/octet-stream',
    uploadDate: document.uploadDate || document.createdAt || new Date(),
  };
}
