import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { RestaurantDashboard } from './pages/RestaurantDashboard';
import { AddSurplusFoodPage } from './pages/AddSurplusFoodPage';
import { NgoDashboard } from './pages/NgoDashboard';
import { VolunteerDashboard } from './pages/VolunteerDashboard';
import { AiOptimizationPage } from './pages/AiOptimizationPage';
import { FoodAvailabilityPage } from './pages/FoodAvailabilityPage';
import { LiveTrackingPage } from './pages/LiveTrackingPage';
import { NotificationCenter } from './pages/NotificationCenter';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { DonationHistoryPage } from './pages/DonationHistoryPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

export function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-green-100 selection:text-green-900">
          <Navbar />
          
          <div className="flex-1">
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/available-food" element={<FoodAvailabilityPage />} />
              <Route path="/ai-optimization" element={<AiOptimizationPage />} />
              <Route path="/tracking" element={<LiveTrackingPage />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/donation-history" element={<DonationHistoryPage />} />
              <Route path="/notifications" element={<NotificationCenter />} />
              <Route path="/settings" element={<ProfileSettingsPage />} />

              {/* Restaurant Portal */}
              <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
              <Route path="/restaurant/add-food" element={<AddSurplusFoodPage />} />
              <Route path="/restaurant/donations" element={<RestaurantDashboard />} />

              {/* NGO Portal */}
              <Route path="/ngo/dashboard" element={<NgoDashboard />} />
              <Route path="/ngo/pickups" element={<LiveTrackingPage />} />

              {/* Volunteer Portal */}
              <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
              <Route path="/volunteer/available" element={<VolunteerDashboard />} />

              {/* Admin Portal */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
