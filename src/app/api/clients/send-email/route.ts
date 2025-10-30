import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/lib/auth';
import { withPermission } from '@/lib/route-handler';

// POST send email to a client
export const POST = withPermission(PERMISSIONS.CLIENT_VIEW, async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { clientId, subject, message, template, trackOpens, trackClicks } = body;

    if (!clientId || !subject || !message) {
      return NextResponse.json(
        { error: 'Client ID, subject, and message are required' },
        { status: 400 }
      );
    }

    // Fetch client
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      select: {
        id: true,
        emailPrimary: true,
        contactPerson: true,
        companyName: true,
      },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Personalize message
    const personalizedSubject = personalizeText(subject, client);
    const personalizedMessage = personalizeText(message, client);

    // Generate tracking IDs if needed
    const trackingId = trackOpens || trackClicks ? generateTrackingId() : null;

    // Add tracking pixel if enabled
    let finalMessage = personalizedMessage;
    if (trackOpens && trackingId) {
      finalMessage += `\n\n<img src="${process.env.NEXT_PUBLIC_APP_URL}/api/track/open/${trackingId}" width="1" height="1" style="display:none" />`;
    }

    // Replace links with tracking links if enabled
    if (trackClicks && trackingId) {
      finalMessage = addTrackingToLinks(finalMessage, trackingId);
    }

    // Log communication
    await prisma.communicationLog.create({
      data: {
        clientId: client.id,
        communicationType: 'Email',
        direction: 'Outbound',
        subject: personalizedSubject,
        summary: template ? `Sent using template: ${template} to ${client.emailPrimary}` : `Email sent from CRM to ${client.emailPrimary}`,
        fullContent: personalizedMessage,
        loggedBy: user.email,
      },
    });

    // In production, integrate with email service (SendGrid, AWS SES, etc.)
    // For now, return success with email details
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      email: {
        to: client.emailPrimary,
        subject: personalizedSubject,
        body: finalMessage,
        trackingId,
      },
    });
  } catch (error: any) {
    console.error('Send email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
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

function generateTrackingId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

function addTrackingToLinks(html: string, trackingId: string): string {
  // Simple regex to find links - in production, use a proper HTML parser
  return html.replace(
    /href="([^"]+)"/g,
    `href="${process.env.NEXT_PUBLIC_APP_URL}/api/track/click/${trackingId}?url=$1"`
  );
}
