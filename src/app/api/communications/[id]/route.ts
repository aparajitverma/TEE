import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch single communication
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const communication = await prisma.communicationLog.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!communication) {
      return NextResponse.json(
        { error: 'Communication not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ communication });
  } catch (error) {
    console.error('Error fetching communication:', error);
    return NextResponse.json(
      { error: 'Failed to fetch communication' },
      { status: 500 }
    );
  }
}

// PUT - Update communication
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const communication = await prisma.communicationLog.update({
      where: { id: parseInt(params.id) },
      data: {
        communicationType: body.communicationType,
        direction: body.direction,
        dateTime: body.dateTime ? new Date(body.dateTime) : undefined,
        subject: body.subject,
        summary: body.summary,
        fullContent: body.fullContent,
        attachments: body.attachments,
        outcome: body.outcome,
        nextAction: body.nextAction,
        loggedBy: body.loggedBy,
      },
    });

    return NextResponse.json({ communication });
  } catch (error) {
    console.error('Error updating communication:', error);
    return NextResponse.json(
      { error: 'Failed to update communication' },
      { status: 500 }
    );
  }
}

// DELETE - Delete communication
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.communicationLog.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Communication deleted successfully' });
  } catch (error) {
    console.error('Error deleting communication:', error);
    return NextResponse.json(
      { error: 'Failed to delete communication' },
      { status: 500 }
    );
  }
}
