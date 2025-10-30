import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all communications or filter by clientId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');

    const where = clientId ? { clientId: parseInt(clientId) } : {};

    const communications = await prisma.communicationLog.findMany({
      where,
      orderBy: { dateTime: 'desc' },
    });

    return NextResponse.json({ communications });
  } catch (error) {
    console.error('Error fetching communications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch communications' },
      { status: 500 }
    );
  }
}

// POST - Create new communication log
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const communication = await prisma.communicationLog.create({
      data: {
        clientId: body.clientId,
        communicationType: body.communicationType,
        direction: body.direction,
        dateTime: body.dateTime ? new Date(body.dateTime) : new Date(),
        subject: body.subject || null,
        summary: body.summary || null,
        fullContent: body.fullContent || null,
        attachments: body.attachments || null,
        outcome: body.outcome || null,
        nextAction: body.nextAction || null,
        loggedBy: body.loggedBy || null,
      },
    });

    return NextResponse.json({ communication }, { status: 201 });
  } catch (error) {
    console.error('Error creating communication:', error);
    return NextResponse.json(
      { error: 'Failed to create communication', details: error },
      { status: 500 }
    );
  }
}
