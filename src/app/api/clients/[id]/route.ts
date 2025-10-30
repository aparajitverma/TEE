import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single client by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await prisma.client.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ client });
  } catch (error) {
    console.error('Error fetching client:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

// PUT update client
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Parse JSON fields if they're strings
    if (typeof body.productsInterestedIn === 'object') {
      body.productsInterestedIn = JSON.stringify(body.productsInterestedIn);
    }
    if (typeof body.certificationsRequired === 'object') {
      body.certificationsRequired = JSON.stringify(body.certificationsRequired);
    }
    if (typeof body.decisionMakers === 'object') {
      body.decisionMakers = JSON.stringify(body.decisionMakers);
    }
    if (typeof body.tags === 'object') {
      body.tags = JSON.stringify(body.tags);
    }

    const client = await prisma.client.update({
      where: { id: parseInt(params.id) },
      data: body,
    });

    return NextResponse.json({ client });
  } catch (error: any) {
    console.error('Error updating client:', error);
    return NextResponse.json(
      { error: 'Failed to update client', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE client
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.client.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}
