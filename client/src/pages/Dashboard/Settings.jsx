import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth, API_URL } from '../../context/AuthContext';
import { 
  Key, Trash2, ShieldAlert, AlertCircle, CheckCircle2, RefreshCw
} from 'lucide-react';

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Password States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Delete State
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await axios.put(`${API_URL}/auth/changepassword`, {
        currentPassword,
        newPassword,
      });

      if (res.data.success) {
        setPasswordSuccess(res.data.message || 'Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Could not change password. Check your current password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const doubleConfirm = window.confirm(
      'WARNING: Are you absolutely sure you want to delete your account? This will permanently delete your profile, details, company logo, brochure PDF, and unlink your physical NFC card. This action CANNOT be undone.'
    );

    if (!doubleConfirm) return;

    setDeleteError('');
    setDeleteLoading(true);

    try {
      const res = await axios.delete(`${API_URL}/auth/deleteaccount`);
      if (res.data.success) {
        alert('Your account has been successfully deleted.');
        logout();
        navigate('/');
      }
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Failed to delete account. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-550 mt-1">Configure your password credentials or delete your account access.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Change Password */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center space-x-2">
              <Key className="h-5 w-5 text-indigo-650" />
              <span>Change Account Password</span>
            </h3>

            {passwordError && (
              <div className="bg-red-55 border border-red-200 text-red-650 p-3 rounded-lg flex items-start space-x-2 text-xs">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="bg-emerald-55 border border-emerald-200 text-emerald-650 p-3 rounded-lg flex items-start space-x-2 text-xs">
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-505" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-850 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">New Password (min 6 characters)</label>
                <input
                  type="password"
                  required
                  minLength="6"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-850 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Confirm New Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-850 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-lg text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                >
                  {passwordLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Updating password...</span>
                    </>
                  ) : (
                    <span>Update Password</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Delete Account */}
        <div className="md:col-span-1">
          <div className="bg-red-50/20 p-6 rounded-2xl border border-red-200 flex flex-col justify-between h-full shadow-xs">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-red-600 flex items-center space-x-2">
                <ShieldAlert className="h-5 w-5 text-red-500" />
                <span>Danger Zone</span>
              </h3>
              <p className="text-xs text-slate-550 leading-relaxed">
                Deleting your account will erase everything permanently. This operation cannot be undone.
              </p>

              {deleteError && (
                <div className="bg-red-100/50 border border-red-200 text-red-650 p-2.5 rounded-lg text-xs flex items-start space-x-1.5">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <span>{deleteError}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleDeleteAccount}
              disabled={deleteLoading}
              className="mt-8 w-full bg-red-600 hover:bg-red-750 text-white font-semibold py-2.5 rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              <span>{deleteLoading ? 'Deleting Account...' : 'Delete Account permanently'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
