import { NextRequest, NextResponse } from 'next/server';
import { AuthUser, verifyAuth, hasPermission } from './auth';

/**
 * Wrapper for route handlers that require authentication
 */
export function withAuth(
  handler: (request: NextRequest, user: AuthUser, context?: any) => Promise<Response>
) {
  return async (request: NextRequest, context?: any) => {
    const user = verifyAuth(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }

    return handler(request, user, context);
  };
}

/**
 * Wrapper for route handlers that require specific permission
 */
export function withPermission(
  permission: string,
  handler: (request: NextRequest, user: AuthUser, context?: any) => Promise<Response>
) {
  return async (request: NextRequest, context?: any) => {
    const user = verifyAuth(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!hasPermission(user, permission)) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    return handler(request, user, context);
  };
}
