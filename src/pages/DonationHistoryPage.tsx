import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../components/common/DashboardLayout';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Calendar, 
  Building, 
  HeartHandshake,
  CheckCircle,
  FileText
} from 'lucide-react';
import { DonationStatus } from '../types';

export const DonationHistoryPage: React.FC = () => {
  const { donations, showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState<'createdAt' | 'quantity' | 'foodName'>('createdAt');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = donations.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.assignedNgoName || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortField === 'quantity') {
      return sortAsc ? a.quantity - b.quantity : b.quantity - a.quantity;
    }
    if (sortField === 'foodName') {
      return sortAsc ? a.foodName.localeCompare(b.foodName) : b.foodName.localeCompare(a.foodName);
    }
    // Default by date
    return sortAsc ? a.createdAt.localeCompare(b.createdAt) : b.createdAt.localeCompare(a.createdAt);
  });

  const handleExportCSV = () => {
    showToast('Exporting donation ledger to CSV...', 'info');
  };

  return (
    <DashboardLayout
      title="Surplus Food Donation Ledger"
      subtitle="Complete chronological audit trail of all food redistribution batches across Bengaluru."
      breadcrumb="Donation History"
      actionButton={
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded shadow-xs transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Export Ledger CSV</span>
        </button>
      }
    >
      {/* Search, Filter, Sort Controls */}
      <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by ID, food item, restaurant or NGO..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-2 pl-8 focus:border-green-600"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs border border-gray-300 rounded px-2 py-1.5 bg-white text-gray-800"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Pickup Assigned">Pickup Assigned</option>
                <option value="On the Way">On the Way</option>
                <option value="Delivered">Delivered</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-600">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <span>Sort:</span>
              <button
                onClick={() => {
                  if (sortField === 'createdAt') setSortAsc(!sortAsc);
                  else { setSortField('createdAt'); setSortAsc(false); }
                }}
                className={`px-2 py-1.5 rounded border text-xs ${sortField === 'createdAt' ? 'border-green-600 bg-green-50 text-green-900 font-semibold' : 'border-gray-200'}`}
              >
                Date {sortField === 'createdAt' && (sortAsc ? '↑' : '↓')}
              </button>
              <button
                onClick={() => {
                  if (sortField === 'quantity') setSortAsc(!sortAsc);
                  else { setSortField('quantity'); setSortAsc(false); }
                }}
                className={`px-2 py-1.5 rounded border text-xs ${sortField === 'quantity' ? 'border-green-600 bg-green-50 text-green-900 font-semibold' : 'border-gray-200'}`}
              >
                Qty {sortField === 'quantity' && (sortAsc ? '↑' : '↓')}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="bg-white border border-gray-200 rounded-md shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Donation ID</th>
                <th className="py-3 px-4">Food Item & Category</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Restaurant Donor</th>
                <th className="py-3 px-4">Recipient NGO</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Pickup Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No donation records found matching criteria.
                  </td>
                </tr>
              ) : (
                sorted.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-gray-800">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900">{item.foodName}</div>
                      <div className="text-[11px] text-gray-500">{item.category} • {item.dietaryType}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-900">{item.restaurantName}</div>
                      <div className="text-[11px] text-gray-500 truncate max-w-xs">{item.pickupAddress.split(',')[0]}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      {item.assignedNgoName ? (
                        <div className="font-medium text-gray-900">{item.assignedNgoName}</div>
                      ) : (
                        <span className="text-gray-400 italic">Unclaimed</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                      {item.createdAt}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.status} size="sm" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-gray-50/50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
          <span>Showing {sorted.length} entries out of {donations.length} total platform records</span>
          <span className="text-green-700 font-medium">FSSAI Certified Audit Standard</span>
        </div>
      </div>
    </DashboardLayout>
  );
};
