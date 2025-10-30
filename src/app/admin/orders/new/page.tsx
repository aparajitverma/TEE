'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, X, Search, UserPlus } from 'lucide-react';

export default function NewOrderPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [filteredClients, setFilteredClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [clientSearch, setClientSearch] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddData, setQuickAddData] = useState({
    companyName: '',
    contactPerson: '',
    emailPrimary: '',
    phonePrimary: '',
  });
  const [formData, setFormData] = useState({
    orderType: 'Export',
    priority: 'Medium',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    orderDate: new Date().toISOString().split('T')[0],
    expectedDeliveryDate: '',
    currency: 'USD',
    paymentTerms: '50% Advance, 50% on BL',
    notes: '',
    // Shipping Details
    incoterm: '',
    shippingMethod: '',
    portOfLoading: '',
    portOfDischarge: '',
    shippingCost: 0,
    // Packaging Details
    numberOfPackages: 0,
    packageType: '',
    grossWeight: 0,
    netWeight: 0,
    weightUnit: 'kg',
    // Additional Details
    billingAddress: '',
    shippingAddress: '',
    specialInstructions: '',
    followUpDate: '',
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);

  const [products, setProducts] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [productSearch, setProductSearch] = useState<string[]>([]);
  const [showProductDropdown, setShowProductDropdown] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const [lineItems, setLineItems] = useState([
    { productId: null, productName: '', productCode: '', quantity: 0, unit: 'kg', unitPrice: 0, vendorId: null, vendorCost: 0, margin: 0, specifications: '' }
  ]);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      fetchClients();
      fetchProducts();
      fetchVendors();
    }
  }, [router]);

  useEffect(() => {
    if (clientSearch) {
      const filtered = clients.filter(client =>
        client.companyName.toLowerCase().includes(clientSearch.toLowerCase()) ||
        client.contactPerson.toLowerCase().includes(clientSearch.toLowerCase()) ||
        (client.emailPrimary && client.emailPrimary.toLowerCase().includes(clientSearch.toLowerCase()))
      );
      setFilteredClients(filtered);
      setShowClientDropdown(true);
    } else {
      setFilteredClients(clients);
      setShowClientDropdown(false);
    }
  }, [clientSearch, clients]);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const data = await response.json();
      if (data.clients) {
        setClients(data.clients);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await fetch('/api/vendors');
      const data = await response.json();
      if (data.vendors) {
        setVendors(data.vendors);
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const selectClient = (client: any) => {
    setSelectedClient(client);
    setClientSearch(client.companyName);
    // Build billing address from client data
    const billingAddr = [
      client.addressLine1,
      client.addressLine2,
      client.city,
      client.stateProvince,
      client.country,
      client.postalCode
    ].filter(Boolean).join(', ');

    setFormData({
      ...formData,
      clientName: client.companyName,
      clientEmail: client.emailPrimary || '',
      clientPhone: client.phonePrimary || '',
      billingAddress: billingAddr,
      shippingAddress: sameAsBilling ? billingAddr : formData.shippingAddress,
    });
    setShowClientDropdown(false);
  };

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...quickAddData,
          clientType: 'Lead',
          status: 'Active',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        await fetchClients();
        selectClient(data.client);
        setShowQuickAdd(false);
        setQuickAddData({
          companyName: '',
          contactPerson: '',
          emailPrimary: '',
          phonePrimary: '',
        });
      } else {
        alert('Failed to add client');
      }
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Error adding client');
    }
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { productId: null, productName: '', productCode: '', quantity: 0, unit: 'kg', unitPrice: 0, vendorId: null, vendorCost: 0, margin: 0, specifications: '' }]);
    setProductSearch([...productSearch, '']);
  };

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
    setProductSearch(productSearch.filter((_, i) => i !== index));
  };

  const updateLineItem = (index: number, field: string, value: any) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    
    // Auto-calculate margin when unitPrice or vendorCost changes
    if (field === 'unitPrice' || field === 'vendorCost') {
      const unitPrice = field === 'unitPrice' ? value : updated[index].unitPrice;
      const vendorCost = field === 'vendorCost' ? value : updated[index].vendorCost;
      if (vendorCost > 0) {
        updated[index].margin = ((unitPrice - vendorCost) / vendorCost * 100);
      } else {
        updated[index].margin = 0;
      }
    }
    
    setLineItems(updated);
  };

  const handleProductSearch = (index: number, search: string) => {
    const updated = [...productSearch];
    updated[index] = search;
    setProductSearch(updated);
    
    if (search) {
      const filtered = products.filter(p => 
        p.productName.toLowerCase().includes(search.toLowerCase()) ||
        p.productCode.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowProductDropdown(index);
    } else {
      setShowProductDropdown(null);
    }
  };

  const selectProduct = (index: number, product: any) => {
    const updated = [...lineItems];
    updated[index] = {
      ...updated[index],
      productId: product.id,
      productName: product.productName,
      productCode: product.productCode,
      unit: product.unit || 'kg',
      unitPrice: product.sellingPrice || 0,
      vendorId: product.primaryVendorId || null,
      vendorCost: product.costPrice || 0,
      margin: product.marginPercentage || 0
    };
    setLineItems(updated);
    
    const searchUpdated = [...productSearch];
    searchUpdated[index] = product.productName;
    setProductSearch(searchUpdated);
    setShowProductDropdown(null);
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const total = calculateTotal();
      const totalWithShipping = total + (parseFloat(formData.shippingCost as any) || 0);
      const payload = {
        ...formData,
        orderDate: new Date(formData.orderDate),
        expectedDeliveryDate: formData.expectedDeliveryDate ? new Date(formData.expectedDeliveryDate) : null,
        followUpDate: formData.followUpDate ? new Date(formData.followUpDate) : null,
        subtotal: total,
        shippingCost: parseFloat(formData.shippingCost as any) || 0,
        totalAmount: totalWithShipping,
        orderStatus: 'Inquiry',
        paymentStatus: 'Pending',
        lineItems: lineItems.map(item => ({
          productId: item.productId,
          productName: item.productName,
          productCode: item.productCode,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          totalPrice: item.quantity * item.unitPrice,
          vendorId: item.vendorId,
          vendorCost: item.vendorCost,
          margin: item.margin,
          specifications: item.specifications,
        })),
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/orders');
      } else {
        const error = await response.json();
        alert('Failed to create order: ' + (error.details || error.error));
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/admin/orders')}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Create New Order</h1>
            <p className="text-gray-400">Add order details and products</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Order Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Order Type <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={formData.orderType}
                  onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Export">Export</option>
                  <option value="Domestic">Domestic</option>
                  <option value="Sample">Sample</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Order Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.orderDate}
                  onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Expected Delivery</label>
                <input
                  type="date"
                  value={formData.expectedDeliveryDate}
                  onChange={(e) => setFormData({ ...formData, expectedDeliveryDate: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="INR">INR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Payment Terms</label>
                <input
                  type="text"
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="e.g., 50% Advance, 50% on BL"
                />
              </div>
            </div>
          </div>

          {/* Client Selection */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Client Information</h3>
              <button
                type="button"
                onClick={() => setShowQuickAdd(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                <UserPlus className="w-4 h-4" />
                Quick Add Client
              </button>
            </div>

            {/* Client Search */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Search & Select Client <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  onFocus={() => setShowClientDropdown(true)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Search by company name, contact person, or email..."
                />
              </div>

              {/* Client Dropdown */}
              {showClientDropdown && filteredClients.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredClients.map((client) => (
                    <button
                      key={client.id}
                      type="button"
                      onClick={() => selectClient(client)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-800 border-b border-gray-700 last:border-b-0"
                    >
                      <div className="text-white font-medium">{client.companyName}</div>
                      <div className="text-sm text-gray-400">{client.contactPerson}</div>
                      <div className="text-xs text-gray-500">{client.emailPrimary}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Client Info */}
            {selectedClient && (
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-white font-medium">{selectedClient.companyName}</p>
                    <p className="text-sm text-gray-400">{selectedClient.contactPerson}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedClient(null);
                      setClientSearch('');
                      setFormData({ ...formData, clientName: '', clientEmail: '', clientPhone: '' });
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-300 ml-2">{selectedClient.emailPrimary || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <span className="text-gray-300 ml-2">{selectedClient.phonePrimary || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Manual Entry (if no client selected) */}
            {!selectedClient && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Client Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="Enter client name manually"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Client Email</label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="client@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Client Phone</label>
                  <input
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="+1-234-567-8900"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick Add Client Modal */}
          {showQuickAdd && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md w-full">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Add Client</h3>
                <form onSubmit={handleQuickAdd} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Company Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={quickAddData.companyName}
                      onChange={(e) => setQuickAddData({ ...quickAddData, companyName: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Contact Person <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={quickAddData.contactPerson}
                      onChange={(e) => setQuickAddData({ ...quickAddData, contactPerson: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={quickAddData.emailPrimary}
                      onChange={(e) => setQuickAddData({ ...quickAddData, emailPrimary: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={quickAddData.phonePrimary}
                      onChange={(e) => setQuickAddData({ ...quickAddData, phonePrimary: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      Add Client
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuickAdd(false)}
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Products</h3>
              <button
                type="button"
                onClick={addLineItem}
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="space-y-6">
              {lineItems.map((item, index) => (
                <div key={index} className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="grid grid-cols-12 gap-3 mb-3">
                    {/* Product Search */}
                    <div className="col-span-6 relative">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Product <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={productSearch[index] || item.productName}
                          onChange={(e) => handleProductSearch(index, e.target.value)}
                          onFocus={() => productSearch[index] && setShowProductDropdown(index)}
                          className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                          placeholder="Search product..."
                        />
                      </div>
                      
                      {/* Product Dropdown */}
                      {showProductDropdown === index && filteredProducts.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {filteredProducts.map((product) => (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => selectProduct(index, product)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-700 border-b border-gray-700 last:border-b-0"
                            >
                              <div className="text-white text-sm font-medium">{product.productName}</div>
                              <div className="text-xs text-gray-400">{product.productCode} • {product.unit}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Quantity</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Unit */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Unit</label>
                      <select
                        value={item.unit}
                        onChange={(e) => updateLineItem(index, 'unit', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="kg">kg</option>
                        <option value="MT">MT</option>
                        <option value="pieces">pieces</option>
                        <option value="boxes">boxes</option>
                      </select>
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Unit Price</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateLineItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 mb-3">
                    {/* Vendor Selection */}
                    <div className="col-span-4">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Vendor</label>
                      <select
                        value={item.vendorId || ''}
                        onChange={(e) => updateLineItem(index, 'vendorId', e.target.value ? parseInt(e.target.value) : null)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="">Select vendor...</option>
                        {vendors.map((vendor) => (
                          <option key={vendor.id} value={vendor.id}>
                            {vendor.vendorName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Vendor Cost */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Vendor Cost</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.vendorCost}
                        onChange={(e) => updateLineItem(index, 'vendorCost', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Margin */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Margin %</label>
                      <div className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-blue-400 font-medium">
                        {item.margin.toFixed(2)}%
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Total</label>
                      <div className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-emerald-400 font-medium">
                        {(item.quantity * item.unitPrice).toFixed(2)}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="col-span-2 flex items-end">
                      {lineItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLineItem(index)}
                          className="w-full p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                          title="Remove"
                        >
                          <X className="w-4 h-4 mx-auto" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Specifications / Notes</label>
                    <textarea
                      value={item.specifications}
                      onChange={(e) => updateLineItem(index, 'specifications', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      placeholder="Add any special requirements or notes for this product..."
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end">
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-1">Subtotal</p>
                <p className="text-2xl font-bold text-white">
                  {formData.currency} {calculateTotal().toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Shipping Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Incoterm */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Incoterm</label>
                <select
                  value={formData.incoterm}
                  onChange={(e) => setFormData({ ...formData, incoterm: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select Incoterm...</option>
                  <option value="EXW">EXW - Ex Works</option>
                  <option value="FCA">FCA - Free Carrier</option>
                  <option value="CPT">CPT - Carriage Paid To</option>
                  <option value="CIP">CIP - Carriage and Insurance Paid To</option>
                  <option value="DAP">DAP - Delivered at Place</option>
                  <option value="DPU">DPU - Delivered at Place Unloaded</option>
                  <option value="DDP">DDP - Delivered Duty Paid</option>
                  <option value="FAS">FAS - Free Alongside Ship</option>
                  <option value="FOB">FOB - Free on Board</option>
                  <option value="CFR">CFR - Cost and Freight</option>
                  <option value="CIF">CIF - Cost, Insurance and Freight</option>
                </select>
              </div>

              {/* Shipping Method */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Shipping Method</label>
                <select
                  value={formData.shippingMethod}
                  onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select Method...</option>
                  <option value="Sea Freight">Sea Freight</option>
                  <option value="Air Freight">Air Freight</option>
                  <option value="Road Transport">Road Transport</option>
                  <option value="Rail Transport">Rail Transport</option>
                  <option value="Courier">Courier</option>
                </select>
              </div>

              {/* Port of Loading */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Port of Loading</label>
                <input
                  type="text"
                  value={formData.portOfLoading}
                  onChange={(e) => setFormData({ ...formData, portOfLoading: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="e.g., Nhava Sheva, India"
                />
              </div>

              {/* Port of Discharge */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Port of Discharge</label>
                <input
                  type="text"
                  value={formData.portOfDischarge}
                  onChange={(e) => setFormData({ ...formData, portOfDischarge: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="e.g., Los Angeles, USA"
                />
              </div>

              {/* Shipping Cost */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Shipping Cost</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.shippingCost}
                  onChange={(e) => setFormData({ ...formData, shippingCost: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Packaging Details */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-md font-semibold text-white mb-4">Packaging Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Number of Packages */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Number of Packages</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.numberOfPackages}
                    onChange={(e) => setFormData({ ...formData, numberOfPackages: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                {/* Package Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Package Type</label>
                  <select
                    value={formData.packageType}
                    onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select Type...</option>
                    <option value="Cartons">Cartons</option>
                    <option value="Bags">Bags</option>
                    <option value="Pallets">Pallets</option>
                    <option value="Drums">Drums</option>
                    <option value="Boxes">Boxes</option>
                    <option value="Crates">Crates</option>
                  </select>
                </div>

                {/* Weight Unit */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Weight Unit</label>
                  <select
                    value={formData.weightUnit}
                    onChange={(e) => setFormData({ ...formData, weightUnit: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                    <option value="MT">MT</option>
                  </select>
                </div>

                {/* Gross Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Gross Weight</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.grossWeight}
                    onChange={(e) => setFormData({ ...formData, grossWeight: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="0.00"
                  />
                </div>

                {/* Net Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Net Weight</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.netWeight}
                    onChange={(e) => setFormData({ ...formData, netWeight: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Total with Shipping */}
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white font-medium">{formData.currency} {calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Shipping Cost:</span>
                <span className="text-white font-medium">{formData.currency} {(formData.shippingCost || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                <span className="text-white font-semibold text-lg">Total Amount:</span>
                <span className="text-emerald-400 font-bold text-2xl">
                  {formData.currency} {(calculateTotal() + (formData.shippingCost || 0)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Additional Details</h3>
            
            <div className="space-y-4">
              {/* Billing Address */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Billing Address</label>
                <textarea
                  value={formData.billingAddress}
                  onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Enter billing address..."
                />
              </div>

              {/* Shipping Address */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-400">Shipping Address</label>
                  <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAsBilling}
                      onChange={(e) => {
                        setSameAsBilling(e.target.checked);
                        if (e.target.checked) {
                          setFormData({ ...formData, shippingAddress: formData.billingAddress });
                        }
                      }}
                      className="rounded border-gray-600 bg-gray-900 text-emerald-600 focus:ring-emerald-500"
                    />
                    Same as billing address
                  </label>
                </div>
                <textarea
                  value={formData.shippingAddress}
                  onChange={(e) => {
                    setFormData({ ...formData, shippingAddress: e.target.value });
                    if (sameAsBilling) setSameAsBilling(false);
                  }}
                  rows={3}
                  disabled={sameAsBilling}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter shipping address..."
                />
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Special Instructions</label>
                <textarea
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Add any special instructions for this order..."
                />
              </div>

              {/* Follow-up Date */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Follow-up Date</label>
                <input
                  type="date"
                  value={formData.followUpDate}
                  onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Internal Notes</h3>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              placeholder="Add any internal notes about this order..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push('/admin/orders')}
              className="px-6 py-2 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {submitting ? 'Creating...' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
