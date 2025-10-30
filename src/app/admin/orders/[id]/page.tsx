'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, Edit, Trash2, Package, DollarSign, Calendar,
  User, Phone, Mail, MapPin, FileText, Truck, Copy, FileCheck, ShoppingCart, ExternalLink
} from 'lucide-react';
import OrderProgressTimeline from '@/components/OrderProgressTimeline';
import { getTrackingUrl, detectCarrier, carriers } from '@/lib/carrier-tracking';

interface OrderLineItem {
  id: number;
  productName: string;
  productCode: string | null;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

interface PaymentHistory {
  id: number;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  referenceNumber: string | null;
  receivedBy: string | null;
  notes: string | null;
}

interface OrderCommunication {
  id: number;
  communicationType: string;
  direction: string;
  dateTime: string;
  subject: string | null;
  summary: string | null;
  fullContent: string | null;
  attachments: string | null;
  emailTemplate: string | null;
  sentTo: string | null;
  loggedBy: string | null;
}

interface OrderActivityLog {
  id: number;
  actionType: string;
  description: string;
  fieldName: string | null;
  oldValue: string | null;
  newValue: string | null;
  performedBy: string;
  timestamp: string;
  metadata: string | null;
}

interface Order {
  id: number;
  orderNumber: string;
  orderType: string;
  orderStatus: string;
  priority: string;
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  orderDate: string;
  expectedDeliveryDate: string | null;
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  paymentTerms: string | null;
  paymentStatus: string;
  notes: string | null;
  lineItems: OrderLineItem[];
  paymentHistory: PaymentHistory[];
  communications: OrderCommunication[];
  activityLogs: OrderActivityLog[];
  // Payment details
  advancePercentage: number | null;
  advanceAmount: number | null;
  advanceReceivedDate: string | null;
  balanceAmount: number | null;
  balanceReceivedDate: string | null;
  // Shipping details
  incoterm: string | null;
  shippingMethod: string | null;
  portOfLoading: string | null;
  portOfDischarge: string | null;
  shippingLine: string | null;
  containerNumber: string | null;
  blNumber: string | null;
  awbNumber: string | null;
  trackingNumber: string | null;
  // Shipping timeline
  estimatedDepartureDate: string | null;
  actualDepartureDate: string | null;
  estimatedArrivalDate: string | null;
  actualArrivalDate: string | null;
  // Packaging details
  numberOfPackages: number | null;
  packageType: string | null;
  grossWeight: number | null;
  netWeight: number | null;
  weightUnit: string | null;
  dimensions: string | null;
  specialHandling: string | null;
  // Documents
  proformaInvoiceUrl: string | null;
  commercialInvoiceUrl: string | null;
  packingListUrl: string | null;
  certificateOfOriginUrl: string | null;
  phytosanitaryCertificateUrl: string | null;
  billOfLadingUrl: string | null;
  insuranceCertificateUrl: string | null;
  otherDocuments: string | null;
  // Metadata
  createdBy: string | null;
  updatedBy: string | null;
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({
    amount: '',
    paymentMethod: 'Bank Transfer',
    referenceNumber: '',
    receivedBy: '',
    notes: ''
  });
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const [showAddComm, setShowAddComm] = useState(false);
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const [expandedComm, setExpandedComm] = useState<number | null>(null);
  const [newComm, setNewComm] = useState({
    communicationType: 'Email',
    direction: 'Outbound',
    subject: '',
    summary: '',
    fullContent: '',
    sentTo: '',
    loggedBy: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showUpdateTracking, setShowUpdateTracking] = useState(false);
  const [trackingData, setTrackingData] = useState({
    trackingNumber: '',
    shippingLine: '',
    containerNumber: '',
    actualDepartureDate: '',
    estimatedArrivalDate: '',
    sendNotification: true
  });
  const [showPaymentReminder, setShowPaymentReminder] = useState(false);
  const [reminderType, setReminderType] = useState('gentle');

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();
      
      if (data.order) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      alert('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/orders');
      } else {
        alert('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Error deleting order');
    }
  };

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPayment.amount || parseFloat(newPayment.amount) <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPayment),
      });

      if (response.ok) {
        setShowAddPayment(false);
        setNewPayment({
          amount: '',
          paymentMethod: 'Bank Transfer',
          referenceNumber: '',
          receivedBy: '',
          notes: ''
        });
        fetchOrder(); // Refresh order data
      } else {
        alert('Failed to add payment');
      }
    } catch (error) {
      console.error('Error adding payment:', error);
      alert('Error adding payment');
    }
  };

  const calculateOutstanding = () => {
    if (!order) return 0;
    const totalPaid = order.paymentHistory.reduce((sum, p) => sum + p.amount, 0);
    return order.totalAmount - totalPaid;
  };

  const handleFileUpload = async (docType: string, file: File) => {
    // This is a placeholder for file upload functionality
    // In a real implementation, you would upload to a storage service (S3, Cloudinary, etc.)
    alert(`File upload functionality for ${docType} will be implemented with a storage service`);
    setUploadingDoc(null);
  };

  const handleGenerateQuote = () => {
    // Open quote preview in new window
    window.open(`/api/orders/${orderId}/generate-quote?validityDays=30`, '_blank');
  };

  const handleGenerateProformaInvoice = () => {
    // Open proforma invoice preview in new window
    window.open(`/api/orders/${orderId}/generate-invoice?type=proforma`, '_blank');
  };

  const handleGenerateCommercialInvoice = () => {
    // Open commercial invoice preview in new window
    window.open(`/api/orders/${orderId}/generate-invoice?type=commercial`, '_blank');
  };

  const handleGeneratePackingList = () => {
    // Open packing list preview in new window
    window.open(`/api/orders/${orderId}/generate-packing-list`, '_blank');
  };

  const handleUpdateTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/orders/${orderId}/ship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackingNumber: trackingData.trackingNumber,
          shippingLine: trackingData.shippingLine,
          containerNumber: trackingData.containerNumber,
          actualDepartureDate: trackingData.actualDepartureDate,
          estimatedArrivalDate: trackingData.estimatedArrivalDate,
          shippedBy: 'Admin',
        }),
      });

      if (response.ok) {
        setShowUpdateTracking(false);
        setTrackingData({
          trackingNumber: '',
          shippingLine: '',
          containerNumber: '',
          actualDepartureDate: '',
          estimatedArrivalDate: '',
          sendNotification: true
        });
        fetchOrder(); // Refresh order data
        alert('Tracking information updated successfully');
      } else {
        alert('Failed to update tracking information');
      }
    } catch (error) {
      console.error('Error updating tracking:', error);
      alert('Error updating tracking information');
    }
  };

  const handleSendPaymentReminder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}/payment-reminder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reminderType,
          sentBy: 'Admin',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setShowPaymentReminder(false);
        fetchOrder(); // Refresh order data
        alert(`Payment reminder sent successfully!\n\nOutstanding: ${data.outstanding.toFixed(2)}`);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to send payment reminder');
      }
    } catch (error) {
      console.error('Error sending payment reminder:', error);
      alert('Error sending payment reminder');
    }
  };

  const handleCloneOrder = async () => {
    if (!confirm('Clone this order? A new order will be created with the same details.')) {
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}/clone`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/admin/orders/${data.order.id}`);
      } else {
        alert('Failed to clone order');
      }
    } catch (error) {
      console.error('Error cloning order:', error);
      alert('Error cloning order');
    }
  };

  const handleConvertToQuote = async () => {
    if (!confirm('Convert this inquiry to a quote?')) {
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: 'Quoted' }),
      });

      if (response.ok) {
        fetchOrder(); // Refresh order data
        alert('Order converted to quote successfully');
      } else {
        alert('Failed to convert to quote');
      }
    } catch (error) {
      console.error('Error converting to quote:', error);
      alert('Error converting to quote');
    }
  };

  const handleConvertToOrder = async () => {
    if (!confirm('Convert this quote to a confirmed order?')) {
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: 'Confirmed' }),
      });

      if (response.ok) {
        fetchOrder(); // Refresh order data
        alert('Quote converted to order successfully');
      } else {
        alert('Failed to convert to order');
      }
    } catch (error) {
      console.error('Error converting to order:', error);
      alert('Error converting to order');
    }
  };

  const handleEmailDocuments = () => {
    alert('Email documents functionality will be implemented');
  };

  const handleDownloadAll = () => {
    alert('Download all as ZIP functionality will be implemented');
  };

  const handleAddCommunication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComm.summary) {
      alert('Please enter a summary');
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}/communications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComm),
      });

      if (response.ok) {
        setShowAddComm(false);
        setNewComm({
          communicationType: 'Email',
          direction: 'Outbound',
          subject: '',
          summary: '',
          fullContent: '',
          sentTo: '',
          loggedBy: ''
        });
        fetchOrder();
      } else {
        alert('Failed to add communication');
      }
    } catch (error) {
      console.error('Error adding communication:', error);
      alert('Error adding communication');
    }
  };

  const handleSendEmail = (template: string) => {
    setSelectedTemplate(template);
    setShowEmailTemplate(true);
    setNewComm({
      ...newComm,
      communicationType: 'Email',
      direction: 'Outbound',
      subject: getTemplateSubject(template),
      fullContent: getTemplateContent(template),
      sentTo: order?.clientEmail || ''
    });
  };

  const getTemplateSubject = (template: string): string => {
    const subjects: Record<string, string> = {
      'Quote': `Quotation for ${order?.orderNumber}`,
      'Order Confirmation': `Order Confirmation - ${order?.orderNumber}`,
      'Shipping Notification': `Shipping Update - ${order?.orderNumber}`,
      'Delivery Confirmation': `Delivery Confirmation - ${order?.orderNumber}`,
      'Follow-up': `Follow-up on ${order?.orderNumber}`
    };
    return subjects[template] || '';
  };

  const getTemplateContent = (template: string): string => {
    // This would be replaced with actual email templates
    return `Template content for ${template} will be loaded here...`;
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Inquiry: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      Quoted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
      Processing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      Delivered: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      Cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[status] || colors.Inquiry;
  };

  const getPaymentBadge = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-red-500/20 text-red-400',
      Partial: 'bg-yellow-500/20 text-yellow-400',
      Paid: 'bg-green-500/20 text-green-400',
    };
    return colors[status] || colors.Pending;
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      Low: 'bg-gray-500/20 text-gray-400',
      Medium: 'bg-blue-500/20 text-blue-400',
      High: 'bg-orange-500/20 text-orange-400',
      Urgent: 'bg-red-500/20 text-red-400',
    };
    return colors[priority] || colors.Medium;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Order not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/orders')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{order.orderNumber}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(order.priority)}`}>
                  {order.priority}
                </span>
              </div>
              <p className="text-gray-400 mt-1">{order.orderType} Order</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Conditional action buttons based on order status */}
            {order.orderStatus === 'Inquiry' && (
              <button
                onClick={handleConvertToQuote}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <FileCheck className="w-5 h-5" />
                Convert to Quote
              </button>
            )}
            {order.orderStatus === 'Quoted' && (
              <button
                onClick={handleConvertToOrder}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                <ShoppingCart className="w-5 h-5" />
                Confirm Order
              </button>
            )}
            <button
              onClick={handleCloneOrder}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              <Copy className="w-5 h-5" />
              Clone
            </button>
            <button
              onClick={() => router.push(`/admin/orders/${orderId}/edit`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Edit className="w-5 h-5" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl mb-6 overflow-hidden">
          <div className="flex border-b border-gray-700 overflow-x-auto">
            {['overview', 'products', 'shipping', 'payments', 'documents', 'communication', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-emerald-400 border-b-2 border-emerald-400 bg-gray-900'
                    : 'text-gray-400 hover:text-white hover:bg-gray-750'
                }`}
              >
                {tab === 'activity' ? 'Activity Log' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
            {/* Client Information */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Client Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Client Name</label>
                  <p className="text-white font-medium">{order.clientName}</p>
                </div>
                {order.clientEmail && (
                  <div>
                    <label className="text-sm text-gray-400 flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <a href={`mailto:${order.clientEmail}`} className="text-emerald-400 hover:text-emerald-300">
                      {order.clientEmail}
                    </a>
                  </div>
                )}
                {order.clientPhone && (
                  <div>
                    <label className="text-sm text-gray-400 flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      Phone
                    </label>
                    <a href={`tel:${order.clientPhone}`} className="text-emerald-400 hover:text-emerald-300">
                      {order.clientPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Products */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-orange-400" />
                <h2 className="text-lg font-semibold text-white">Products</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-700">
                    <tr>
                      <th className="text-left py-3 text-sm font-medium text-gray-400">Product</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-400">Quantity</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-400">Unit Price</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-400">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {order.lineItems.map((item) => (
                      <tr key={item.id}>
                        <td className="py-3">
                          <div className="text-white font-medium">{item.productName}</div>
                          {item.productCode && (
                            <div className="text-sm text-gray-400">{item.productCode}</div>
                          )}
                        </td>
                        <td className="py-3 text-right text-white">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="py-3 text-right text-white">
                          {order.currency} {item.unitPrice.toFixed(2)}
                        </td>
                        <td className="py-3 text-right text-white font-medium">
                          {order.currency} {item.totalPrice.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="mt-6 pt-4 border-t border-gray-700 space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>{order.currency} {order.subtotal.toFixed(2)}</span>
                </div>
                {order.taxAmount > 0 && (
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span>{order.currency} {order.taxAmount.toFixed(2)}</span>
                  </div>
                )}
                {order.shippingCost > 0 && (
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>{order.currency} {order.shippingCost.toFixed(2)}</span>
                  </div>
                )}
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-red-400">
                    <span>Discount</span>
                    <span>-{order.currency} {order.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-gray-700">
                  <span>Total</span>
                  <span>{order.currency} {order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-semibold text-white">Internal Notes</h2>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{order.notes}</p>
              </div>
            )}

            {/* Progress Timeline */}
            <OrderProgressTimeline order={order} onUpdate={fetchOrder} />
              </>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-orange-400" />
                  <h2 className="text-lg font-semibold text-white">Order Products</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-700">
                      <tr>
                        <th className="text-left py-3 text-sm font-medium text-gray-400">Product</th>
                        <th className="text-right py-3 text-sm font-medium text-gray-400">Quantity</th>
                        <th className="text-right py-3 text-sm font-medium text-gray-400">Unit Price</th>
                        <th className="text-right py-3 text-sm font-medium text-gray-400">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {order.lineItems.map((item) => (
                        <tr key={item.id}>
                          <td className="py-3">
                            <div className="text-white font-medium">{item.productName}</div>
                            {item.productCode && (
                              <div className="text-sm text-gray-400">{item.productCode}</div>
                            )}
                          </td>
                          <td className="py-3 text-right text-white">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="py-3 text-right text-white">
                            {order.currency} {item.unitPrice.toFixed(2)}
                          </td>
                          <td className="py-3 text-right text-white font-medium">
                            {order.currency} {item.totalPrice.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Shipping Tab */}
            {activeTab === 'shipping' && (
              <>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">Shipping Details</h2>
                  </div>
                  <button
                    onClick={() => setShowUpdateTracking(true)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium"
                  >
                    Update Tracking
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Incoterm */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Incoterm</label>
                    <p className="text-white font-medium">
                      {order.incoterm || <span className="text-gray-500">Not specified</span>}
                    </p>
                  </div>

                  {/* Shipping Method */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Shipping Method</label>
                    <p className="text-white font-medium">
                      {order.shippingMethod || <span className="text-gray-500">Not specified</span>}
                    </p>
                  </div>

                  {/* Port of Loading */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Port of Loading</label>
                    <p className="text-white font-medium">
                      {order.portOfLoading || <span className="text-gray-500">Not specified</span>}
                    </p>
                  </div>

                  {/* Port of Discharge */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Port of Discharge</label>
                    <p className="text-white font-medium">
                      {order.portOfDischarge || <span className="text-gray-500">Not specified</span>}
                    </p>
                  </div>

                  {/* Shipping Line */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Shipping Line</label>
                    <p className="text-white font-medium">
                      {order.shippingLine || <span className="text-gray-500">Not specified</span>}
                    </p>
                  </div>

                  {/* Container Number */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Container Number</label>
                    <p className="text-white font-medium">
                      {order.containerNumber || <span className="text-gray-500">Not assigned</span>}
                    </p>
                  </div>

                  {/* BL/AWB Number */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">BL/AWB Number</label>
                    <p className="text-white font-medium">
                      {order.blNumber || order.awbNumber || <span className="text-gray-500">Not assigned</span>}
                    </p>
                  </div>

                  {/* Tracking Number */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Tracking Number</label>
                    {order.trackingNumber ? (
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium">{order.trackingNumber}</p>
                        {(() => {
                          const carrier = order.shippingLine || detectCarrier(order.trackingNumber);
                          const trackingUrl = getTrackingUrl(carrier, order.trackingNumber);
                          return trackingUrl ? (
                            <a
                              href={trackingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Track Live
                            </a>
                          ) : null;
                        })()}
                      </div>
                    ) : (
                      <p className="text-gray-500">Not available yet</p>
                    )}
                  </div>

                  {/* Shipping Cost */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Shipping Cost</label>
                    <p className="text-white font-medium">
                      {order.currency} {order.shippingCost.toFixed(2)}
                    </p>
                  </div>

                  {/* Expected Delivery */}
                  {order.expectedDeliveryDate && (
                    <div>
                      <label className="text-sm text-gray-400 block mb-1">Expected Delivery</label>
                      <p className="text-white font-medium">
                        {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline Card */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mt-6">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-semibold text-white">Shipping Timeline</h2>
                </div>
                
                <div className="space-y-4">
                  {/* Timeline visualization */}
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
                    
                    {/* Estimated Departure */}
                    <div className="relative flex gap-4 pb-6">
                      <div className="relative z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          order.actualDepartureDate 
                            ? 'bg-green-500' 
                            : order.estimatedDepartureDate 
                            ? 'bg-blue-500' 
                            : 'bg-gray-600'
                        }`}>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-white font-medium mb-1">Departure</h3>
                        <div className="space-y-1">
                          {order.estimatedDepartureDate && (
                            <p className="text-sm text-gray-400">
                              Estimated: {new Date(order.estimatedDepartureDate).toLocaleDateString()}
                            </p>
                          )}
                          {order.actualDepartureDate ? (
                            <p className="text-sm text-green-400 font-medium">
                              Actual: {new Date(order.actualDepartureDate).toLocaleDateString()}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500">Not departed yet</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* In Transit Status */}
                    {order.actualDepartureDate && !order.actualArrivalDate && (
                      <div className="relative flex gap-4 pb-6">
                        <div className="relative z-10">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-500 animate-pulse">
                            <Truck className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <h3 className="text-white font-medium mb-1">In Transit</h3>
                          <p className="text-sm text-yellow-400">Shipment is on the way</p>
                          {order.trackingNumber && (
                            <a
                              href={`https://www.track-trace.com/track?tn=${order.trackingNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-emerald-400 hover:text-emerald-300 underline mt-1 inline-block"
                            >
                              Track current location →
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Estimated Arrival */}
                    <div className="relative flex gap-4">
                      <div className="relative z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          order.actualArrivalDate 
                            ? 'bg-green-500' 
                            : order.estimatedArrivalDate 
                            ? 'bg-blue-500' 
                            : 'bg-gray-600'
                        }`}>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-white font-medium mb-1">Arrival</h3>
                        <div className="space-y-1">
                          {order.estimatedArrivalDate && (
                            <p className="text-sm text-gray-400">
                              Estimated: {new Date(order.estimatedArrivalDate).toLocaleDateString()}
                            </p>
                          )}
                          {order.actualArrivalDate ? (
                            <p className="text-sm text-green-400 font-medium">
                              Actual: {new Date(order.actualArrivalDate).toLocaleDateString()}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500">Not arrived yet</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Packaging Details Card */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mt-6">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-orange-400" />
                  <h2 className="text-lg font-semibold text-white">Packaging Details</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Number of Packages */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Number of Packages</label>
                    <p className="text-white font-medium">
                      {order.numberOfPackages || <span className="text-gray-500">Not specified</span>}
                    </p>
                  </div>

                  {/* Package Type */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Package Type</label>
                    <p className="text-white font-medium">
                      {order.packageType || <span className="text-gray-500">Not specified</span>}
                    </p>
                  </div>

                  {/* Gross Weight */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Gross Weight</label>
                    <p className="text-white font-medium">
                      {order.grossWeight ? (
                        `${order.grossWeight} ${order.weightUnit || 'kg'}`
                      ) : (
                        <span className="text-gray-500">Not specified</span>
                      )}
                    </p>
                  </div>

                  {/* Net Weight */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Net Weight</label>
                    <p className="text-white font-medium">
                      {order.netWeight ? (
                        `${order.netWeight} ${order.weightUnit || 'kg'}`
                      ) : (
                        <span className="text-gray-500">Not specified</span>
                      )}
                    </p>
                  </div>

                  {/* Dimensions */}
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Dimensions</label>
                    <p className="text-white font-medium">
                      {order.dimensions ? (
                        (() => {
                          try {
                            const dims = JSON.parse(order.dimensions);
                            return `${dims.length} × ${dims.width} × ${dims.height} ${dims.unit || 'cm'}`;
                          } catch {
                            return order.dimensions;
                          }
                        })()
                      ) : (
                        <span className="text-gray-500">Not specified</span>
                      )}
                    </p>
                  </div>

                  {/* Special Handling */}
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-400 block mb-1">Special Handling Instructions</label>
                    <p className="text-white font-medium">
                      {order.specialHandling || <span className="text-gray-500">None</span>}
                    </p>
                  </div>
                </div>
              </div>

              {/* Update Tracking Modal */}
              {showUpdateTracking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <h3 className="text-xl font-bold text-white mb-4">Update Tracking Information</h3>
                    <form onSubmit={handleUpdateTracking} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Tracking Number</label>
                          <input
                            type="text"
                            value={trackingData.trackingNumber}
                            onChange={(e) => setTrackingData({ ...trackingData, trackingNumber: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                            placeholder="e.g., MAEU123456789"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Shipping Line / Carrier</label>
                          <select
                            value={trackingData.shippingLine}
                            onChange={(e) => setTrackingData({ ...trackingData, shippingLine: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                          >
                            <option value="">Select carrier...</option>
                            {carriers.map((carrier) => (
                              <option key={carrier.code} value={carrier.code}>
                                {carrier.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Container Number</label>
                          <input
                            type="text"
                            value={trackingData.containerNumber}
                            onChange={(e) => setTrackingData({ ...trackingData, containerNumber: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                            placeholder="e.g., ABCD1234567"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Actual Departure Date</label>
                          <input
                            type="date"
                            value={trackingData.actualDepartureDate}
                            onChange={(e) => setTrackingData({ ...trackingData, actualDepartureDate: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Estimated Arrival Date</label>
                          <input
                            type="date"
                            value={trackingData.estimatedArrivalDate}
                            onChange={(e) => setTrackingData({ ...trackingData, estimatedArrivalDate: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="sendNotification"
                          checked={trackingData.sendNotification}
                          onChange={(e) => setTrackingData({ ...trackingData, sendNotification: e.target.checked })}
                          className="rounded border-gray-600 bg-gray-900 text-emerald-600 focus:ring-emerald-500"
                        />
                        <label htmlFor="sendNotification" className="text-sm text-gray-400">
                          Send tracking notification email to client
                        </label>
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowUpdateTracking(false)}
                          className="px-4 py-2 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                        >
                          Update Tracking
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              </>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <>
              {/* Payment Schedule */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <h2 className="text-lg font-semibold text-white">Payment Schedule</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    {order.paymentStatus !== 'Paid' && calculateOutstanding() > 0 && (
                      <button
                        onClick={() => setShowPaymentReminder(true)}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium"
                      >
                        Send Reminder
                      </button>
                    )}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentBadge(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Advance Payment */}
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <h3 className="text-white font-medium mb-3">Advance Payment</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Amount</span>
                        <span className="text-white font-medium">
                          {order.advanceAmount ? `${order.currency} ${order.advanceAmount.toFixed(2)}` : 'Not set'}
                        </span>
                      </div>
                      {order.advancePercentage && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Percentage</span>
                          <span className="text-white">{order.advancePercentage}%</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Status</span>
                        <span className={`text-sm font-medium ${order.advanceReceivedDate ? 'text-green-400' : 'text-yellow-400'}`}>
                          {order.advanceReceivedDate ? 'Received' : 'Pending'}
                        </span>
                      </div>
                      {order.advanceReceivedDate && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Received on</span>
                          <span className="text-white text-sm">
                            {new Date(order.advanceReceivedDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Balance Payment */}
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <h3 className="text-white font-medium mb-3">Balance Payment</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Amount</span>
                        <span className="text-white font-medium">
                          {order.balanceAmount ? `${order.currency} ${order.balanceAmount.toFixed(2)}` : 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Status</span>
                        <span className={`text-sm font-medium ${order.balanceReceivedDate ? 'text-green-400' : 'text-yellow-400'}`}>
                          {order.balanceReceivedDate ? 'Received' : 'Pending'}
                        </span>
                      </div>
                      {order.balanceReceivedDate && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Received on</span>
                          <span className="text-white text-sm">
                            {new Date(order.balanceReceivedDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Outstanding Balance */}
                <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Outstanding Balance</span>
                    <span className="text-2xl font-bold text-red-400">
                      {order.currency} {calculateOutstanding().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">Payment History</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAddPayment(true)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium"
                    >
                      + Add Payment
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                      Send Reminder
                    </button>
                  </div>
                </div>

                {/* Add Payment Form */}
                {showAddPayment && (
                  <form onSubmit={handleAddPayment} className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <h3 className="text-white font-medium mb-4">Record New Payment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Amount *</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newPayment.amount}
                          onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Payment Method *</label>
                        <select
                          value={newPayment.paymentMethod}
                          onChange={(e) => setNewPayment({...newPayment, paymentMethod: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        >
                          <option>Bank Transfer</option>
                          <option>Credit Card</option>
                          <option>PayPal</option>
                          <option>Cash</option>
                          <option>Cheque</option>
                          <option>Wire Transfer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Reference Number</label>
                        <input
                          type="text"
                          value={newPayment.referenceNumber}
                          onChange={(e) => setNewPayment({...newPayment, referenceNumber: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Received By</label>
                        <input
                          type="text"
                          value={newPayment.receivedBy}
                          onChange={(e) => setNewPayment({...newPayment, receivedBy: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-1">Notes</label>
                        <textarea
                          value={newPayment.notes}
                          onChange={(e) => setNewPayment({...newPayment, notes: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                          rows={2}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm">
                        Save Payment
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddPayment(false)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Payment History Table */}
                {order.paymentHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-gray-700">
                        <tr>
                          <th className="text-left py-3 text-sm font-medium text-gray-400">Date</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-400">Amount</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-400">Method</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-400">Reference</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-400">Received By</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-400">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {order.paymentHistory.map((payment) => (
                          <tr key={payment.id}>
                            <td className="py-3 text-white">
                              {new Date(payment.paymentDate).toLocaleDateString()}
                            </td>
                            <td className="py-3 text-white font-medium">
                              {order.currency} {payment.amount.toFixed(2)}
                            </td>
                            <td className="py-3 text-gray-300">{payment.paymentMethod}</td>
                            <td className="py-3 text-gray-300">
                              {payment.referenceNumber || <span className="text-gray-500">-</span>}
                            </td>
                            <td className="py-3 text-gray-300">
                              {payment.receivedBy || <span className="text-gray-500">-</span>}
                            </td>
                            <td className="py-3 text-gray-300 max-w-xs truncate">
                              {payment.notes || <span className="text-gray-500">-</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-4 p-3 bg-gray-900 rounded-lg flex justify-between items-center">
                      <span className="text-gray-400">Total Paid</span>
                      <span className="text-xl font-bold text-green-400">
                        {order.currency} {order.paymentHistory.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No payments recorded yet</p>
                  </div>
                )}
              </div>
              {/* Payment Reminder Modal */}
              {showPaymentReminder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
                    <h3 className="text-xl font-bold text-white mb-4">Send Payment Reminder</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Reminder Type</label>
                        <select
                          value={reminderType}
                          onChange={(e) => setReminderType(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="gentle">Gentle Reminder</option>
                          <option value="urgent">Urgent Reminder</option>
                          <option value="final">Final Notice</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                          {reminderType === 'gentle' && 'Polite reminder for upcoming or recent due date'}
                          {reminderType === 'urgent' && 'Firm reminder for overdue payment'}
                          {reminderType === 'final' && 'Final warning before legal action'}
                        </p>
                      </div>

                      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                        <h4 className="text-sm font-medium text-white mb-2">Payment Summary</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Amount:</span>
                            <span className="text-white font-medium">{order.currency} {order.totalAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Amount Paid:</span>
                            <span className="text-green-400">
                              {order.currency} {(order.totalAmount - calculateOutstanding()).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-700">
                            <span className="text-gray-400 font-medium">Outstanding:</span>
                            <span className="text-amber-400 font-bold">
                              {order.currency} {calculateOutstanding().toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3">
                        <p className="text-xs text-amber-200">
                          <strong>Note:</strong> The reminder email will be sent to {order.clientEmail || 'the client'} and logged in communications.
                        </p>
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowPaymentReminder(false)}
                          className="px-4 py-2 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSendPaymentReminder}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
                        >
                          Send Reminder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <h2 className="text-lg font-semibold text-white">Document Checklist</h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleGenerateQuote}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium"
                    >
                      Generate Quote
                    </button>
                    <button
                      onClick={handleGenerateProformaInvoice}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium"
                    >
                      Proforma Invoice
                    </button>
                    <button
                      onClick={handleGenerateCommercialInvoice}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium"
                    >
                      Commercial Invoice
                    </button>
                    <button
                      onClick={handleGeneratePackingList}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                    >
                      Generate Packing List
                    </button>
                  </div>
                </div>

                {/* Document Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Proforma Invoice */}
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <h3 className="text-white font-medium">Proforma Invoice</h3>
                      </div>
                      {order.proformaInvoiceUrl ? (
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Uploaded</span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">Missing</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      {order.proformaInvoiceUrl ? (
                        <>
                          <a
                            href={order.proformaInvoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm text-center"
                          >
                            View
                          </a>
                          <a
                            href={order.proformaInvoiceUrl}
                            download
                            className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm text-center"
                          >
                            Download
                          </a>
                        </>
                      ) : (
                        <label className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm text-center cursor-pointer">
                          Upload
                          <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('proformaInvoice', e.target.files[0])} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Commercial Invoice */}
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-400" />
                        <h3 className="text-white font-medium">Commercial Invoice</h3>
                      </div>
                      {order.commercialInvoiceUrl ? (
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Uploaded</span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">Missing</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      {order.commercialInvoiceUrl ? (
                        <>
                          <a
                            href={order.commercialInvoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm text-center"
                          >
                            View
                          </a>
                          <a
                            href={order.commercialInvoiceUrl}
                            download
                            className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm text-center"
                          >
                            Download
                          </a>
                        </>
                      ) : (
                        <label className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm text-center cursor-pointer">
                          Upload
                          <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('commercialInvoice', e.target.files[0])} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Packing List */}
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-orange-400" />
                        <h3 className="text-white font-medium">Packing List</h3>
                      </div>
                      {order.packingListUrl ? (
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Uploaded</span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">Missing</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      {order.packingListUrl ? (
                        <>
                          <a
                            href={order.packingListUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm text-center"
                          >
                            View
                          </a>
                          <a
                            href={order.packingListUrl}
                            download
                            className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm text-center"
                          >
                            Download
                          </a>
                        </>
                      ) : (
                        <label className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm text-center cursor-pointer">
                          Upload
                          <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('packingList', e.target.files[0])} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Certificate of Origin */}
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <h3 className="text-white font-medium">Certificate of Origin</h3>
                      </div>
                      {order.certificateOfOriginUrl ? (
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Uploaded</span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">Missing</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      {order.certificateOfOriginUrl ? (
                        <>
                          <a
                            href={order.certificateOfOriginUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm text-center"
                          >
                            View
                          </a>
                          <a
                            href={order.certificateOfOriginUrl}
                            download
                            className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm text-center"
                          >
                            Download
                          </a>
                        </>
                      ) : (
                        <label className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm text-center cursor-pointer">
                          Upload
                          <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('certificateOfOrigin', e.target.files[0])} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Phytosanitary Certificate */}
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-white font-medium">Phytosanitary Certificate</h3>
                      </div>
                      {order.phytosanitaryCertificateUrl ? (
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Uploaded</span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">Missing</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      {order.phytosanitaryCertificateUrl ? (
                        <>
                          <a
                            href={order.phytosanitaryCertificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm text-center"
                          >
                            View
                          </a>
                          <a
                            href={order.phytosanitaryCertificateUrl}
                            download
                            className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm text-center"
                          >
                            Download
                          </a>
                        </>
                      ) : (
                        <label className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm text-center cursor-pointer">
                          Upload
                          <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('phytosanitaryCertificate', e.target.files[0])} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Bill of Lading */}
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-white font-medium">Bill of Lading</h3>
                      </div>
                      {order.billOfLadingUrl ? (
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Uploaded</span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">Missing</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      {order.billOfLadingUrl ? (
                        <>
                          <a
                            href={order.billOfLadingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm text-center"
                          >
                            View
                          </a>
                          <a
                            href={order.billOfLadingUrl}
                            download
                            className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm text-center"
                          >
                            Download
                          </a>
                        </>
                      ) : (
                        <label className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm text-center cursor-pointer">
                          Upload
                          <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('billOfLading', e.target.files[0])} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Insurance Certificate */}
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-red-400" />
                        <h3 className="text-white font-medium">Insurance Certificate</h3>
                      </div>
                      {order.insuranceCertificateUrl ? (
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Uploaded</span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">Missing</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      {order.insuranceCertificateUrl ? (
                        <>
                          <a
                            href={order.insuranceCertificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm text-center"
                          >
                            View
                          </a>
                          <a
                            href={order.insuranceCertificateUrl}
                            download
                            className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm text-center"
                          >
                            Download
                          </a>
                        </>
                      ) : (
                        <label className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm text-center cursor-pointer">
                          Upload
                          <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('insuranceCertificate', e.target.files[0])} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Other Documents */}
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <h3 className="text-white font-medium">Other Documents</h3>
                      </div>
                      {order.otherDocuments && JSON.parse(order.otherDocuments).length > 0 ? (
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                          {JSON.parse(order.otherDocuments).length} file(s)
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">None</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <label className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm text-center cursor-pointer">
                        Upload
                        <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('other', e.target.files[0])} />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3 justify-end">
                  <button
                    onClick={handleEmailDocuments}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email to Client
                  </button>
                  <button
                    onClick={handleDownloadAll}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Download All as ZIP
                  </button>
                </div>
              </div>
              </>
            )}

            {/* Communication Tab */}
            {activeTab === 'communication' && (
              <>
              {/* Email Templates */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-semibold text-white">Email Templates</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  <button
                    onClick={() => handleSendEmail('Quote')}
                    className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                  >
                    Quote Email
                  </button>
                  <button
                    onClick={() => handleSendEmail('Order Confirmation')}
                    className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"
                  >
                    Order Confirmation
                  </button>
                  <button
                    onClick={() => handleSendEmail('Shipping Notification')}
                    className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium"
                  >
                    Shipping Notification
                  </button>
                  <button
                    onClick={() => handleSendEmail('Delivery Confirmation')}
                    className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium"
                  >
                    Delivery Confirmation
                  </button>
                  <button
                    onClick={() => handleSendEmail('Follow-up')}
                    className="px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium"
                  >
                    Follow-up Email
                  </button>
                </div>
              </div>

              {/* Communication Log */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-lg font-semibold text-white">Communication Log</h2>
                  </div>
                  <button
                    onClick={() => setShowAddComm(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium"
                  >
                    + Log Communication
                  </button>
                </div>

                {/* Add Communication Form */}
                {(showAddComm || showEmailTemplate) && (
                  <form onSubmit={handleAddCommunication} className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <h3 className="text-white font-medium mb-4">
                      {showEmailTemplate ? `Send ${selectedTemplate}` : 'Log New Communication'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Type *</label>
                        <select
                          value={newComm.communicationType}
                          onChange={(e) => setNewComm({...newComm, communicationType: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        >
                          <option>Email</option>
                          <option>Phone</option>
                          <option>WhatsApp</option>
                          <option>Meeting</option>
                          <option>Video Call</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Direction *</label>
                        <select
                          value={newComm.direction}
                          onChange={(e) => setNewComm({...newComm, direction: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        >
                          <option>Outbound</option>
                          <option>Inbound</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Subject</label>
                        <input
                          type="text"
                          value={newComm.subject}
                          onChange={(e) => setNewComm({...newComm, subject: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Sent To / From</label>
                        <input
                          type="text"
                          value={newComm.sentTo}
                          onChange={(e) => setNewComm({...newComm, sentTo: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                          placeholder={order?.clientEmail || ''}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-1">Summary *</label>
                        <input
                          type="text"
                          value={newComm.summary}
                          onChange={(e) => setNewComm({...newComm, summary: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-1">Full Message</label>
                        <textarea
                          value={newComm.fullContent}
                          onChange={(e) => setNewComm({...newComm, fullContent: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                          rows={6}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Logged By</label>
                        <input
                          type="text"
                          value={newComm.loggedBy}
                          onChange={(e) => setNewComm({...newComm, loggedBy: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm">
                        {showEmailTemplate ? 'Send & Log' : 'Save Communication'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddComm(false);
                          setShowEmailTemplate(false);
                        }}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Communication List */}
                {order.communications.length > 0 ? (
                  <div className="space-y-3">
                    {order.communications.map((comm) => (
                      <div key={comm.id} className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                comm.communicationType === 'Email' ? 'bg-blue-500/20' :
                                comm.communicationType === 'Phone' ? 'bg-green-500/20' :
                                comm.communicationType === 'WhatsApp' ? 'bg-emerald-500/20' :
                                comm.communicationType === 'Meeting' ? 'bg-purple-500/20' :
                                'bg-gray-500/20'
                              }`}>
                                <Mail className={`w-4 h-4 ${
                                  comm.communicationType === 'Email' ? 'text-blue-400' :
                                  comm.communicationType === 'Phone' ? 'text-green-400' :
                                  comm.communicationType === 'WhatsApp' ? 'text-emerald-400' :
                                  comm.communicationType === 'Meeting' ? 'text-purple-400' :
                                  'text-gray-400'
                                }`} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-medium">{comm.communicationType}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded ${
                                    comm.direction === 'Outbound' 
                                      ? 'bg-blue-500/20 text-blue-400' 
                                      : 'bg-green-500/20 text-green-400'
                                  }`}>
                                    {comm.direction}
                                  </span>
                                  {comm.emailTemplate && (
                                    <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                                      {comm.emailTemplate}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-400">
                                  {new Date(comm.dateTime).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {comm.subject && (
                            <p className="text-white font-medium mb-1">{comm.subject}</p>
                          )}
                          <p className="text-gray-300 text-sm mb-2">{comm.summary}</p>
                          
                          {comm.sentTo && (
                            <p className="text-xs text-gray-400 mb-2">To/From: {comm.sentTo}</p>
                          )}

                          {comm.fullContent && (
                            <>
                              <button
                                onClick={() => setExpandedComm(expandedComm === comm.id ? null : comm.id)}
                                className="text-sm text-emerald-400 hover:text-emerald-300 mb-2"
                              >
                                {expandedComm === comm.id ? 'Hide full message' : 'Show full message'}
                              </button>
                              {expandedComm === comm.id && (
                                <div className="mt-2 p-3 bg-gray-800 rounded border border-gray-700">
                                  <p className="text-sm text-gray-300 whitespace-pre-wrap">{comm.fullContent}</p>
                                </div>
                              )}
                            </>
                          )}

                          {comm.loggedBy && (
                            <p className="text-xs text-gray-500 mt-2">Logged by: {comm.loggedBy}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Mail className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No communications logged yet</p>
                  </div>
                )}
              </div>
              </>
            )}

            {/* Activity Log Tab */}
            {activeTab === 'activity' && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-lg font-semibold text-white">Activity Log</h2>
                </div>

                {order.activityLogs.length > 0 || order.orderDate ? (
                  <div className="space-y-3">
                    {/* Activity Timeline */}
                    <div className="relative">
                      <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-700"></div>
                      
                      {/* Activity Log Entries */}
                      {order.activityLogs.map((log) => (
                        <div key={log.id} className="relative flex gap-4 pb-6">
                          <div className="relative z-10">
                            <div className={`w-4 h-4 rounded-full mt-1 ${
                              log.actionType === 'Status Changed' ? 'bg-blue-500' :
                              log.actionType === 'Payment Added' ? 'bg-green-500' :
                              log.actionType === 'Document Uploaded' ? 'bg-purple-500' :
                              log.actionType === 'Product Modified' ? 'bg-orange-500' :
                              log.actionType === 'Order Updated' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`}></div>
                          </div>
                          <div className="flex-1 bg-gray-900 rounded-lg p-4 border border-gray-700">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded font-medium ${
                                  log.actionType === 'Status Changed' ? 'bg-blue-500/20 text-blue-400' :
                                  log.actionType === 'Payment Added' ? 'bg-green-500/20 text-green-400' :
                                  log.actionType === 'Document Uploaded' ? 'bg-purple-500/20 text-purple-400' :
                                  log.actionType === 'Product Modified' ? 'bg-orange-500/20 text-orange-400' :
                                  log.actionType === 'Order Updated' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-gray-500/20 text-gray-400'
                                }`}>
                                  {log.actionType}
                                </span>
                              </div>
                              <span className="text-xs text-gray-400">
                                {new Date(log.timestamp).toLocaleString()}
                              </span>
                            </div>
                            
                            <p className="text-white text-sm mb-2">{log.description}</p>
                            
                            {(log.oldValue || log.newValue) && (
                              <div className="mt-3 p-3 bg-gray-800 rounded border border-gray-700">
                                <p className="text-xs text-gray-400 mb-2">
                                  {log.fieldName && <span className="font-medium">Field: {log.fieldName}</span>}
                                </p>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                  {log.oldValue && (
                                    <div>
                                      <p className="text-gray-500 mb-1">Before:</p>
                                      <p className="text-red-400 font-mono">{log.oldValue}</p>
                                    </div>
                                  )}
                                  {log.newValue && (
                                    <div>
                                      <p className="text-gray-500 mb-1">After:</p>
                                      <p className="text-green-400 font-mono">{log.newValue}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            <p className="text-xs text-gray-500 mt-3">
                              By: {log.performedBy}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Order Created Entry */}
                      <div className="relative flex gap-4">
                        <div className="relative z-10">
                          <div className="w-4 h-4 rounded-full bg-emerald-500 mt-1"></div>
                        </div>
                        <div className="flex-1 bg-gray-900 rounded-lg p-4 border border-gray-700">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-xs px-2 py-1 rounded font-medium bg-emerald-500/20 text-emerald-400">
                              Order Created
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(order.orderDate).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-white text-sm">
                            Order {order.orderNumber} was created
                          </p>
                          {order.createdBy && (
                            <p className="text-xs text-gray-500 mt-3">
                              By: {order.createdBy}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No activity logged yet</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">Order Summary</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Order Date</label>
                  <p className="text-white">{new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                {order.expectedDeliveryDate && (
                  <div>
                    <label className="text-sm text-gray-400">Expected Delivery</label>
                    <p className="text-white">{new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-400">Order Type</label>
                  <p className="text-white">{order.orderType}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Priority</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(order.priority)}`}>
                    {order.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold text-white">Payment</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Total Amount</label>
                  <p className="text-2xl font-bold text-white">
                    {order.currency} {order.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Payment Status</label>
                  <div className="mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentBadge(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
                {order.paymentTerms && (
                  <div>
                    <label className="text-sm text-gray-400">Payment Terms</label>
                    <p className="text-white text-sm">{order.paymentTerms}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm text-left">
                  Update Status
                </button>
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm text-left">
                  Record Payment
                </button>
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm text-left">
                  Send Email
                </button>
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm text-left">
                  Generate Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
