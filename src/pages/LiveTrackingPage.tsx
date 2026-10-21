import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../components/common/DashboardLayout';
import { MapPlaceholder } from '../components/common/MapPlaceholder';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Building, 
  HeartHandshake, 
  Phone, 
  ShieldCheck, 
  Navigation,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { DonationStatus } from '../types';

export const LiveTrackingPage: React.FC = () => {
  const { pickups, donations } = useApp();

  // Find all active or trackable pickups
  const trackablePickups = pickups.length > 0 ? pickups : [
    {
      id: 'PKP-802',
      donationId: 'DON-2026-104',
      foodName: 'Vegetable Dum Biryani with Mixed Raita (55 portions)',
      quantity: '55 portions',
      restaurantName: 'Biryani Central Kitchen',
      restaurantAddress: '7th Sector, HSR Layout, Bengaluru',
      ngoName: 'Roti Bank Trust',
      ngoAddress: '22, Richmond Town Community Hall, Bengaluru',
      volunteerName: 'Rahul Sharma',
      distanceKm: 4.8,
      estimatedTimeMin: 22,
      pickupTime: '12:35 PM',
      status: 'On the Way' as DonationStatus,
      urgencyLevel: 'High' as const,
      trafficCondition: 'Moderate' as const,
      freshnessScore: 84,
    }
  ];

  const [selectedPickupId, setSelectedPickupId] = useState<string>(trackablePickups[0].id);
  const activeTask = trackablePickups.find(p => p.id === selectedPickupId) || trackablePickups[0];

  // 5 Status Steps: Donation Created -> Pickup Assigned -> Food Picked Up -> On the Way -> Delivered
  const steps = [
    { label: 'Donation Created', statusKey: 'Available', time: '11:15 AM' },
    { label: 'Pickup Assigned', statusKey: 'Pickup Assigned', time: '11:40 AM' },
    { label: 'Food Picked Up', statusKey: 'Picked Up', time: '12:05 PM' },
    { label: 'On the Way', statusKey: 'On the Way', time: '12:15 PM' },
    { label: 'Delivered', statusKey: 'Delivered', time: 'Est. 12:35 PM' },
  ];

  const getStepIndex = (status: DonationStatus) => {
    switch (status) {
      case 'Available': return 0;
      case 'Pickup Assigned': return 1;
      case 'Picked Up': return 2;
      case 'On the Way': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  const currentStepIdx = getStepIndex(activeTask.status);

  return (
    <DashboardLayout
      title="Live Pickup Tracking"
      subtitle="Real-time status tracking for volunteer couriers, restaurant dispatch, and community delivery."
      breadcrumb="Live Tracking"
    >
      {/* Active Task Selector Bar */}
      <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-green-600" />
          <div>
            <span className="text-xs font-semibold uppercase text-gray-500">Currently Tracking:</span>
            <span className="font-bold text-gray-900 ml-1.5">{activeTask.id} • {activeTask.foodName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Switch Task:</span>
          <select
            value={selectedPickupId}
            onChange={(e) => setSelectedPickupId(e.target.value)}
            className="text-xs border border-gray-300 rounded px-2.5 py-1.5 bg-white text-gray-800"
          >
            {trackablePickups.map(p => (
              <option key={p.id} value={p.id}>
                {p.id} - {p.restaurantName.split(' ')[0]} ({p.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 5-Step Delivery Status Timeline (Prompt Requirement) */}
      <div className="bg-white border border-gray-200 rounded-md p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Dispatch Progression Timeline
          </h3>
          <StatusBadge status={activeTask.status} />
        </div>

        {/* Timeline Visualization */}
        <div className="relative my-6">
          {/* Connector Line behind steps */}
          <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
            {steps.map((s, idx) => {
              const isPast = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              const isFuture = idx > currentStepIdx;

              return (
                <div key={s.label} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                  {/* Step Icon/Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isPast
                      ? 'bg-green-600 text-white'
                      : isCurrent
                      ? 'bg-green-600 text-white ring-4 ring-green-100 animate-pulse'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}>
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>

                  {/* Step Label & Simulated Timestamp */}
                  <div>
                    <div className={`text-xs font-semibold ${isCurrent ? 'text-green-800 font-bold' : isPast ? 'text-gray-900' : 'text-gray-400'}`}>
                      {s.label}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {isPast || isCurrent ? s.time : '--:--'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1.5 text-green-800 font-medium">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Digital handshake and handover verified via OTP/Signature upon arrival.</span>
          </div>
          <div className="text-gray-500">
            Estimated final delivery: <strong>~{activeTask.estimatedTimeMin} mins remaining</strong>
          </div>
        </div>
      </div>

      {/* Map Display & Courier Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Schematic Map with GPS Markers */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Live Dispatch Route & Volunteer Courier Node
                </h4>
                <p className="text-xs text-gray-500">
                  Tracking telemetry via GPS simulation • Route: {activeTask.restaurantName} to {activeTask.ngoName}
                </p>
              </div>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                Speed: ~24 km/h
              </span>
            </div>

            <MapPlaceholder
              originName={activeTask.restaurantName}
              originAddress={activeTask.restaurantAddress}
              destinationName={activeTask.ngoName}
              destinationAddress={activeTask.ngoAddress}
              distanceKm={activeTask.distanceKm}
              etaMinutes={activeTask.estimatedTimeMin}
              volunteerName={activeTask.volunteerName || 'Rahul Sharma (Volunteer)'}
              height="h-96"
            />
          </div>
        </div>

        {/* Right: Courier Contact & Locations Summary */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Volunteer Courier Card */}
          <div className="bg-white border border-gray-200 rounded-md p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">
              Assigned Volunteer Courier
            </h4>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-green-100 text-green-800 font-bold flex items-center justify-center text-sm border border-green-200">
                {activeTask.volunteerName?.charAt(0) || 'R'}
              </div>
              <div>
                <h5 className="text-sm font-bold text-gray-900">
                  {activeTask.volunteerName || 'Rahul Sharma'}
                </h5>
                <p className="text-xs text-gray-500">Volunteer Badge #V-9042</p>
                <p className="text-[11px] text-green-700 font-medium">★ 4.9 Rating (38 deliveries)</p>
              </div>
            </div>

            <div className="pt-2 text-xs space-y-1.5 text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle:</span>
                <span className="font-semibold text-gray-900">Hero Electric Scooter (Green Courier)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Storage:</span>
                <span className="font-semibold text-gray-900">Thermal Insulated Food Crate</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex gap-2">
              <a
                href="tel:+919811234567"
                className="flex-1 py-1.5 px-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-gray-600" />
                <span>Call Courier</span>
              </a>
              <button
                type="button"
                onClick={() => alert(`Tracking updates for #${activeTask.id} are broadcasting live.`)}
                className="py-1.5 px-3 bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 text-xs font-semibold rounded"
              >
                Share Status
              </button>
            </div>
          </div>

          {/* Location Nodes Detail */}
          <div className="bg-white border border-gray-200 rounded-md p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">
              Pickup & Drop Off Checkpoints
            </h4>

            {/* Restaurant */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                <Building className="w-4 h-4 text-green-600" />
                <span>Restaurant (Pickup)</span>
              </div>
              <p className="text-xs font-semibold text-gray-800">{activeTask.restaurantName}</p>
              <p className="text-[11px] text-gray-500">{activeTask.restaurantAddress}</p>
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                <HeartHandshake className="w-4 h-4 text-amber-600" />
                <span>NGO Destination (Drop-off)</span>
              </div>
              <p className="text-xs font-semibold text-gray-800">{activeTask.ngoName}</p>
              <p className="text-[11px] text-gray-500">{activeTask.ngoAddress}</p>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
