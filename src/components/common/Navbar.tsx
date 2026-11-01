import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  UtensilsCrossed, 
  Bell, 
  Menu, 
  X, 
  UserCheck, 
  LogOut, 
  MapPin, 
  BarChart2, 
  Compass, 
  Layers, 
  ChevronDown 
} from 'lucide-react';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { currentUser, switchRole, notifications, backendOnline } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getDashboardPath = (role: UserRole) => {
    switch (role) {
      case 'restaurant': return '/restaurant/dashboard';
      case 'ngo': return '/ngo/dashboard';
      case 'volunteer': return '/volunteer/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/available-food';
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Available Food', path: '/available-food' },
    { label: 'AI Optimization', path: '/ai-optimization' },
    { label: 'Live Tracking', path: '/tracking' },
    { label: 'Analytics', path: '/analytics' },
  ];

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setRoleDropdownOpen(false);
    navigate(getDashboardPath(role));
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      {/* Top Student Notice / Demo Bar */}
      <div className="bg-green-50 border-b border-green-100 px-4 py-1.5 text-xs text-green-900 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold px-1.5 py-0.5 rounded bg-green-200 text-green-800 text-[11px]">B.Tech Final Project</span>
          <span className="hidden sm:inline">AI-Assisted Food Surplus Redistribution System</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border bg-white shadow-2xs">
            <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="text-gray-700">{backendOnline ? 'FastAPI + SQLite: Online' : 'Connecting Backend...'}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-600">Active City: <strong>Bengaluru, KA</strong></span>
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-green-300 text-green-800 hover:bg-green-50 font-medium transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-green-600" />
              <span>Role: <strong className="capitalize">{currentUser.role}</strong></span>
              <ChevronDown className="w-3 h-3 text-green-700" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 text-gray-800 text-xs">
                <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  Switch Demo Persona
                </div>
                <button
                  onClick={() => handleRoleSelect('restaurant')}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between ${currentUser.role === 'restaurant' ? 'bg-green-50 font-semibold text-green-800' : ''}`}
                >
                  <span>Restaurant (Chef Rajesh)</span>
                  {currentUser.role === 'restaurant' && <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>}
                </button>
                <button
                  onClick={() => handleRoleSelect('ngo')}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between ${currentUser.role === 'ngo' ? 'bg-green-50 font-semibold text-green-800' : ''}`}
                >
                  <span>NGO (Feeding Hands)</span>
                  {currentUser.role === 'ngo' && <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>}
                </button>
                <button
                  onClick={() => handleRoleSelect('volunteer')}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between ${currentUser.role === 'volunteer' ? 'bg-green-50 font-semibold text-green-800' : ''}`}
                >
                  <span>Volunteer (Rahul S.)</span>
                  {currentUser.role === 'volunteer' && <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>}
                </button>
                <button
                  onClick={() => handleRoleSelect('admin')}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between ${currentUser.role === 'admin' ? 'bg-green-50 font-semibold text-green-800' : ''}`}
                >
                  <span>Admin Panel (V. Murthy)</span>
                  {currentUser.role === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 text-gray-900 group">
            <div className="w-9 h-9 rounded-md bg-green-600 flex items-center justify-center text-white shadow-xs group-hover:bg-green-700 transition-colors">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-gray-900 block leading-tight">
                AI Food Waste <span className="text-green-600">Platform</span>
              </span>
              <span className="text-[10px] text-gray-500 block leading-none">
                Smart Food Redistribution
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'text-green-700 bg-green-50 font-semibold'
                      : 'text-gray-700 hover:text-green-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Notifications, Dashboard Button, Profile */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/notifications"
              className="relative p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-gray-50 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link
              to={getDashboardPath(currentUser.role)}
              className="px-3.5 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-2 pl-2 text-left border-l border-gray-200 hover:opacity-85"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 text-gray-700 font-semibold text-xs flex items-center justify-center">
                {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/notifications"
              className="relative p-2 text-gray-600 hover:text-green-700"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.path
                  ? 'text-green-700 bg-green-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-200 flex flex-col gap-2">
            <Link
              to={getDashboardPath(currentUser.role)}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700"
            >
              {currentUser.role.toUpperCase()} Dashboard
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Authentication & Switch User
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
