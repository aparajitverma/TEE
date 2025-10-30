/**
 * Email Service
 * Handles sending emails for order notifications
 * 
 * NOTE: This is a template implementation. In production, integrate with:
 * - SendGrid (https://sendgrid.com/)
 * - AWS SES (https://aws.amazon.com/ses/)
 * - Resend (https://resend.com/)
 * - Nodemailer with SMTP
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

interface OrderEmailData {
  orderNumber: string;
  clientName: string;
  clientEmail: string;
  totalAmount: number;
  currency: string;
  orderDate: string;
  expectedDeliveryDate?: string;
  trackingNumber?: string;
  products?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

class EmailService {
  private fromEmail: string;
  private companyName: string;

  constructor() {
    this.fromEmail = process.env.EMAIL_FROM || 'noreply@theexportexpress.com';
    this.companyName = 'The Export Express';
  }

  /**
   * Send email (placeholder - integrate with actual email service)
   */
  private async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // TODO: Integrate with actual email service
      // Example with SendGrid:
      // const sgMail = require('@sendgrid/mail');
      // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      // await sgMail.send(options);

      // For now, just log the email
      console.log('📧 Email would be sent:', {
        to: options.to,
        subject: options.subject,
        from: options.from || this.fromEmail,
      });

      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  /**
   * Send new inquiry notification
   */
  async sendNewInquiryNotification(data: OrderEmailData): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${this.companyName}</h1>
            </div>
            <div class="content">
              <h2>New Inquiry Received</h2>
              <p>Dear ${data.clientName},</p>
              <p>Thank you for your inquiry! We have received your request and our team will review it shortly.</p>
              <p><strong>Inquiry Number:</strong> ${data.orderNumber}</p>
              <p><strong>Date:</strong> ${new Date(data.orderDate).toLocaleDateString()}</p>
              <p>We will get back to you within 24 hours with a detailed quote.</p>
              <p>If you have any questions, please don't hesitate to contact us.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${this.companyName}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.clientEmail,
      subject: `Inquiry Received - ${data.orderNumber}`,
      html,
      text: `Thank you for your inquiry! We have received your request (${data.orderNumber}) and will get back to you shortly.`,
    });
  }

  /**
   * Send quote notification
   */
  async sendQuoteSentNotification(data: OrderEmailData): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .amount { font-size: 24px; color: #10b981; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${this.companyName}</h1>
            </div>
            <div class="content">
              <h2>Your Quote is Ready</h2>
              <p>Dear ${data.clientName},</p>
              <p>Thank you for your interest! We are pleased to provide you with a quote for your inquiry.</p>
              <p><strong>Quote Number:</strong> ${data.orderNumber}</p>
              <p><strong>Total Amount:</strong> <span class="amount">${data.currency} ${data.totalAmount.toLocaleString()}</span></p>
              <p>This quote is valid for 30 days from the date of issue.</p>
              <p>Please review the attached quote and let us know if you have any questions or would like to proceed with the order.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${this.companyName}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.clientEmail,
      subject: `Quote Ready - ${data.orderNumber}`,
      html,
      text: `Your quote (${data.orderNumber}) is ready. Total: ${data.currency} ${data.totalAmount}`,
    });
  }

  /**
   * Send order confirmation notification
   */
  async sendOrderConfirmationNotification(data: OrderEmailData): Promise<boolean> {
    const productsHtml = data.products
      ? data.products.map(p => `<li>${p.name} - Qty: ${p.quantity} - ${data.currency} ${p.price}</li>`).join('')
      : '';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .amount { font-size: 24px; color: #10b981; font-weight: bold; }
            ul { list-style: none; padding: 0; }
            li { padding: 8px; background: white; margin: 5px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${this.companyName}</h1>
            </div>
            <div class="content">
              <h2>✓ Order Confirmed</h2>
              <p>Dear ${data.clientName},</p>
              <p>Great news! Your order has been confirmed and is now being processed.</p>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Order Date:</strong> ${new Date(data.orderDate).toLocaleDateString()}</p>
              ${data.expectedDeliveryDate ? `<p><strong>Expected Delivery:</strong> ${new Date(data.expectedDeliveryDate).toLocaleDateString()}</p>` : ''}
              <p><strong>Total Amount:</strong> <span class="amount">${data.currency} ${data.totalAmount.toLocaleString()}</span></p>
              ${productsHtml ? `<h3>Order Items:</h3><ul>${productsHtml}</ul>` : ''}
              <p>We will keep you updated on the progress of your order.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${this.companyName}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.clientEmail,
      subject: `Order Confirmed - ${data.orderNumber}`,
      html,
      text: `Your order ${data.orderNumber} has been confirmed. Total: ${data.currency} ${data.totalAmount}`,
    });
  }

  /**
   * Send payment received notification
   */
  async sendPaymentReceivedNotification(data: OrderEmailData & { amountReceived: number }): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .amount { font-size: 24px; color: #10b981; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${this.companyName}</h1>
            </div>
            <div class="content">
              <h2>✓ Payment Received</h2>
              <p>Dear ${data.clientName},</p>
              <p>We have successfully received your payment. Thank you!</p>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Amount Received:</strong> <span class="amount">${data.currency} ${data.amountReceived.toLocaleString()}</span></p>
              <p>Your order is now being processed and will be shipped soon.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${this.companyName}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.clientEmail,
      subject: `Payment Received - ${data.orderNumber}`,
      html,
      text: `Payment received for order ${data.orderNumber}. Amount: ${data.currency} ${data.amountReceived}`,
    });
  }

  /**
   * Send order shipped notification
   */
  async sendOrderShippedNotification(data: OrderEmailData): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .tracking { background: white; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
            .tracking-number { font-size: 20px; font-weight: bold; color: #10b981; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${this.companyName}</h1>
            </div>
            <div class="content">
              <h2>📦 Your Order Has Been Shipped!</h2>
              <p>Dear ${data.clientName},</p>
              <p>Great news! Your order has been shipped and is on its way to you.</p>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              ${data.expectedDeliveryDate ? `<p><strong>Expected Delivery:</strong> ${new Date(data.expectedDeliveryDate).toLocaleDateString()}</p>` : ''}
              ${data.trackingNumber ? `
                <div class="tracking">
                  <p><strong>Tracking Number:</strong></p>
                  <p class="tracking-number">${data.trackingNumber}</p>
                  <p style="font-size: 12px; color: #666;">Use this number to track your shipment</p>
                </div>
              ` : ''}
              <p>You can track your shipment using the tracking number provided above.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${this.companyName}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.clientEmail,
      subject: `Order Shipped - ${data.orderNumber}`,
      html,
      text: `Your order ${data.orderNumber} has been shipped. ${data.trackingNumber ? `Tracking: ${data.trackingNumber}` : ''}`,
    });
  }

  /**
   * Send order delivered notification
   */
  async sendOrderDeliveredNotification(data: OrderEmailData): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${this.companyName}</h1>
            </div>
            <div class="content">
              <h2>✓ Order Delivered</h2>
              <p>Dear ${data.clientName},</p>
              <p>Your order has been successfully delivered!</p>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p>We hope you are satisfied with your purchase. If you have any questions or concerns, please don't hesitate to contact us.</p>
              <p>Thank you for choosing ${this.companyName}. We look forward to serving you again!</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${this.companyName}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.clientEmail,
      subject: `Order Delivered - ${data.orderNumber}`,
      html,
      text: `Your order ${data.orderNumber} has been delivered. Thank you for your business!`,
    });
  }

  /**
   * Send follow-up reminder
   */
  async sendFollowUpReminder(data: OrderEmailData): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${this.companyName}</h1>
            </div>
            <div class="content">
              <h2>Follow-up on Your Order</h2>
              <p>Dear ${data.clientName},</p>
              <p>We wanted to follow up regarding your order ${data.orderNumber}.</p>
              <p>If you have any questions or need any assistance, please feel free to reach out to us.</p>
              <p>We're here to help!</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${this.companyName}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.clientEmail,
      subject: `Follow-up: ${data.orderNumber}`,
      html,
      text: `Following up on your order ${data.orderNumber}. Let us know if you need any assistance.`,
    });
  }

  /**
   * Send payment reminder
   */
  async sendPaymentReminder(data: OrderEmailData & { balanceAmount: number }): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .amount { font-size: 24px; color: #f59e0b; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${this.companyName}</h1>
            </div>
            <div class="content">
              <h2>Payment Reminder</h2>
              <p>Dear ${data.clientName},</p>
              <p>This is a friendly reminder regarding the pending payment for your order.</p>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Outstanding Balance:</strong> <span class="amount">${data.currency} ${data.balanceAmount.toLocaleString()}</span></p>
              <p>Please process the payment at your earliest convenience to avoid any delays in processing your order.</p>
              <p>If you have already made the payment, please disregard this reminder.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${this.companyName}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.clientEmail,
      subject: `Payment Reminder - ${data.orderNumber}`,
      html,
      text: `Payment reminder for order ${data.orderNumber}. Outstanding balance: ${data.currency} ${data.balanceAmount}`,
    });
  }
}

// Export singleton instance
export const emailService = new EmailService();
