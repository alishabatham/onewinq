import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set default token if exists
  useEffect(() => {
    const token = localStorage.getItem('onewinq_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`);
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        logout();
      }
    } catch (err) {
      console.error('Error fetching current user:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem('onewinq_token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed. Please check credentials.',
      };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem('onewinq_token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Signup failed. Please try again.',
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('onewinq_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      // In a simple MVP settings page, we can update it via put on a user or a standard endpoint.
      // Let's create an endpoint in profile or handle it securely.
      // We can also just update user details or we can use profile/me or settings endpoint.
      // Wait, we can implement password change directly via a profile route or let's create a change password route in auth!
      // Let's call put to /api/auth/changepassword which we can support.
      const res = await axios.put(`${API_URL}/auth/changepassword`, { currentPassword, newPassword });
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Could not change password.',
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
