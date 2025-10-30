import { prisma } from './prisma';

export interface AuditLogEntry {
  vendorId: number;
  actionType: string;
  actionBy: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Create an audit log entry for vendor actions
 */
export async function createVendorAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    await prisma.vendorActivityLog.create({
      data: {
        vendorId: entry.vendorId,
        actionType: entry.actionType,
        actionBy: entry.actionBy,
        details: entry.details ? JSON.stringify(entry.details) : null,
        ipAddress: entry.ipAddress || null,
        userAgent: entry.userAgent || null,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw error - audit log failure shouldn't break the main operation
  }
}

/**
 * Get audit logs for a vendor
 */
export async function getVendorAuditLogs(vendorId: number, limit: number = 50) {
  try {
    return await prisma.vendorActivityLog.findMany({
      where: { vendorId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  } catch (error) {
    console.error('Failed to fetch audit logs:', error);
    return [];
  }
}

/**
 * Compare objects and return changes
 */
export function getChanges(oldData: any, newData: any): Record<string, { old: any; new: any }> {
  const changes: Record<string, { old: any; new: any }> = {};
  
  // Get all keys from both objects
  const allKeys = new Set([...Object.keys(oldData || {}), ...Object.keys(newData || {})]);
  
  for (const key of allKeys) {
    const oldValue = oldData?.[key];
    const newValue = newData?.[key];
    
    // Skip if values are the same
    if (JSON.stringify(oldValue) === JSON.stringify(newValue)) {
      continue;
    }
    
    changes[key] = {
      old: oldValue,
      new: newValue,
    };
  }
  
  return changes;
}

/**
 * Log vendor creation
 */
export async function logVendorCreated(
  vendorId: number,
  vendorData: any,
  actionBy: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await createVendorAuditLog({
    vendorId,
    actionType: 'Created',
    actionBy,
    details: {
      vendorName: vendorData.vendorName,
      vendorCode: vendorData.vendorCode,
      vendorType: vendorData.vendorType,
    },
    ipAddress,
    userAgent,
  });
}

/**
 * Log vendor update
 */
export async function logVendorUpdated(
  vendorId: number,
  oldData: any,
  newData: any,
  actionBy: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  const changes = getChanges(oldData, newData);
  
  if (Object.keys(changes).length === 0) {
    return; // No changes to log
  }
  
  await createVendorAuditLog({
    vendorId,
    actionType: 'Updated',
    actionBy,
    details: {
      changes,
      fieldsChanged: Object.keys(changes),
    },
    ipAddress,
    userAgent,
  });
}

/**
 * Log vendor deletion
 */
export async function logVendorDeleted(
  vendorId: number,
  vendorData: any,
  actionBy: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await createVendorAuditLog({
    vendorId,
    actionType: 'Deleted',
    actionBy,
    details: {
      vendorName: vendorData.vendorName,
      vendorCode: vendorData.vendorCode,
    },
    ipAddress,
    userAgent,
  });
}

/**
 * Log document upload
 */
export async function logDocumentUploaded(
  vendorId: number,
  documentName: string,
  documentType: string,
  actionBy: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await createVendorAuditLog({
    vendorId,
    actionType: 'Document Uploaded',
    actionBy,
    details: {
      documentName,
      documentType,
    },
    ipAddress,
    userAgent,
  });
}

/**
 * Log payment recorded
 */
export async function logPaymentRecorded(
  vendorId: number,
  amount: number,
  paymentMethod: string,
  actionBy: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await createVendorAuditLog({
    vendorId,
    actionType: 'Payment Recorded',
    actionBy,
    details: {
      amount,
      paymentMethod,
    },
    ipAddress,
    userAgent,
  });
}

/**
 * Log note added
 */
export async function logNoteAdded(
  vendorId: number,
  notePreview: string,
  actionBy: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await createVendorAuditLog({
    vendorId,
    actionType: 'Note Added',
    actionBy,
    details: {
      notePreview: notePreview.substring(0, 100),
    },
    ipAddress,
    userAgent,
  });
}

/**
 * Log status change
 */
export async function logStatusChanged(
  vendorId: number,
  oldStatus: string,
  newStatus: string,
  actionBy: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  await createVendorAuditLog({
    vendorId,
    actionType: 'Status Changed',
    actionBy,
    details: {
      oldStatus,
      newStatus,
    },
    ipAddress,
    userAgent,
  });
}
