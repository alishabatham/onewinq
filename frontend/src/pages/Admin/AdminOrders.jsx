import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { 
  ShoppingBag, Search, RefreshCw, AlertCircle, Phone, MapPin, Mail,
  Clock, CheckCircle, Truck, XCircle, Trash2, ExternalLink, Filter, MessageSquare,
  CreditCard, DollarSign, Tag, Printer, ShieldCheck, Copy, CheckCircle2, ChevronRight, UserCheck, PackageCheck, Layers
} from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [unlinkedCards, setUnlinkedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPayment, setFilterPayment] = useState('ALL');
  const [updatingId, setUpdatingId] = useState(null);
  
  // Detailed Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editPaymentStatus, setEditPaymentStatus] = useState('Paid');
  const [editTxnId, setEditTxnId] = useState('');
  const [editFulfillmentStatus, setEditFulfillmentStatus] = useState('Pending');
  const [editCourier, setEditCourier] = useState('');
  const [editTrackingNo, setEditTrackingNo] = useState('');
  const [editAssignedCard, setEditAssignedCard] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchCardsInventory();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_URL}/admin/orders`);
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error(err);
      setError('Could not fetch card orders list.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCardsInventory = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/cards`);
      if (res.data.success) {
        // Filter unlinked cards available for assignment
        const available = res.data.cards.filter(c => c.status === 'unlinked' || !c.user);
        setUnlinkedCards(available);
      }
    } catch (err) {
      console.error('Failed to load card inventory:', err);
    }
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setEditPaymentStatus(order.paymentStatus || 'Paid');
    setEditTxnId(order.transactionId || '');
    setEditFulfillmentStatus(order.status || 'Pending');
    setEditCourier(order.courierName || '');
    setEditTrackingNo(order.trackingNumber || '');
    setEditAssignedCard(order.assignedCardId || '');
    setEditNotes(order.notes || '');
    setSaveSuccessMsg('');
  };

  const handleQuickStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await axios.put(`${API_URL}/admin/orders/${orderId}/status`, { status: newStatus });
      if (res.data.success) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus, isReadByAdmin: true } : o));
      }
    } catch (err) {
      alert('Failed to update status: ' + (err.response?.data?.message || err.message));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveModalDetails = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setUpdatingId(selectedOrder._id);
    setSaveSuccessMsg('');

    try {
      const res = await axios.put(`${API_URL}/admin/orders/${selectedOrder._id}/status`, {
        status: editFulfillmentStatus,
        paymentStatus: editPaymentStatus,
        transactionId: editTxnId,
        courierName: editCourier,
        trackingNumber: editTrackingNo,
        assignedCardId: editAssignedCard,
        notes: editNotes,
      });

      if (res.data.success) {
        const updated = res.data.order;
        setOrders(prev => prev.map(o => o._id === selectedOrder._id ? updated : o));
        setSelectedOrder(updated);
        setSaveSuccessMsg('Order & fulfillment details saved successfully!');
        fetchCardsInventory(); // Refresh available unlinked cards
      }
    } catch (err) {
      alert('Failed to save order details: ' + (err.response?.data?.message || err.message));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await axios.delete(`${API_URL}/admin/orders/${orderId}`);
      if (res.data.success) {
        setOrders(prev => prev.filter(o => o._id !== orderId));
        if (selectedOrder?._id === orderId) setSelectedOrder(null);
      }
    } catch (err) {
      alert('Failed to delete order: ' + (err.response?.data?.message || err.message));
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      (o.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.phone || '').includes(searchTerm) ||
      (o.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.cardName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.customNameOnCard || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.transactionId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.assignedCardId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.shippingAddress || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || o.status === filterStatus;
    const matchesPayment = filterPayment === 'ALL' || o.paymentStatus === filterPayment;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, o) => {
    if (o.paymentStatus === 'Paid') {
      const val = o.priceNumeric || parseFloat(String(o.price || '').replace(/[^0-9.]/g, '')) || 0;
      return sum + val;
    }
    return sum;
  }, 0);
  const paidCount = orders.filter(o => o.paymentStatus === 'Paid').length;
  const pendingPaymentCount = orders.filter(o => o.paymentStatus === 'Pending').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center space-x-1"><Clock className="h-3 w-3 mr-1" />Pending</span>;
      case 'Processing':
        return <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center space-x-1"><RefreshCw className="h-3 w-3 mr-1 animate-spin" />Processing</span>;
      case 'Printed':
        return <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center space-x-1"><Layers className="h-3 w-3 mr-1" />Card Printed</span>;
      case 'Shipped':
        return <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center space-x-1"><Truck className="h-3 w-3 mr-1" />Shipped</span>;
      case 'Delivered':
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center space-x-1"><CheckCircle className="h-3 w-3 mr-1" />Delivered</span>;
      case 'Cancelled':
        return <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center space-x-1"><XCircle className="h-3 w-3 mr-1" />Cancelled</span>;
      default:
        return <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const getPaymentBadge = (payStatus, method) => {
    switch (payStatus) {
      case 'Paid':
        return (
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold inline-flex items-center space-x-1">
            <ShieldCheck className="h-3 w-3 mr-1 text-emerald-400" />
            Paid ({method || 'UPI'})
          </span>
        );
      case 'Pending':
        return (
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center space-x-1">
            <Clock className="h-3 w-3 mr-1" />
            Unpaid / COD
          </span>
        );
      case 'Failed':
        return (
          <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center space-x-1">
            <XCircle className="h-3 w-3 mr-1" />
            Payment Failed
          </span>
        );
      case 'Refunded':
        return (
          <span className="bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            Refunded
          </span>
        );
      default:
        return <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] font-medium">{payStatus}</span>;
    }
  };

  return (
    <div className="space-y-6 text-left text-slate-100 font-outfit">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Card Bookings & Payments</h1>
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full">
              {orders.length} Total Orders
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">Track payment receipts, card customizations, shipping dispatch, and NFC activation.</p>
        </div>

        <button
          onClick={() => { fetchOrders(); fetchCardsInventory(); }}
          className="p-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-2 self-start sm:self-auto shadow-xs"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="text-xs font-bold">Refresh Data</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-900 text-red-400 p-4 rounded-xl flex items-center space-x-2 text-xs">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Top Stats Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Revenue</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">₹{totalRevenue.toLocaleString('en-IN')}</span>
          </div>
          <div className="p-3 bg-emerald-950/50 text-emerald-400 rounded-xl border border-emerald-900/30">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Paid Bookings</span>
            <span className="text-2xl sm:text-3xl font-black text-white">{paidCount}</span>
          </div>
          <div className="p-3 bg-indigo-950/50 text-indigo-400 rounded-xl border border-indigo-900/30">
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Pending Payments / COD</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">{pendingPaymentCount}</span>
          </div>
          <div className="p-3 bg-amber-950/50 text-amber-400 rounded-xl border border-amber-900/30">
            <Clock className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer, phone, email, card type, Txn ID, Card code..."
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="sm:col-span-3 flex items-center space-x-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-white px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Order Statuses</option>
            <option value="Pending">Pending Only</option>
            <option value="Processing">Processing</option>
            <option value="Printed">Card Printed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="sm:col-span-3 flex items-center space-x-2">
          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-white px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Payments</option>
            <option value="Paid">Paid Only</option>
            <option value="Pending">Unpaid / COD</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-16 text-center space-y-3 text-slate-500">
            <RefreshCw className="h-8 w-8 text-indigo-500 animate-spin mx-auto" />
            <p className="text-xs font-medium">Loading orders & payments database...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center space-y-3 text-slate-400">
            <ShoppingBag className="h-10 w-10 text-slate-600 mx-auto" />
            <h4 className="font-bold text-white text-base">No Matching Orders Found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">When users or visitors place card orders on the Pricing page, their payment & card choices will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950/90 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-4 px-5 font-bold">Customer</th>
                  <th className="py-4 px-5 font-bold">Booked Card Specs</th>
                  <th className="py-4 px-5 font-bold">Payment Details</th>
                  <th className="py-4 px-5 font-bold">Fulfillment & Status</th>
                  <th className="py-4 px-5 font-bold">Date</th>
                  <th className="py-4 px-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredOrders.map((order) => {
                  const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
                  const whatsappUrl = `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=Hello%20${encodeURIComponent(order.customerName)},%20regarding%20your%20OneWinq%20${encodeURIComponent(order.cardName)}%20order...`;

                  return (
                    <tr key={order._id} className={`hover:bg-slate-850/60 transition-colors ${!order.isReadByAdmin ? 'bg-indigo-950/20' : ''}`}>
                      
                      {/* Customer Info */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-white text-sm">{order.customerName}</div>
                        {order.email && <div className="text-[11px] text-slate-400 flex items-center mt-0.5"><Mail className="h-3 w-3 mr-1 text-slate-500" />{order.email}</div>}
                        <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-1">
                          <Phone className="h-3 w-3 text-slate-500" />
                          <span>{order.phone}</span>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 text-emerald-400 hover:text-emerald-300 inline-flex items-center"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </td>

                      {/* Card Specs */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-indigo-400 flex items-center space-x-1.5">
                          <CreditCard className="h-3.5 w-3.5 shrink-0" />
                          <span>{order.cardName}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs mt-1">
                          <span className="bg-slate-950 border border-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-semibold">
                            Color: {order.cardColor || 'Standard'}
                          </span>
                          <span className="text-white font-black">{order.price}</span>
                        </div>
                        {order.customNameOnCard && (
                          <div className="text-[10px] text-amber-300/90 font-mono mt-1">
                            Print: "{order.customNameOnCard}"
                          </div>
                        )}
                      </td>

                      {/* Payment Details */}
                      <td className="py-4 px-5">
                        <div>{getPaymentBadge(order.paymentStatus, order.paymentMethod)}</div>
                        {order.transactionId ? (
                          <div className="text-[10px] text-slate-400 font-mono mt-1 flex items-center space-x-1">
                            <span>Txn:</span>
                            <span className="text-slate-200 font-semibold">{order.transactionId}</span>
                            <button
                              onClick={() => copyToClipboard(order.transactionId, `txn-${order._id}`)}
                              className="p-0.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                              title="Copy Txn ID"
                            >
                              {copiedId === `txn-${order._id}` ? <CheckCircle2 className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                            </button>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-500 italic mt-1">No Txn Ref ID</div>
                        )}
                      </td>

                      {/* Fulfillment Status */}
                      <td className="py-4 px-5">
                        <div>{getStatusBadge(order.status)}</div>
                        {order.assignedCardId && (
                          <div className="text-[10px] text-indigo-300 font-mono mt-1 font-bold">
                            Card Code: {order.assignedCardId}
                          </div>
                        )}
                        {order.trackingNumber && (
                          <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                            {order.courierName || 'Courier'}: {order.trackingNumber}
                          </div>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-5 text-xs text-slate-400 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right whitespace-nowrap space-x-2">
                        {/* Status Select */}
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={(e) => handleQuickStatusChange(order._id, e.target.value)}
                          className="bg-slate-950 border border-slate-700 text-white text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Printed">Card Printed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => openOrderModal(order)}
                          className="p-1.5 bg-indigo-950/60 border border-indigo-800 text-indigo-300 hover:text-white rounded-lg transition-colors cursor-pointer inline-flex items-center space-x-1"
                          title="View & Edit Full Details"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="p-1.5 bg-red-950/40 border border-red-900/40 hover:bg-red-900/60 text-red-400 rounded-lg transition-colors cursor-pointer"
                          title="Delete Order"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Comprehensive Order Detail & Fulfillment Control Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-left space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Fulfillment & Payment Hub</span>
                  <span className="bg-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded">ID: {selectedOrder._id}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mt-1">{selectedOrder.cardName}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="bg-emerald-950/60 border border-emerald-900 text-emerald-400 p-3 rounded-xl flex items-center space-x-2 text-xs">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            {/* Main Order Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Customer Box */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Customer Details</h4>
                <div className="font-bold text-white text-base">{selectedOrder.customerName}</div>
                <div className="text-xs text-slate-300 flex items-center space-x-1.5">
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{selectedOrder.phone}</span>
                </div>
                {selectedOrder.email && (
                  <div className="text-xs text-slate-300 flex items-center space-x-1.5">
                    <Mail className="h-3.5 w-3.5 text-indigo-400" />
                    <span>{selectedOrder.email}</span>
                  </div>
                )}
                <div className="text-xs text-slate-400 pt-1 border-t border-slate-900">
                  <span className="font-semibold text-slate-400 block mb-0.5">Shipping Address:</span>
                  <p className="text-slate-200 leading-relaxed font-mono text-[11px]">{selectedOrder.shippingAddress}</p>
                </div>
              </div>

              {/* Booked Card & Price Box */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Booked Card Specifications</h4>
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-400 text-xs">Card Type:</span>
                  <span className="font-bold text-indigo-400 text-sm">{selectedOrder.cardName}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-400 text-xs">Card Color:</span>
                  <span className="font-bold text-white text-xs">{selectedOrder.cardColor || 'Standard'}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-400 text-xs">Custom Printed Name:</span>
                  <span className="font-bold text-amber-300 text-xs font-mono">{selectedOrder.customNameOnCard || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-900">
                  <span className="text-slate-400 text-xs font-semibold">Total Price:</span>
                  <span className="text-2xl font-black text-emerald-400">{selectedOrder.price}</span>
                </div>
              </div>

            </div>

            {/* Editable Form for Admin to manage Payment & Fulfillment */}
            <form onSubmit={handleSaveModalDetails} className="space-y-4 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Admin Order Processing & Tracking Controls</h4>
              
              {/* Payment Settings */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Payment Status</label>
                    <select
                      value={editPaymentStatus}
                      onChange={(e) => setEditPaymentStatus(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-bold"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending / COD</option>
                      <option value="Failed">Failed</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Transaction Ref / UTR ID</label>
                    <input
                      type="text"
                      value={editTxnId}
                      onChange={(e) => setEditTxnId(e.target.value)}
                      placeholder="e.g. UTR 91029410"
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping & Fulfillment Settings */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Fulfillment Status</label>
                    <select
                      value={editFulfillmentStatus}
                      onChange={(e) => setEditFulfillmentStatus(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-bold"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Printed">Card Printed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Assign Physical Card Code</label>
                    <select
                      value={editAssignedCard}
                      onChange={(e) => setEditAssignedCard(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-mono font-bold"
                    >
                      <option value="">-- Select Unlinked Card Code --</option>
                      {editAssignedCard && (
                        <option value={editAssignedCard}>Current: {editAssignedCard}</option>
                      )}
                      {unlinkedCards.map(c => (
                        <option key={c._id} value={c.cardId}>{c.cardId} (Unlinked)</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Courier Service Name</label>
                    <input
                      type="text"
                      value={editCourier}
                      onChange={(e) => setEditCourier(e.target.value)}
                      placeholder="e.g. BlueDart / Delhivery / SpeedPost"
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Tracking Number / AWB</label>
                    <input
                      type="text"
                      value={editTrackingNo}
                      onChange={(e) => setEditTrackingNo(e.target.value)}
                      placeholder="e.g. AWB829103941"
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Internal Admin Notes</label>
                  <input
                    type="text"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="e.g. Special packing instructions, verified payment screenshot"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs transition-all inline-flex items-center space-x-1.5 cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Slip</span>
                </button>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={updatingId === selectedOrder._id}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-indigo-600/20 cursor-pointer inline-flex items-center space-x-1.5"
                  >
                    {updatingId === selectedOrder._id ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    <span>Save Order Changes</span>
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrders;
