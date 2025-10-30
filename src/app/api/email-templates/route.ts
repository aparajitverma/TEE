import { NextRequest, NextResponse } from 'next/server';
import { PERMISSIONS } from '@/lib/auth';
import { withPermission } from '@/lib/route-handler';

// Predefined email templates
const EMAIL_TEMPLATES = {
  'welcome': {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to The Export Express, {name}!',
    body: `Dear {name},

Thank you for choosing The Export Express. We're excited to work with {company} and help you with your export needs.

Our team is here to support you every step of the way. If you have any questions, please don't hesitate to reach out.

Best regards,
The Export Express Team`,
  },
  'quote-follow-up': {
    id: 'quote-follow-up',
    name: 'Quote Follow-up',
    subject: 'Following up on your quote request',
    body: `Dear {name},

I wanted to follow up on the quote we sent to {company} recently. 

Do you have any questions about our pricing or products? We'd be happy to discuss any details or adjust the quote to better meet your needs.

Looking forward to hearing from you.

Best regards,
The Export Express Team`,
  },
  'order-confirmation': {
    id: 'order-confirmation',
    name: 'Order Confirmation',
    subject: 'Order Confirmation - {company}',
    body: `Dear {name},

Thank you for your order! We're pleased to confirm that we've received your order and it's being processed.

We'll keep you updated on the progress and notify you once your shipment is ready.

If you have any questions, please contact us at {email}.

Best regards,
The Export Express Team`,
  },
  'shipping-notification': {
    id: 'shipping-notification',
    name: 'Shipping Notification',
    subject: 'Your order has been shipped!',
    body: `Dear {name},

Great news! Your order from {company} has been shipped.

You can track your shipment using the tracking details we'll send separately.

Thank you for your business!

Best regards,
The Export Express Team`,
  },
  'payment-reminder': {
    id: 'payment-reminder',
    name: 'Payment Reminder',
    subject: 'Payment Reminder - {company}',
    body: `Dear {name},

This is a friendly reminder about the pending payment for your recent order.

If you've already made the payment, please disregard this message. Otherwise, we'd appreciate if you could process it at your earliest convenience.

Thank you for your cooperation.

Best regards,
The Export Express Team`,
  },
  'feedback-request': {
    id: 'feedback-request',
    name: 'Feedback Request',
    subject: 'We would love your feedback!',
    body: `Dear {name},

We hope you are satisfied with your recent order from The Export Express.

We would greatly appreciate if you could take a moment to share your feedback about your experience with us. Your input helps us improve our services.

Thank you for choosing The Export Express!

Best regards,
The Export Express Team`,
  },
  'inactive-client': {
    id: 'inactive-client',
    name: 'Re-engagement Email',
    subject: 'We miss you, {name}!',
    body: `Dear {name},

We noticed it has been a while since we last heard from {company}, and we wanted to reach out.

We have some exciting new products and special offers that might interest you. We would love to reconnect and discuss how we can support your business.

Looking forward to working with you again!

Best regards,
The Export Express Team`,
  },
};

// GET all email templates
export const GET = withPermission(PERMISSIONS.CLIENT_VIEW, async (request: NextRequest, user) => {
  try {
    const templates = Object.values(EMAIL_TEMPLATES);
    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
});

// POST get specific template
export const POST = withPermission(PERMISSIONS.CLIENT_VIEW, async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { templateId } = body;

    const template = EMAIL_TEMPLATES[templateId as keyof typeof EMAIL_TEMPLATES];

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json({ template });
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json({ error: 'Failed to fetch template' }, { status: 500 });
  }
});
