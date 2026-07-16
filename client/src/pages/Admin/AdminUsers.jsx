import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { 
  Users, Trash2, ShieldAlert, ShieldCheck, RefreshCw, AlertCircle, CheckCircle2, Search
} from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/users`);
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error(err);
      setError('Could not fetch user accounts.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    setError('');
    setSuccess('');
    setActionLoading(true);

    const newRole = currentRole === 'admin' ? 'user' : 'admin';

    try {
      const res = await axios.put(`${API_URL}/admin/users/${userId}/role`, { role: newRole });
      if (res.data.success) {
        setSuccess(`User role updated to ${newRole}`);
        fetchUsers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not change user role.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user? This will erase their profile, analytics, and unlink any card registered to them. This action is irreversible.'
    );

    if (!confirmDelete) return;

    setError('');
    setSuccess('');
    setActionLoading(true);

    try {
      const res = await axios.delete(`${API_URL}/admin/users/${userId}`);
      if (res.data.success) {
        setSuccess(res.data.message || 'User deleted successfully.');
        fetchUsers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete user account.');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      (u.cardId && u.cardId.toLowerCase().includes(term))
    );
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3">
        <RefreshCw className="h-7 w-7 text-indigo-650 animate-spin" />
        <span className="text-sm font-medium">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Manage Users</h1>
          <p className="text-sm text-slate-550 mt-1">Add, update, or remove users and manage their card linkages.</p>
        </div>
        <button
          onClick={fetchUsers}
          className="w-full sm:w-auto p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-800 transition-colors flex justify-center items-center space-x-1 shadow-xs cursor-pointer"
          title="Refresh User List"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="text-xs sm:hidden">Refresh</span>
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-55 border border-red-200 text-red-650 p-3 rounded-lg flex items-start space-x-2 text-xs">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-55 border border-emerald-200 text-emerald-650 p-3 rounded-lg flex items-start space-x-2 text-xs">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-505" />
          <span>{success}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all shadow-xs"
          placeholder="Search by name, email or linked card ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-800">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">User Info</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">NFC Link</th>
                <th className="px-6 py-4">Registered On</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{u.name}</div>
                      <div className="text-xs text-slate-500">{u.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        u.role === 'admin' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-50 text-slate-500 border border-slate-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.cardId ? (
                        <div className="flex items-center space-x-1.5">
                          <span className="font-mono text-xs text-indigo-600 font-bold">{u.cardId}</span>
                          <span className={`h-1.5 w-1.5 rounded-full ${u.cardStatus === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">No card linked</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleRole(u._id, u.role)}
                        disabled={actionLoading}
                        className="text-xs text-indigo-600 hover:text-indigo-850 font-bold transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {u.role === 'admin' ? 'Demote' : 'Promote'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        disabled={actionLoading}
                        className="text-red-655 hover:text-red-700 p-1.5 rounded bg-red-50 border border-red-200 hover:bg-red-100 transition-all inline-flex items-center disabled:opacity-50 shadow-xs cursor-pointer"
                        title="Delete User Account"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-400 font-medium">
                    No users found matching your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
