import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Landing Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Landing Pages
import Home from './pages/Landing/Home';
import Features from './pages/Landing/Features';
import Pricing from './pages/Landing/Pricing';
import Contact from './pages/Landing/Contact';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Dashboard Pages
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import DashboardHome from './pages/Dashboard/DashboardHome';
import Profile from './pages/Dashboard/Profile';
import MyCard from './pages/Dashboard/MyCard';
import Analytics from './pages/Dashboard/Analytics';
import Settings from './pages/Dashboard/Settings';

// Admin Pages
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminCards from './pages/Admin/AdminCards';

// Public Page
import DigitalCard from './pages/Public/DigitalCard';

// Landing Layout Wrap
const LandingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-slate-50 text-slate-800 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500 mr-2"></div>
        <span>Verifying auth status...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing site routes */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* Public Digital NFC Card View */}
          <Route path="/c/:cardId" element={<DigitalCard />} />
          <Route path="/u/:cardId" element={<DigitalCard />} />

          {/* User Dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="mycard" element={<MyCard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="cards" element={<AdminCards />} />
          </Route>

          {/* 404 Redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
