import { NextRequest } from 'next/server';

export interface AuthUser {
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  permissions: string[];
}

/**
 * Verify admin authentication from request headers
 * In production, this should validate JWT tokens or session cookies
 */
export function verifyAuth(request: NextRequest): AuthUser | null {
  try {
    // Check for authorization header
    const authHeader = request.headers.get('authorization');
    const adminAuth = request.headers.get('x-admin-auth');
    const adminEmail = request.headers.get('x-admin-email');

    // For now, we're using a simple header-based auth
    // In production, implement proper JWT validation
    if (adminAuth === 'true' && adminEmail) {
      return {
        email: adminEmail,
        role: 'admin',
        permissions: ['*'], // Admin has all permissions
      };
    }

    return null;
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

/**
 * Check if user has specific permission
 */
export function hasPermission(user: AuthUser, permission: string): boolean {
  if (user.permissions.includes('*')) {
    return true;
  }
  return user.permissions.includes(permission);
}

/**
 * Middleware to require authentication
 */
export function requireAuth(handler: (request: NextRequest, user: AuthUser) => Promise<Response>) {
  return async (request: NextRequest) => {
    const user = verifyAuth(request);
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', message: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return handler(request, user);
  };
}

/**
 * Middleware to require specific permission
 */
export function requirePermission(permission: string, handler: (request: NextRequest, user: AuthUser) => Promise<Response>) {
  return async (request: NextRequest) => {
    const user = verifyAuth(request);
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', message: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!hasPermission(user, permission)) {
      return new Response(
        JSON.stringify({ error: 'Forbidden', message: 'Insufficient permissions' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return handler(request, user);
  };
}

/**
 * Role-based permissions
 */
export const PERMISSIONS = {
  VENDOR_VIEW: 'vendor:view',
  VENDOR_CREATE: 'vendor:create',
  VENDOR_EDIT: 'vendor:edit',
  VENDOR_DELETE: 'vendor:delete',
  ORDER_VIEW: 'order:view',
  ORDER_CREATE: 'order:create',
  ORDER_EDIT: 'order:edit',
  ORDER_DELETE: 'order:delete',
  CLIENT_VIEW: 'client:view',
  CLIENT_CREATE: 'client:create',
  CLIENT_EDIT: 'client:edit',
  CLIENT_DELETE: 'client:delete',
  PRODUCT_VIEW: 'product:view',
  PRODUCT_CREATE: 'product:create',
  PRODUCT_EDIT: 'product:edit',
  PRODUCT_DELETE: 'product:delete',
} as const;

/**
 * Role definitions with permissions
 */
export const ROLES = {
  admin: {
    name: 'Administrator',
    permissions: ['*'], // All permissions
  },
  manager: {
    name: 'Manager',
    permissions: [
      PERMISSIONS.VENDOR_VIEW,
      PERMISSIONS.VENDOR_CREATE,
      PERMISSIONS.VENDOR_EDIT,
      PERMISSIONS.ORDER_VIEW,
      PERMISSIONS.ORDER_CREATE,
      PERMISSIONS.ORDER_EDIT,
      PERMISSIONS.CLIENT_VIEW,
      PERMISSIONS.CLIENT_CREATE,
      PERMISSIONS.CLIENT_EDIT,
      PERMISSIONS.PRODUCT_VIEW,
      PERMISSIONS.PRODUCT_CREATE,
      PERMISSIONS.PRODUCT_EDIT,
    ],
  },
  viewer: {
    name: 'Viewer',
    permissions: [
      PERMISSIONS.VENDOR_VIEW,
      PERMISSIONS.ORDER_VIEW,
      PERMISSIONS.CLIENT_VIEW,
      PERMISSIONS.PRODUCT_VIEW,
    ],
  },
} as const;
