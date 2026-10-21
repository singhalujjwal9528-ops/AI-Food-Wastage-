import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Utensils, 
  Building, 
  CheckCircle, 
  LayoutGrid, 
  List, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { FoodCategory } from '../types';

export const FoodAvailabilityPage: React.FC = () => {
  const { donations, acceptPickupByNgo, currentUser } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxDistance, setMaxDistance] = useState<number>(15);
  const [expiryFilter, setExpiryFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter food donations
  const availableItems = donations.filter(item => {
    // Only available or pickup assigned
    const isAvail = item.status === 'Available';
    const matchesSearch = item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDist = item.distanceKm <= maxDistance;

    let matchesExpiry = true;
    if (expiryFilter === 'under2') matchesExpiry = item.expiresInHours <= 2;
    else if (expiryFilter === 'under4') matchesExpiry = item.expiresInHours <= 4;
    else if (expiryFilter === 'today') matchesExpiry = item.expiresInHours <= 12;

    return isAvail && matchesSearch && matchesCat && matchesDist && matchesExpiry;
  });

  return (
    <div className="bg-white min-h-[calc(100vh-4rem)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Page Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-green-50 text-green-800 text-xs font-semibold mb-1 border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
              Live Available Food Feed • Bengaluru Area
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Discover Available Food Donations
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Surplus edible meals and produce contributed by partner restaurants, banquets, and cafes.
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs text-gray-500 font-medium">Layout:</span>
            <div className="flex items-center border border-gray-200 rounded p-0.5 bg-gray-50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs ${viewMode === 'grid' ? 'bg-white text-green-700 shadow-xs font-medium' : 'text-gray-500'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded text-xs ${viewMode === 'table' ? 'bg-white text-green-700 shadow-xs font-medium' : 'text-gray-500'}`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-1 text-xs font-bold text-gray-700 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-green-600" />
            <span>Search & Filter Criteria</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">
                Keyword / Food Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Rice, Bread, Paneer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-3 py-2 pl-8 focus:border-green-600"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">
                Food Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-2 bg-white text-gray-800 focus:border-green-600"
              >
                <option value="All">All Categories</option>
                <option value="Cooked Meals">Cooked Meals</option>
                <option value="Bakery & Bread">Bakery & Bread</option>
                <option value="Fresh Produce">Fresh Produce</option>
                <option value="Dairy Products">Dairy Products</option>
                <option value="Packaged Foods">Packaged Foods</option>
              </select>
            </div>

            {/* Distance Filter */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase">
                  Max Distance: {maxDistance} km
                </label>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-green-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>1 km</span>
                <span>10 km</span>
                <span>20 km</span>
              </div>
            </div>

            {/* Expiry Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">
                Expiry Shelf-Life
              </label>
              <select
                value={expiryFilter}
                onChange={(e) => setExpiryFilter(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-2 bg-white text-gray-800 focus:border-green-600"
              >
                <option value="All">Any Shelf-Life</option>
                <option value="under2">Critical: Expires in &lt; 2 hours</option>
                <option value="under4">Moderate: Expires in &lt; 4 hours</option>
                <option value="today">Today's Batches (&lt; 12 hours)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-gray-600 px-1">
          <span>Found <strong>{availableItems.length}</strong> surplus batches available right now</span>
          <span className="text-[11px] text-gray-400">All listings verified under food safety guidelines</span>
        </div>

        {/* Content Display: Cards or Table */}
        {availableItems.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-md p-12 text-center text-gray-500 shadow-xs">
            <Utensils className="w-10 h-10 mx-auto text-gray-300 mb-3" />
            <h3 className="text-base font-bold text-gray-800">No Food Listings Found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              No surplus food matches your current search filters. Try widening your distance radius or selecting "All Categories".
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View of Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {availableItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-md p-5 shadow-xs flex flex-col justify-between hover:border-green-400 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {item.category}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      item.dietaryType === 'Veg' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {item.dietaryType}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 leading-snug">
                    {item.foodName}
                  </h3>

                  <div className="my-3 p-2.5 bg-gray-50 rounded border border-gray-100 space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5 text-gray-800 font-medium">
                      <Building className="w-3.5 h-3.5 text-green-700 shrink-0" />
                      <span className="truncate">{item.restaurantName}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{item.pickupAddress}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200/60">
                      <span className="font-semibold text-gray-700">
                        Distance: {item.distanceKm} km
                      </span>
                      <span className="flex items-center gap-1 text-amber-700 font-semibold">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Expires {item.expiryTime.split(',')[1] || item.expiryTime}
                      </span>
                    </div>
                  </div>

                  {item.additionalNotes && (
                    <p className="text-[11px] text-gray-500 italic line-clamp-2 mb-3">
                      "{item.additionalNotes}"
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block leading-tight">Available Quantity</span>
                    <span className="text-base font-bold text-green-700">
                      {item.quantity} {item.unit}
                    </span>
                  </div>

                  <button
                    onClick={() => acceptPickupByNgo(item.id, currentUser.organization || 'Verified Partner NGO')}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded shadow-xs transition-colors"
                  >
                    Request Food
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white border border-gray-200 rounded-md shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Food Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Available Qty</th>
                  <th className="py-3 px-4">Restaurant</th>
                  <th className="py-3 px-4">Distance</th>
                  <th className="py-3 px-4">Expiry Time</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {availableItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      {item.foodName}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {item.category} ({item.dietaryType})
                    </td>
                    <td className="py-3.5 px-4 font-bold text-green-700">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="py-3.5 px-4 text-gray-800">
                      <div>{item.restaurantName}</div>
                      <div className="text-[11px] text-gray-500">{item.pickupAddress.split(',')[0]}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-700">
                      {item.distanceKm} km
                    </td>
                    <td className="py-3.5 px-4 text-amber-700 font-medium">
                      {item.expiryTime}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => acceptPickupByNgo(item.id, currentUser.organization || 'Verified Partner NGO')}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded shadow-xs"
                      >
                        Request Food
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};
