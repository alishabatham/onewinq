import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { 
  ShoppingBag, Search, RefreshCw, AlertCircle, Phone, MapPin, 
  Clock, CheckCircle, Truck, XCircle, Trash2, ExternalLink, Filter, MessageSquare
} from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
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

  const handleStatusChange = async (orderId, newStatus) => {
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

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      (o.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.phone || '').includes(searchTerm) ||
      (o.cardName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.shippingAddress || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center space-x-1"><Clock className="h-3 w-3 mr-1" />Pending</span>;
      case 'Processing':
        return <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center space-x-1"><RefreshCw className="h-3 w-3 mr-1 animate-spin" />Processing</span>;
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

  return (
    <div className="space-y-6 text-left text-slate-100 font-outfit">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">NFC Card Orders</h1>
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full">
              {orders.length} Total
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">Manage physical NFC card orders and fulfillment status in real-time.</p>
        </div>

        <button
          onClick={fetchOrders}
          className="p-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-2 self-start sm:self-auto"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="text-xs font-bold">Refresh</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-900 text-red-400 p-4 rounded-xl flex items-center space-x-2 text-xs">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8 relative">
          <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name, phone, card type, address..."
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="sm:col-span-4 flex items-center space-x-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-white px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Order Statuses</option>
            <option value="Pending">Pending Only</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-16 text-center space-y-3 text-slate-500">
            <RefreshCw className="h-8 w-8 text-indigo-500 animate-spin mx-auto" />
            <p className="text-xs font-medium">Fetching orders database...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center space-y-3 text-slate-400">
            <ShoppingBag className="h-10 w-10 text-slate-600 mx-auto" />
            <h4 className="font-bold text-white text-base">No Orders Found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">When users or visitors place card orders on the Pricing page, they will appear here with live notifications.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-4 px-5 font-bold">Customer Info</th>
                  <th className="py-4 px-5 font-bold">Card & Price</th>
                  <th className="py-4 px-5 font-bold">Shipping Address</th>
                  <th className="py-4 px-5 font-bold">Status</th>
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
                            <MessageSquare className="h-3 w-3" />
                          </a>
                        </div>
                      </td>

                      {/* Card & Price */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-indigo-400">{order.cardName}</div>
                        <div className="text-xs font-black text-white mt-0.5">{order.price}</div>
                      </td>

                      {/* Address */}
                      <td className="py-4 px-5 max-w-xs">
                        <div className="text-xs text-slate-300 line-clamp-2" title={order.shippingAddress}>
                          <MapPin className="h-3 w-3 text-slate-500 inline mr-1" />
                          {order.shippingAddress}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        {getStatusBadge(order.status)}
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
                        {/* Quick Status Select */}
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="bg-slate-950 border border-slate-700 text-white text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                          title="View Full Details"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded-lg transition-colors cursor-pointer"
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-left space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Order Details</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">{selectedOrder.cardName}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Total Price:</span>
                <span className="text-2xl font-black text-indigo-400">{selectedOrder.price}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer Name:</span>
                  <span className="font-bold text-white">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone / WhatsApp:</span>
                  <span className="font-bold text-emerald-400">{selectedOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <div>{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Order Date:</span>
                  <span className="text-slate-300">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block mb-1">Full Shipping Address:</span>
                <p className="text-white leading-relaxed font-mono text-xs">{selectedOrder.shippingAddress}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrders;
