import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../components/common/DashboardLayout';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  HeartHandshake, 
  Package, 
  Truck, 
  Utensils, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Search, 
  Navigation,
  ArrowRight
} from 'lucide-react';

export const NgoDashboard: React.FC = () => {
  const { currentUser, donations, acceptPickupByNgo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Available food donations that can be accepted
  const availableFood = donations.filter(d => d.status === 'Available');
  const activePickups = donations.filter(d => d.status === 'Pickup Assigned' || d.status === 'On the Way');
  const completedPickups = donations.filter(d => d.status === 'Delivered');
  const totalMealsReceived = completedPickups.reduce((acc, c) => acc + (c.unit === 'portions' ? c.quantity : c.quantity * 2), 0) + 1420;

  const filteredAvailable = availableFood.filter(d => {
    const matchesSearch = d.foodName.toLowerCase().includes(searchTerm.toLowerCase()) || d.restaurantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || d.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <DashboardLayout
      title={`NGO Portal: ${currentUser.organization || currentUser.name}`}
      subtitle="Discover and claim edible surplus food batches from partner restaurants across Bengaluru."
      breadcrumb="NGO Dashboard"
      actionButton={
        <Link
          to="/available-food"
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Browse All Food</span>
        </Link>
      }
    >
      {/* 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Nearby Donations
            </span>
            <div className="p-2 bg-green-50 text-green-700 rounded">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-green-700">
            {availableFood.length} <span className="text-sm font-normal text-gray-500">batches</span>
          </div>
          <div className="mt-1 text-xs text-green-800 font-medium">
            Within 8 km radius of your shelter
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Active Pickups
            </span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {activePickups.length} <span className="text-sm font-normal text-gray-500">in transit</span>
          </div>
          <div className="mt-1 text-xs text-blue-600 font-medium">
            Volunteers currently en route
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
            {completedPickups.length + 84} <span className="text-sm font-normal text-gray-500">total</span>
          </div>
          <div className="mt-1 text-xs text-gray-500 font-medium">
            Safely distributed to beneficiaries
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Meals Received
            </span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {totalMealsReceived.toLocaleString()} <span className="text-sm font-normal text-gray-500">meals</span>
          </div>
          <div className="mt-1 text-xs text-amber-700 font-medium">
            Serving children & community shelters
          </div>
        </div>

      </div>

      {/* Available Food Donations Table */}
      <div className="bg-white border border-gray-200 rounded-md shadow-xs">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Available Surplus Meals Ready for Pickup
            </h3>
            <p className="text-xs text-gray-500">
              Click "Accept Pickup" to claim a batch. Volunteer couriers are automatically notified to dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search food or restaurant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-xs border border-gray-300 rounded px-2.5 py-1.5 pl-8 w-44 sm:w-52 focus:border-green-600"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs border border-gray-300 rounded px-2.5 py-1.5 bg-white text-gray-700"
            >
              <option value="All">All Categories</option>
              <option value="Cooked Meals">Cooked Meals</option>
              <option value="Bakery & Bread">Bakery & Bread</option>
              <option value="Fresh Produce">Fresh Produce</option>
              <option value="Dairy Products">Dairy Products</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Food Item</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Restaurant & Address</th>
                <th className="py-3 px-4">Distance</th>
                <th className="py-3 px-4">Time Remaining</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAvailable.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No new unclaimed donations right now. Check back shortly or view "Active Pickups".
                  </td>
                </tr>
              ) : (
                filteredAvailable.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900">{item.foodName}</div>
                      <div className="text-[11px] text-gray-500">{item.category} • {item.dietaryType}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-800">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-900">{item.restaurantName}</div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-1 truncate max-w-xs">
                        <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="truncate">{item.pickupAddress}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-gray-800">
                        <Navigation className="w-3.5 h-3.5 text-green-600" />
                        {item.distanceKm} km
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-amber-700 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{item.expiresInHours}h left</span>
                      </div>
                      <div className="text-[10px] text-gray-500">Expires {item.expiryTime}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => acceptPickupByNgo(item.id, currentUser.organization || 'Feeding Hands Foundation')}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold shadow-xs transition-colors"
                      >
                        Accept Pickup
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Currently In-Progress Pickups */}
      <div className="bg-white border border-gray-200 rounded-md p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-green-600" />
            <span>Active Pickups Claimed by Your Organization</span>
          </h3>
          <Link to="/tracking" className="text-xs font-semibold text-green-700 hover:underline">
            Open Live GPS Tracking →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activePickups.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded p-4 bg-gray-50/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-medium text-gray-500">{item.id}</span>
                  <StatusBadge status={item.status} size="sm" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900">{item.foodName}</h4>
                <p className="text-xs text-gray-600 mt-1">
                  From: <strong>{item.restaurantName}</strong> ({item.pickupAddress.split(',')[0]})
                </p>
                <div className="mt-2 text-xs text-gray-700 space-y-1 bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between">
                    <span>Assigned Courier:</span>
                    <span className="font-semibold text-gray-900">{item.assignedVolunteerName || 'Volunteer En Route'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Arrival:</span>
                    <span className="font-semibold text-green-700">~{item.estimatedDeliveryTime || '20 mins'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                <span className="text-gray-500">{item.quantity} {item.unit}</span>
                <Link
                  to="/tracking"
                  className="font-medium text-green-700 hover:text-green-800"
                >
                  View Route Timeline →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
