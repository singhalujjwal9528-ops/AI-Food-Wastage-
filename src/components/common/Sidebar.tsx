import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Truck,
  Bell,
  BarChart3,
  UserCog,
  LogOut,
  Navigation,
  History,
  Users,
  Building,
  HeartHandshake,
  CheckCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onCloseMobile }) => {
  const { currentUser, switchRole, showToast } = useApp();
  const navigate = useNavigate();

  const getLinksForRole = (role: UserRole) => {
    switch (role) {
      case 'restaurant':
        return [
          { name: 'Dashboard', path: '/restaurant/dashboard', icon: LayoutDashboard },
          { name: 'Add Surplus Food', path: '/restaurant/add-food', icon: PlusCircle },
          { name: 'My Donations', path: '/restaurant/donations', icon: Package },
          { name: 'Pickup Tracking', path: '/tracking', icon: Truck },
          { name: 'Notifications', path: '/notifications', icon: Bell },
          { name: 'Reports & Analytics', path: '/analytics', icon: BarChart3 },
          { name: 'Profile & Settings', path: '/settings', icon: UserCog },
        ];
      case 'ngo':
        return [
          { name: 'Dashboard', path: '/ngo/dashboard', icon: LayoutDashboard },
          { name: 'Available Food', path: '/available-food', icon: Package },
          { name: 'My Pickups', path: '/ngo/pickups', icon: Truck },
          { name: 'Route Optimization', path: '/ai-optimization', icon: Navigation },
          { name: 'Donation History', path: '/donation-history', icon: History },
          { name: 'Notifications', path: '/notifications', icon: Bell },
          { name: 'Reports & Impact', path: '/analytics', icon: BarChart3 },
          { name: 'Profile & Settings', path: '/settings', icon: UserCog },
        ];
      case 'volunteer':
        return [
          { name: 'Dashboard', path: '/volunteer/dashboard', icon: LayoutDashboard },
          { name: 'Available Pickups', path: '/volunteer/dashboard#available', icon: Package },
          { name: 'Active Delivery', path: '/tracking', icon: Truck },
          { name: 'AI Route Guide', path: '/ai-optimization', icon: Navigation },
          { name: 'Notifications', path: '/notifications', icon: Bell },
          { name: 'Profile & Settings', path: '/settings', icon: UserCog },
        ];
      case 'admin':
        return [
          { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
          { name: 'Users Directory', path: '/admin/dashboard#users', icon: Users },
          { name: 'Restaurants', path: '/admin/dashboard#restaurants', icon: Building },
          { name: 'NGOs', path: '/admin/dashboard#ngos', icon: HeartHandshake },
          { name: 'Donations Audit', path: '/donation-history', icon: Package },
          { name: 'Live Pickups', path: '/tracking', icon: Truck },
          { name: 'Analytics', path: '/analytics', icon: BarChart3 },
          { name: 'Settings', path: '/settings', icon: UserCog },
        ];
      default:
        return [
          { name: 'Available Food', path: '/available-food', icon: Package },
          { name: 'Track Delivery', path: '/tracking', icon: Truck },
          { name: 'Settings', path: '/settings', icon: UserCog },
        ];
    }
  };

  const navLinks = getLinksForRole(currentUser.role);

  const handleLogout = () => {
    showToast('Logged out of session. Switched to public guest mode.', 'info');
    navigate('/login');
  };

  const content = (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* User Persona Profile in Sidebar */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-green-100 text-green-800 font-bold flex items-center justify-center border border-green-200 text-sm">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 leading-tight truncate max-w-[130px]">
                {currentUser.name}
              </h4>
              <span className="text-[11px] font-medium text-green-700 uppercase tracking-wide">
                {currentUser.role} Account
              </span>
            </div>
          </div>
          {onCloseMobile && (
            <button onClick={onCloseMobile} className="md:hidden text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="mt-2 text-xs text-gray-500 truncate">
          {currentUser.organization || currentUser.address}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
          Navigation
        </div>
        {navLinks.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors font-medium ${
                isActive
                  ? 'bg-green-50 text-green-800 border-l-2 border-green-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-4 h-4 shrink-0 text-gray-500 group-hover:text-gray-700" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Quick Viva / Project Info Helper Box */}
      <div className="p-3 m-3 bg-green-50/70 border border-green-200 rounded-md text-xs text-gray-700">
        <div className="flex items-center gap-1.5 font-semibold text-green-900 mb-1">
          <HelpCircle className="w-3.5 h-3.5 text-green-700" />
          <span>Project Demonstration</span>
        </div>
        <p className="text-[11px] text-gray-600 leading-normal">
          Designed with clean modules: Restaurant upload, NGO claim, Volunteer routing & AI freshness prediction.
        </p>
      </div>

      {/* Logout Action */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out / Switch</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/30" onClick={onCloseMobile} />
          <div className="relative w-72 max-w-xs h-full bg-white z-10 shadow-xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
