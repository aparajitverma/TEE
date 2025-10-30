import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all clients
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const clientType = searchParams.get('type');
    const status = searchParams.get('status');
    const country = searchParams.get('country');

    const where: any = {};

    // Search filter
    if (search) {
      where.OR = [
        { companyName: { contains: search } },
        { contactPerson: { contains: search } },
        { emailPrimary: { contains: search } },
        { phonePrimary: { contains: search } },
      ];
    }

    // Client type filter
    if (clientType && clientType !== 'all') {
      where.clientType = clientType;
    }

    // Status filter
    if (status && status !== 'all') {
      where.status = status;
    }

    // Country filter
    if (country && country !== 'all') {
      where.country = country;
    }

    const clients = await prisma.client.findMany({
      where,
      orderBy: { dateAdded: 'desc' },
    });

    return NextResponse.json({ clients, count: clients.length });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

// POST create new client
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate client code if not provided
    if (!body.clientCode) {
      const lastClient = await prisma.client.findFirst({
        orderBy: { id: 'desc' },
      });
      const nextId = (lastClient?.id || 0) + 1;
      body.clientCode = `CLI-${String(nextId).padStart(3, '0')}`;
    }

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

    const client = await prisma.client.create({
      data: body,
    });

    return NextResponse.json({ client }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { error: 'Failed to create client', details: error.message },
      { status: 500 }
    );
  }
}
