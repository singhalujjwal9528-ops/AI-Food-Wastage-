import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../components/common/DashboardLayout';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  PlusCircle, 
  Package, 
  Truck, 
  Calendar, 
  Utensils, 
  Clock, 
  ArrowUpRight, 
  CheckCircle, 
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';

export const RestaurantDashboard: React.FC = () => {
  const { currentUser, donations } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter donations relevant to this restaurant or all in demo mode
  const restaurantDonations = donations.filter(d => 
    currentUser.role === 'restaurant' ? (d.restaurantId === currentUser.id || d.restaurantName.includes('Annapurna') || true) : true
  );

  const activeDonationsCount = restaurantDonations.filter(d => d.status === 'Available' || d.status === 'Pickup Assigned').length;
  const completedPickupsCount = restaurantDonations.filter(d => d.status === 'Delivered').length;
  const totalKgDonated = restaurantDonations.reduce((acc, curr) => acc + (curr.unit === 'kg' ? curr.quantity : Math.round(curr.quantity * 0.45)), 0) + 720;
  const foodSavedThisMonthKg = Math.round(totalKgDonated * 0.35);

  const filteredDonations = restaurantDonations.filter(d => {
    const matchesSearch = d.foodName.toLowerCase().includes(searchTerm.toLowerCase()) || d.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout
      title={`Welcome, ${currentUser.name}`}
      subtitle={`${currentUser.organization || 'Annapurna Kitchen'} • Live Restaurant Operations Center`}
      breadcrumb="Restaurant Dashboard"
      actionButton={
        <Link
          to="/restaurant/add-food"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md shadow-xs transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Donation</span>
        </Link>
      }
    >
      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Food Donated
            </span>
            <div className="p-2 bg-green-50 text-green-700 rounded">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {totalKgDonated.toLocaleString()} <span className="text-sm font-normal text-gray-500">kg</span>
          </div>
          <div className="mt-1 text-xs text-green-700 font-medium flex items-center gap-1">
            <span>↑ 14% from previous month</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Active Donations
            </span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {activeDonationsCount} <span className="text-sm font-normal text-gray-500">listings</span>
          </div>
          <div className="mt-1 text-xs text-blue-600 font-medium">
            Available for immediate NGO dispatch
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Completed Pickups
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {completedPickupsCount + 38} <span className="text-sm font-normal text-gray-500">batches</span>
          </div>
          <div className="mt-1 text-xs text-gray-500 font-medium">
            100% verified delivery receipts
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Saved This Month
            </span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {foodSavedThisMonthKg} <span className="text-sm font-normal text-gray-500">kg</span>
          </div>
          <div className="mt-1 text-xs text-amber-700 font-medium">
            ~{Math.round(foodSavedThisMonthKg * 2.2)} meals redistributed
          </div>
        </div>

      </div>

      {/* Quick Action Banner */}
      <div className="bg-green-50 border border-green-200 rounded-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-green-950">
              Lunch Surplus Upload Reminder
            </h4>
            <p className="text-xs text-green-800">
              Post daily kitchen surplus by 2:30 PM to allow volunteers to pick up before dinner distribution.
            </p>
          </div>
        </div>
        <Link
          to="/restaurant/add-food"
          className="shrink-0 px-3.5 py-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-medium rounded transition-colors"
        >
          Add Surplus Meal Now
        </Link>
      </div>

      {/* Recent Food Donations Table Section */}
      <div className="bg-white border border-gray-200 rounded-md shadow-xs">
        {/* Table Header Controls */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Recent Food Donations
            </h3>
            <p className="text-xs text-gray-500">
              Real-time status of food batches listed by your restaurant.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search food item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-xs border border-gray-300 rounded px-2.5 py-1.5 pl-8 w-44 sm:w-56 focus:border-green-600"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-gray-300 rounded px-2.5 py-1.5 bg-white text-gray-700"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Pickup Assigned">Pickup Assigned</option>
              <option value="On the Way">On the Way</option>
              <option value="Delivered">Delivered</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        {/* The Clean Student-style Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Donation ID</th>
                <th className="py-3 px-4">Food Item</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Expiry / Shelf-life</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Pickup Logistics</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No matching food donations found. Click "Create New Donation" to add your first batch.
                  </td>
                </tr>
              ) : (
                filteredDonations.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-gray-700">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-900">
                      <div className="font-semibold text-gray-900">{item.foodName}</div>
                      <div className="text-[11px] text-gray-500">{item.category} • {item.dietaryType}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-800">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      <div className="flex items-center gap-1 text-gray-800 font-medium">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{item.expiryTime}</span>
                      </div>
                      <span className="text-[11px] text-gray-500">
                        {item.expiresInHours > 0 ? `${item.expiresInHours}h remaining` : 'Expired'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {item.assignedVolunteerName ? (
                        <div>
                          <div className="font-medium text-gray-900">{item.assignedVolunteerName}</div>
                          <div className="text-[11px] text-gray-500">{item.assignedNgoName || 'Destination NGO'}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Awaiting NGO assignment</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to="/tracking"
                          className="px-2 py-1 rounded border border-gray-300 text-gray-700 hover:text-green-700 hover:border-green-400 text-[11px] font-medium transition-colors"
                        >
                          Track
                        </Link>
                        <Link
                          to="/ai-optimization"
                          className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-medium transition-colors"
                        >
                          AI Route
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-gray-50/50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
          <span>Showing {filteredDonations.length} records</span>
          <Link to="/donation-history" className="text-green-700 font-semibold hover:underline">
            View Complete Donation Archive →
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};
