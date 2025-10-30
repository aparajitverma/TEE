'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, Edit, Trash2, User, Phone, Mail, MapPin, 
  Building, DollarSign, TrendingUp, Calendar, Flame, Package, Eye, Users, UserPlus
} from 'lucide-react';
import CommunicationLog from '@/components/CommunicationLog';
import DocumentManager from '@/components/DocumentManager';
import NoteManager from '@/components/NoteManager';
import ActivityLog from '@/components/ActivityLog';
import LeadScoring from '@/components/LeadScoring';
import LeadAssignment from '@/components/LeadAssignment';

interface Client {
  id: number;
  clientCode: string;
  clientType: string;
  companyName: string;
  contactPerson: string;
  designation: string | null;
  status: string;
  leadScore: number | null;
  emailPrimary: string;
  emailSecondary: string | null;
  phonePrimary: string;
  phoneSecondary: string | null;
  whatsapp: string | null;
  website: string | null;
  linkedin: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  stateProvince: string | null;
  country: string | null;
  postalCode: string | null;
  industry: string | null;
  companySize: string | null;
  taxId: string | null;
  paymentTermsPreferred: string | null;
  creditLimit: number | null;
  currencyPreferred: string | null;
  leadSource: string | null;
  leadStatus: string | null;
  leadTemperature: string | null;
  probabilityToClose: number | null;
  expectedOrderValue: number | null;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  firstOrderDate: string | null;
  lastOrderDate: string | null;
  daysSinceLastOrder: number | null;
  outstandingBalance: number;
  paymentReliabilityScore: number | null;
  lastContactDate: string | null;
  lastContactType: string | null;
  totalInteractions: number;
  nextFollowUpDate: string | null;
  followUpNotes: string | null;
  responseRate: number | null;
  decisionMakers: string | null;
  notes: string | null;
  productsInterestedIn: string | null;
  preferredPackaging: string | null;
  certificationsRequired: string | null;
  typicalOrderQuantity: string | null;
  orderFrequency: string | null;
}

