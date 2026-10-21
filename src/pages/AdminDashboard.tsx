import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../components/common/DashboardLayout';
import { StatusBadge } from '../components/common/StatusBadge';
import { mockUsers } from '../data/mockData';
import { 
  Users, 
  Building, 
  HeartHandshake, 
  Package, 
  Truck, 
  Utensils, 
  ShieldCheck, 
  UserCheck, 
  Search, 
  CheckCircle2, 
  XCircle,
  FileCheck
} from 'lucide-react';
import { User, UserRole } from '../types';

export const AdminDashboard: React.FC = () => {
  const { stats, donations, pickups, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'users' | 'donations' | 'approvals'>('users');
  const [userList, setUserList] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const activeDonationsCount = donations.filter(d => d.status === 'Available' || d.status === 'Pickup Assigned').length;
  const completedPickupsCount = donations.filter(d => d.status === 'Delivered').length + 84;

  const handleToggleVerification = (userId: string) => {
    setUserList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextState = !u.verified;
        showToast(`Verification status for ${u.name} set to ${nextState ? 'VERIFIED' : 'PENDING'}`, 'info');
        return { ...u, verified: nextState };
      }
      return u;
    }));
  };

  const filteredUsers = userList.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.organization || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Platform Administrator Center"
      subtitle="Central oversight of registered restaurants, verified NGOs, food distribution logs, and security audits."
      breadcrumb="Admin Panel"
      actionButton={
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-900 border border-green-200 rounded text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-green-700" />
          <span>System Healthy • Node Online</span>
        </div>
      }
    >
      {/* 6 Primary Admin Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-semibold uppercase">Total Users</span>
            <Users className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            {stats.activeRestaurantsCount + stats.partnerNgosCount + stats.activeVolunteersCount}
          </div>
          <span className="text-[10px] text-green-700 font-medium">All verified accounts</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-semibold uppercase">Restaurants</span>
            <Building className="w-3.5 h-3.5 text-green-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            {stats.activeRestaurantsCount}
          </div>
          <span className="text-[10px] text-gray-500">Commercial donors</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-semibold uppercase">NGOs</span>
            <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            {stats.partnerNgosCount}
          </div>
          <span className="text-[10px] text-gray-500">Community shelters</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-semibold uppercase">Active Donations</span>
            <Package className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-blue-700">
            {activeDonationsCount}
          </div>
          <span className="text-[10px] text-blue-600 font-medium">In active transit</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-semibold uppercase">Completed</span>
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            {completedPickupsCount}
          </div>
          <span className="text-[10px] text-emerald-700 font-medium">Confirmed dropoffs</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-semibold uppercase">Food Saved</span>
            <Utensils className="w-3.5 h-3.5 text-green-600" />
          </div>
          <div className="text-xl font-bold text-green-700">
            {stats.totalFoodSavedKg.toLocaleString()}
          </div>
          <span className="text-[10px] text-green-700 font-medium">kg total diverted</span>
        </div>

      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
            activeTab === 'users'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Registered Users & Entities ({userList.length})
        </button>

        <button
          onClick={() => setActiveTab('donations')}
          className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
            activeTab === 'donations'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Donation Batches ({donations.length})
        </button>

        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
            activeTab === 'approvals'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Verification Requests (2 Pending)
        </button>
      </div>

      {/* Tab 1: Users Directory */}
      {activeTab === 'users' && (
        <div className="bg-white border border-gray-200 rounded-md shadow-xs">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                User Accounts Directory
              </h3>
              <p className="text-xs text-gray-500">
                Manage roles, account verifications, and contact registries.
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search user or organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-xs border border-gray-300 rounded px-3 py-1.5 pl-8 w-56 focus:border-green-600"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">User / Contact</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Organization & City</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4">FSSAI / Trust Status</th>
                  <th className="py-3 px-4 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900">{u.name}</div>
                      <div className="text-[11px] text-gray-500">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4 capitalize font-medium text-gray-800">
                      <span className="px-2 py-0.5 rounded bg-gray-100 border border-gray-200 text-[11px]">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">
                      <div className="font-medium text-gray-900">{u.organization || 'Individual'}</div>
                      <div className="text-[11px] text-gray-500">{u.city}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-600">
                      {u.phone}
                    </td>
                    <td className="py-3.5 px-4">
                      {u.verified ? (
                        <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-green-200">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-200">
                          Pending Audit
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleToggleVerification(u.id)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded border transition-colors ${
                          u.verified
                            ? 'border-gray-300 text-gray-600 hover:bg-gray-50'
                            : 'border-green-600 bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {u.verified ? 'Revoke Verification' : 'Approve Account'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: All Donations Audit */}
      {activeTab === 'donations' && (
        <div className="bg-white border border-gray-200 rounded-md shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-900">
              Complete Food Batch Audit Trail
            </h3>
            <p className="text-xs text-gray-500">
              System-wide log of all active and historical food donations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Batch ID</th>
                  <th className="py-3 px-4">Food Item</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Restaurant</th>
                  <th className="py-3 px-4">Claimed By</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-gray-800">{d.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">{d.foodName}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-800">{d.quantity} {d.unit}</td>
                    <td className="py-3.5 px-4 text-gray-700">{d.restaurantName}</td>
                    <td className="py-3.5 px-4 text-gray-700">{d.assignedNgoName || 'Unassigned'}</td>
                    <td className="py-3.5 px-4"><StatusBadge status={d.status} size="sm" /></td>
                    <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">{d.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Verification Approvals */}
      {activeTab === 'approvals' && (
        <div className="bg-white border border-gray-200 rounded-md p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gray-900">
            Pending Entity Verifications
          </h3>
          <p className="text-xs text-gray-500">
            Review food hygiene certifications and NGO registration trusts before enabling automated pickup access.
          </p>

          <div className="space-y-3">
            <div className="border border-gray-200 rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">Grand Saravana Bhavan</span>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-bold">Restaurant</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">FSSAI License #11223004000981 • MG Road, Bengaluru</p>
                <p className="text-[11px] text-gray-500">Uploaded commercial food safety compliance certificate.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Grand Saravana Bhavan approved as verified donor!', 'success')}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold shadow-xs"
                >
                  Approve Entity
                </button>
                <button
                  onClick={() => showToast('Application flagged for manual inspection.', 'info')}
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-xs hover:bg-gray-100"
                >
                  Request Docs
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">Hope Children Welfare Trust</span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold">NGO Shelter</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Section 12A / 80G Certified • Shanti Nagar, Bengaluru</p>
                <p className="text-[11px] text-gray-500">Shelter capacity: 60 children and senior residents.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Hope Children Welfare Trust approved!', 'success')}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold shadow-xs"
                >
                  Approve Entity
                </button>
                <button
                  onClick={() => showToast('Application flagged for manual inspection.', 'info')}
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-xs hover:bg-gray-100"
                >
                  Request Docs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
