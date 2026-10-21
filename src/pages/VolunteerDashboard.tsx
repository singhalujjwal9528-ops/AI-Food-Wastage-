import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../components/common/DashboardLayout';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Navigation, 
  AlertCircle, 
  Building, 
  HeartHandshake, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { PickupTask } from '../types';

export const VolunteerDashboard: React.FC = () => {
  const { currentUser, pickups, acceptPickupByVolunteer, updatePickupStatus, showToast } = useApp();
  const navigate = useNavigate();

  // Pickups available for courier claim
  const availablePickups = pickups.filter(p => p.status === 'Available');

  // Active pickup for the volunteer
  const activePickup = pickups.find(p => 
    (p.status === 'Pickup Assigned' || p.status === 'Picked Up' || p.status === 'On the Way') &&
    (p.volunteerName?.includes(currentUser.name) || true)
  );

  const completedCount = pickups.filter(p => p.status === 'Delivered').length + 18;
  const distanceCoveredKm = completedCount * 4.6 + 12.4;

  const handleMarkPickedUp = (pickupId: string) => {
    updatePickupStatus(pickupId, 'On the Way');
    showToast('Status updated: Food collected from restaurant. On the way to NGO!', 'success');
  };

  const handleMarkDelivered = (pickupId: string) => {
    updatePickupStatus(pickupId, 'Delivered');
    showToast('Delivery completed! Receipt logged and donor verified.', 'success');
  };

  return (
    <DashboardLayout
      title={`Volunteer Dispatch: ${currentUser.name}`}
      subtitle="Accept nearby delivery missions, optimize commute routes, and bridge surplus meals to hungry families."
      breadcrumb="Volunteer Hub"
      actionButton={
        <Link
          to="/ai-optimization"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
        >
          <Navigation className="w-4 h-4" />
          <span>Launch AI Route Navigator</span>
        </Link>
      }
    >
      {/* 4 Summary Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Available Pickups
            </span>
            <div className="p-2 bg-green-50 text-green-700 rounded">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {availablePickups.length} <span className="text-sm font-normal text-gray-500">routes</span>
          </div>
          <div className="mt-1 text-xs text-green-700 font-medium">
            Waiting for nearby rider pickup
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              My Active Pickup
            </span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-blue-700">
            {activePickup ? '1 In Progress' : '0 Idle'}
          </div>
          <div className="mt-1 text-xs text-blue-600 font-medium">
            {activePickup ? `${activePickup.distanceKm} km route underway` : 'Ready to accept new run'}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Completed Deliveries
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {completedCount} <span className="text-sm font-normal text-gray-500">drop-offs</span>
          </div>
          <div className="mt-1 text-xs text-gray-500 font-medium">
            Verified NGO signatures
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Distance Covered
            </span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded">
              <Navigation className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {distanceCoveredKm.toFixed(1)} <span className="text-sm font-normal text-gray-500">km</span>
          </div>
          <div className="mt-1 text-xs text-amber-700 font-medium">
            ~{Math.round(distanceCoveredKm * 0.22)} kg carbon offset
          </div>
        </div>

      </div>

      {/* Active Delivery Highlight Banner / Action Box */}
      {activePickup && (
        <div className="bg-white border-2 border-green-600 rounded-md p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-ping"></span>
              <h3 className="text-base font-bold text-gray-900">
                Current Active Mission: {activePickup.id}
              </h3>
            </div>
            <StatusBadge status={activePickup.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Pickup From (Restaurant)
              </div>
              <p className="text-sm font-bold text-gray-900">{activePickup.restaurantName}</p>
              <p className="text-xs text-gray-600 mt-0.5">{activePickup.restaurantAddress}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Deliver To (NGO Destination)
              </div>
              <p className="text-sm font-bold text-gray-900">{activePickup.ngoName}</p>
              <p className="text-xs text-gray-600 mt-0.5">{activePickup.ngoAddress}</p>
            </div>

            <div className="bg-green-50 p-3 rounded border border-green-200">
              <div className="text-[11px] font-semibold text-green-800 uppercase tracking-wider mb-1">
                Payload & Timing
              </div>
              <p className="text-sm font-bold text-gray-900">{activePickup.foodName}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-700 font-medium">
                <span>Distance: {activePickup.distanceKm} km</span>
                <span>•</span>
                <span>ETA: ~{activePickup.estimatedTimeMin} mins</span>
              </div>
            </div>
          </div>

          {/* Volunteer Action Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Safety reminder: Carry insulated delivery bag.</span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/ai-optimization"
                className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded"
              >
                View Route
              </Link>

              {activePickup.status === 'Pickup Assigned' && (
                <button
                  onClick={() => handleMarkPickedUp(activePickup.id)}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded shadow-xs"
                >
                  Mark Picked Up
                </button>
              )}

              {(activePickup.status === 'Picked Up' || activePickup.status === 'On the Way') && (
                <button
                  onClick={() => handleMarkDelivered(activePickup.id)}
                  className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded shadow-xs"
                >
                  Mark Delivered (Complete)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Available Pickups Task List */}
      <div className="bg-white border border-gray-200 rounded-md shadow-xs">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Available Delivery Tasks in Bengaluru
            </h3>
            <p className="text-xs text-gray-500">
              Select an unclaimed route to assist restaurant surplus redistribution.
            </p>
          </div>
          <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {availablePickups.length} Open Tasks
          </span>
        </div>

        <div className="divide-y divide-gray-200">
          {availablePickups.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-500">
              No new unclaimed pickups right now. All active batches are currently being couriered!
            </div>
          ) : (
            availablePickups.map((task) => (
              <div key={task.id} className="p-4 sm:p-5 hover:bg-gray-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium text-gray-500">{task.id}</span>
                    <span className="font-semibold text-sm text-gray-900">{task.foodName}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                      Freshness: {task.freshnessScore}%
                    </span>
                  </div>

                  {/* Route points */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
                    <div className="flex items-center gap-1 font-medium">
                      <Building className="w-3.5 h-3.5 text-green-600" />
                      <span>{task.restaurantName}</span>
                    </div>
                    <span className="text-gray-400">→</span>
                    <div className="flex items-center gap-1 font-medium">
                      <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
                      <span>{task.ngoName}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span>Distance: <strong className="text-gray-800">{task.distanceKm} km</strong></span>
                    <span>•</span>
                    <span>Est. Time: <strong className="text-gray-800">~{task.estimatedTimeMin} mins</strong></span>
                    <span>•</span>
                    <span>Traffic: <strong className="text-gray-800">{task.trafficCondition}</strong></span>
                    <span>•</span>
                    <span>Pickup Window: <strong className="text-gray-800">{task.pickupTime}</strong></span>
                  </div>
                </div>

                {/* Task Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to="/ai-optimization"
                    className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-semibold transition-colors"
                  >
                    View Route
                  </Link>
                  <button
                    onClick={() => acceptPickupByVolunteer(task.id, currentUser.name)}
                    className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold shadow-xs transition-colors"
                  >
                    Accept Pickup
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
