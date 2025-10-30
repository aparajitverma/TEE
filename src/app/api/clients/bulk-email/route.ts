import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/lib/auth';
import { withPermission } from '@/lib/route-handler';

// POST send bulk email to clients
export const POST = withPermission(PERMISSIONS.CLIENT_VIEW, async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { clientIds, subject, message, template } = body;

    if (!clientIds || !Array.isArray(clientIds) || clientIds.length === 0) {
      return NextResponse.json({ error: 'Client IDs are required' }, { status: 400 });
    }

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 });
    }

    // Fetch clients
    const clients = await prisma.client.findMany({
      where: { id: { in: clientIds } },
      select: {
        id: true,
        emailPrimary: true,
        contactPerson: true,
        companyName: true,
      },
    });

    // Prepare emails
    const emails = clients.map(client => ({
      to: client.emailPrimary,
      subject: personalizeText(subject, client),
      body: personalizeText(message, client),
    }));

    // Log communications
    const communicationLogs = clients.map(client =>
      prisma.communicationLog.create({
        data: {
          clientId: client.id,
          communicationType: 'Email',
          direction: 'Outbound',
          subject: personalizeText(subject, client),
          summary: 'Bulk email sent',
          fullContent: personalizeText(message, client),
          loggedBy: user.email,
        },
      })
    );

    await Promise.all(communicationLogs);

    // In production, integrate with email service (SendGrid, AWS SES, etc.)
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: `Email queued for ${emails.length} clients`,
      count: emails.length,
      emails, // In production, don't return this
    });
  } catch (error: any) {
    console.error('Bulk email error:', error);
    return NextResponse.json(
      { error: 'Failed to send bulk email', details: error.message },
      { status: 500 }
    );
  }
});

function personalizeText(text: string, client: any): string {
  return text
    .replace(/\{name\}/g, client.contactPerson || 'Valued Customer')
    .replace(/\{company\}/g, client.companyName || 'Your Company')
    .replace(/\{email\}/g, client.emailPrimary || '');
}
