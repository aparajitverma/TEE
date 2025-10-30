import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/lib/auth';
import { withPermission } from '@/lib/route-handler';

// POST bulk operations on clients
export const POST = withPermission(PERMISSIONS.CLIENT_EDIT, async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { operation, clientIds, data } = body;

    if (!clientIds || !Array.isArray(clientIds) || clientIds.length === 0) {
      return NextResponse.json({ error: 'Client IDs are required' }, { status: 400 });
    }

    switch (operation) {
      case 'update-status':
        return await bulkUpdateStatus(clientIds, data.status);
      
      case 'update-assignment':
        return await bulkUpdateAssignment(clientIds, data.assignedTo);
      
      case 'add-tags':
        return await bulkAddTags(clientIds, data.tags);
      
      case 'delete':
        return await bulkDelete(clientIds, user);
      
      default:
        return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Bulk operation error:', error);
    return NextResponse.json(
      { error: 'Bulk operation failed', details: error.message },
      { status: 500 }
    );
  }
});

async function bulkUpdateStatus(clientIds: number[], status: string) {
  const result = await prisma.client.updateMany({
    where: { id: { in: clientIds } },
    data: { status },
  });

  return NextResponse.json({
    success: true,
    message: `Updated ${result.count} clients`,
    count: result.count,
  });
}

async function bulkUpdateAssignment(clientIds: number[], assignedTo: string) {
  const result = await prisma.client.updateMany({
    where: { id: { in: clientIds } },
    data: { assignedTo },
  });

  return NextResponse.json({
    success: true,
    message: `Assigned ${result.count} clients to ${assignedTo}`,
    count: result.count,
  });
}

async function bulkAddTags(clientIds: number[], newTags: string[]) {
  const clients = await prisma.client.findMany({
    where: { id: { in: clientIds } },
    select: { id: true, tags: true },
  });

  const updates = clients.map(client => {
    const existingTags = client.tags ? JSON.parse(client.tags) : [];
    const mergedTags = [...new Set([...existingTags, ...newTags])];
    
    return prisma.client.update({
      where: { id: client.id },
      data: { tags: JSON.stringify(mergedTags) },
    });
  });

  await Promise.all(updates);

  return NextResponse.json({
    success: true,
    message: `Added tags to ${clients.length} clients`,
    count: clients.length,
  });
}

async function bulkDelete(clientIds: number[], user: any) {
  // Check permission
  if (!user.permissions.includes('*') && !user.permissions.includes(PERMISSIONS.CLIENT_DELETE)) {
    return NextResponse.json(
      { error: 'Insufficient permissions to delete clients' },
      { status: 403 }
    );
  }

  const result = await prisma.client.deleteMany({
    where: { id: { in: clientIds } },
  });

  return NextResponse.json({
    success: true,
    message: `Deleted ${result.count} clients`,
    count: result.count,
  });
}