export default function ClientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<Client | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    fetchClient();
    fetchOrders();
  }, [clientId]);

  const fetchClient = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}`);
      const data = await response.json();
      
      if (data.client) {
        setClient(data.client);
      }
    } catch (error) {
      console.error('Error fetching client:', error);
      alert('Failed to load client');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      
      if (data.orders && client) {
        // Filter orders for this client
        const clientOrders = data.orders.filter((order: any) => 
          order.clientName.toLowerCase() === client.companyName.toLowerCase()
        );
        setOrders(clientOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/clients/${clientId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/clients');
      } else {
        alert('Failed to delete client');
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Error deleting client');
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      'Lead': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Prospect': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Active Client': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Inactive Client': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return colors[type] || colors['Lead'];
  };

  const getTemperatureBadge = (temp: string | null) => {
    if (!temp) return '';
    const colors: Record<string, string> = {
      'Hot': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Warm': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Cold': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    };
    return colors[temp] || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading client...</div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Client not found</div>
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
              onClick={() => router.push('/admin/clients')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{client.companyName}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeBadge(client.clientType)}`}>
                  {client.clientType}
                </span>
                {client.leadTemperature && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTemperatureBadge(client.leadTemperature)}`}>
                    <Flame className="w-3 h-3 inline mr-1" />
                    {client.leadTemperature}
                  </span>
                )}
              </div>
              <p className="text-gray-400 mt-1">{client.clientCode}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {(client.clientType === 'Lead' || client.clientType === 'Prospect') && (
              <button
                onClick={() => setShowAssignModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                <UserPlus className="w-5 h-5" />
                Assign Lead
              </button>
            )}
            <button
              onClick={() => router.push(`/admin/clients/${clientId}/edit`)}
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
        <div className="bg-gray-800 border border-gray-700 rounded-xl mb-6">
          <div className="flex items-center gap-1 p-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('communications')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'communications'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Communications
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'documents'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'notes'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Notes
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'activity'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Activity Log
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
            {/* Contact Information */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Contact Person</label>
                  <p className="text-white font-medium">{client.contactPerson}</p>
                  {client.designation && (
                    <p className="text-sm text-gray-400">{client.designation}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <a href={`mailto:${client.emailPrimary}`} className="text-emerald-400 hover:text-emerald-300">
                    {client.emailPrimary}
                  </a>
                  {client.emailSecondary && (
                    <a href={`mailto:${client.emailSecondary}`} className="block text-sm text-emerald-400 hover:text-emerald-300">
                      {client.emailSecondary}
                    </a>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  <a href={`tel:${client.phonePrimary}`} className="text-emerald-400 hover:text-emerald-300">
                    {client.phonePrimary}
                  </a>
                  {client.phoneSecondary && (
                    <a href={`tel:${client.phoneSecondary}`} className="block text-sm text-emerald-400 hover:text-emerald-300">
                      {client.phoneSecondary}
                    </a>
                  )}
                </div>
                {client.whatsapp && (
                  <div>
                    <label className="text-sm text-gray-400">WhatsApp</label>
                    <a href={`https://wa.me/${client.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                      {client.whatsapp}
                    </a>
                  </div>
                )}
                {client.website && (
                  <div>
                    <label className="text-sm text-gray-400">Website</label>
                    <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 block truncate">
                      {client.website}
                    </a>
                  </div>
                )}
                {client.linkedin && (
                  <div>
                    <label className="text-sm text-gray-400">LinkedIn</label>
                    <a href={client.linkedin} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 block truncate">
                      View Profile
                    </a>
                  </div>
                )}
              </div>
              
              {(client.addressLine1 || client.city || client.country) && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <label className="text-sm text-gray-400 flex items-center gap-1 mb-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  <div className="text-white">
                    {client.addressLine1 && <p>{client.addressLine1}</p>}
                    {client.addressLine2 && <p>{client.addressLine2}</p>}
                    <p>
                      {[client.city, client.stateProvince, client.postalCode].filter(Boolean).join(', ')}
                    </p>
                    {client.country && <p>{client.country}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Business Details */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">Business Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {client.industry && (
                  <div>
                    <label className="text-sm text-gray-400">Industry</label>
                    <p className="text-white">{client.industry}</p>
                  </div>
                )}
                {client.companySize && (
                  <div>
                    <label className="text-sm text-gray-400">Company Size</label>
                    <p className="text-white">{client.companySize}</p>
                  </div>
                )}
                {client.taxId && (
                  <div>
                    <label className="text-sm text-gray-400">Tax ID</label>
                    <p className="text-white">{client.taxId}</p>
                  </div>
                )}
                {client.paymentTermsPreferred && (
                  <div>
                    <label className="text-sm text-gray-400">Payment Terms</label>
                    <p className="text-white">{client.paymentTermsPreferred}</p>
                  </div>
                )}
                {client.creditLimit !== null && client.creditLimit > 0 && (
                  <div>
                    <label className="text-sm text-gray-400">Credit Limit</label>
                    <p className="text-white">{client.currencyPreferred} {client.creditLimit.toLocaleString()}</p>
                  </div>
                )}
                {client.currencyPreferred && (
                  <div>
                    <label className="text-sm text-gray-400">Preferred Currency</label>
                    <p className="text-white">{client.currencyPreferred}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Lead Information */}
            {(client.clientType === 'Lead' || client.clientType === 'Prospect') && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  <h2 className="text-lg font-semibold text-white">Lead Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {client.leadSource && (
                    <div>
                      <label className="text-sm text-gray-400">Lead Source</label>
                      <p className="text-white">{client.leadSource}</p>
                    </div>
                  )}
                  {client.leadStatus && (
                    <div>
                      <label className="text-sm text-gray-400">Lead Status</label>
                      <p className="text-white">{client.leadStatus}</p>
                    </div>
                  )}
                  {client.probabilityToClose !== null && (
                    <div>
                      <label className="text-sm text-gray-400">Probability to Close</label>
                      <p className="text-white">{client.probabilityToClose}%</p>
                    </div>
                  )}
                  {client.expectedOrderValue !== null && client.expectedOrderValue > 0 && (
                    <div>
                      <label className="text-sm text-gray-400">Expected Order Value</label>
                      <p className="text-white font-medium">${client.expectedOrderValue.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Products & Preferences */}
            {(client.productsInterestedIn || client.preferredPackaging || client.certificationsRequired || 
              client.typicalOrderQuantity || client.orderFrequency) && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-lg font-semibold text-white">Products & Preferences</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {client.productsInterestedIn && (
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-400">Products Interested In</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {JSON.parse(client.productsInterestedIn).map((product: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {client.certificationsRequired && (
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-400">Certifications Required</label>
                      <p className="text-white">{client.certificationsRequired}</p>
                    </div>
                  )}
                  {client.typicalOrderQuantity && (
                    <div>
                      <label className="text-sm text-gray-400">Typical Order Quantity</label>
                      <p className="text-white">{client.typicalOrderQuantity}</p>
                    </div>
                  )}
                  {client.orderFrequency && (
                    <div>
                      <label className="text-sm text-gray-400">Order Frequency</label>
                      <p className="text-white">{client.orderFrequency}</p>
                    </div>
                  )}
                  {client.preferredPackaging && (
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-400">Preferred Packaging</label>
                      <p className="text-white">{client.preferredPackaging}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            {client.notes && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Notes</h2>
                <p className="text-gray-300 whitespace-pre-wrap">{client.notes}</p>
              </div>
            )}
              </>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <>
            {/* Orders */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-semibold text-white">Orders</h2>
                </div>
                <button
                  onClick={() => router.push('/admin/orders/new')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
                >
                  Create Order
                </button>
              </div>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No orders yet</p>
                  <button
                    onClick={() => router.push('/admin/orders/new')}
                    className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm"
                  >
                    Create first order
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg hover:bg-gray-750 cursor-pointer" onClick={() => router.push(`/admin/orders/${order.id}`)}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium">{order.orderNumber}</p>
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            order.orderStatus === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                            order.orderStatus === 'Shipped' ? 'bg-purple-500/20 text-purple-400' :
                            order.orderStatus === 'Confirmed' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {order.orderStatus}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{new Date(order.orderDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{order.currency} {order.totalAmount.toLocaleString()}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/orders/${order.id}`);
                          }}
                          className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                  {orders.length > 5 && (
                    <button
                      onClick={() => router.push('/admin/orders')}
                      className="w-full text-center text-emerald-400 hover:text-emerald-300 text-sm py-2"
                    >
                      View all {orders.length} orders →
                    </button>
                  )}
                </div>
              )}
            </div>
              </>
            )}

            {/* Communications Tab */}
            {activeTab === 'communications' && (
              <CommunicationLog clientId={parseInt(clientId)} />
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <DocumentManager clientId={parseInt(clientId)} />
            )}

            {/* Notes Tab */}
            {activeTab === 'notes' && (
              <NoteManager clientId={parseInt(clientId)} existingNotes={client.notes || undefined} />
            )}

            {/* Activity Log Tab */}
            {activeTab === 'activity' && (
              <ActivityLog clientId={parseInt(clientId)} clientName={client.companyName} />
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Lead Scoring - Only for Leads and Prospects */}
            {(client.clientType === 'Lead' || client.clientType === 'Prospect') && (
              <LeadScoring client={client} onScoreUpdate={(newScore) => {
                setClient({ ...client, leadScore: newScore });
              }} />
            )}

            {/* Relationship Metrics */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold text-white">Relationship Metrics</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Total Orders</label>
                  <p className="text-2xl font-bold text-white">{client.totalOrders}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Total Revenue</label>
                  <p className="text-2xl font-bold text-white">
                    ${client.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Average Order Value</label>
                  <p className="text-xl font-medium text-white">
                    ${client.averageOrderValue.toLocaleString()}
                  </p>
                </div>
                {client.firstOrderDate && (
                  <div className="pt-3 border-t border-gray-700">
                    <label className="text-sm text-gray-400">First Order</label>
                    <p className="text-white">{new Date(client.firstOrderDate).toLocaleDateString()}</p>
                  </div>
                )}
                {client.lastOrderDate && (
                  <div>
                    <label className="text-sm text-gray-400">Last Order</label>
                    <p className="text-white">{new Date(client.lastOrderDate).toLocaleDateString()}</p>
                  </div>
                )}
                {client.daysSinceLastOrder !== null && (
                  <div>
                    <label className="text-sm text-gray-400">Days Since Last Order</label>
                    <p className={`text-white font-medium ${
                      client.daysSinceLastOrder > 90 ? 'text-red-400' : 
                      client.daysSinceLastOrder > 60 ? 'text-yellow-400' : 
                      'text-green-400'
                    }`}>
                      {client.daysSinceLastOrder} days
                    </p>
                  </div>
                )}
                {client.outstandingBalance > 0 && (
                  <div className="pt-3 border-t border-gray-700">
                    <label className="text-sm text-gray-400">Outstanding Balance</label>
                    <p className="text-xl font-bold text-yellow-400">
                      ${client.outstandingBalance.toLocaleString()}
                    </p>
                  </div>
                )}
                {client.paymentReliabilityScore !== null && (
                  <div>
                    <label className="text-sm text-gray-400">Payment Reliability</label>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={star <= client.paymentReliabilityScore! ? 'text-yellow-400' : 'text-gray-600'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-white text-sm">({client.paymentReliabilityScore}/5)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Engagement */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Engagement</h2>
              </div>
              <div className="space-y-3">
                {client.lastContactDate && (
                  <div>
                    <label className="text-sm text-gray-400">Last Contact</label>
                    <p className="text-white">{new Date(client.lastContactDate).toLocaleDateString()}</p>
                    {client.lastContactType && (
                      <p className="text-sm text-gray-500">{client.lastContactType}</p>
                    )}
                  </div>
                )}
                {client.totalInteractions > 0 && (
                  <div>
                    <label className="text-sm text-gray-400">Total Interactions</label>
                    <p className="text-white font-medium">{client.totalInteractions}</p>
                  </div>
                )}
                {client.nextFollowUpDate && (
                  <div>
                    <label className="text-sm text-gray-400">Next Follow-up</label>
                    <p className="text-white">{new Date(client.nextFollowUpDate).toLocaleDateString()}</p>
                    {client.followUpNotes && (
                      <p className="text-sm text-gray-400 mt-1">{client.followUpNotes}</p>
                    )}
                  </div>
                )}
                {client.responseRate !== null && (
                  <div>
                    <label className="text-sm text-gray-400">Response Rate</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full" 
                          style={{ width: `${client.responseRate}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{client.responseRate}%</span>
                    </div>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <p className="text-white">{client.status}</p>
                </div>
              </div>
            </div>

            {/* Decision Makers */}
            {client.decisionMakers && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">Decision Makers</h2>
                  </div>
                </div>
                <div className="space-y-3">
                  {JSON.parse(client.decisionMakers).map((person: any, index: number) => (
                    <div key={index} className="p-3 bg-gray-900 rounded-lg border border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-white font-medium">{person.name}</p>
                          <p className="text-sm text-gray-400">{person.title}</p>
                          {person.role && (
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${
                              person.role === 'Decision Maker' ? 'bg-green-500/20 text-green-400' :
                              person.role === 'Influencer' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {person.role}
                            </span>
                          )}
                        </div>
                      </div>
                      {(person.email || person.phone) && (
                        <div className="mt-2 space-y-1">
                          {person.email && (
                            <a href={`mailto:${person.email}`} className="text-xs text-emerald-400 hover:text-emerald-300 block">
                              {person.email}
                            </a>
                          )}
                          {person.phone && (
                            <a href={`tel:${person.phone}`} className="text-xs text-emerald-400 hover:text-emerald-300 block">
                              {person.phone}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm text-left">
                  Send Email
                </button>
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm text-left">
                  Schedule Meeting
                </button>
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm text-left">
                  Create Order
                </button>
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm text-left">
                  Log Communication
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Assignment Modal */}
        {showAssignModal && (
          <LeadAssignment
            clientId={client.id}
            clientName={client.companyName}
            currentAssignee={null}
            onClose={() => setShowAssignModal(false)}
            onAssign={() => {
              fetchClient();
              setShowAssignModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
