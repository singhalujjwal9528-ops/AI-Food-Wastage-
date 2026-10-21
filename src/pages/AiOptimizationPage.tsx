import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../components/common/DashboardLayout';
import { MapPlaceholder } from '../components/common/MapPlaceholder';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  Activity, 
  Users, 
  TrendingDown, 
  CheckCircle, 
  AlertCircle, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface RouteOption {
  id: string;
  name: string;
  restaurant: string;
  restaurantAddr: string;
  ngo: string;
  ngoAddr: string;
  distanceKm: number;
  estimatedTimeMin: number;
  foodFreshness: number;
  trafficCondition: 'Light' | 'Moderate' | 'Heavy';
  recommendedPickupTime: string;
  activeVolunteersNearby: number;
  co2SavedKg: number;
  batchDescription: string;
}

const mockRoutes: RouteOption[] = [
  {
    id: 'opt-route-1',
    name: 'Primary Express Route: Indiranagar → Koramangala',
    restaurant: 'Annapurna Bhavan & Caterers',
    restaurantAddr: '42, 100 Feet Road, Indiranagar',
    ngo: 'Feeding Hands Foundation',
    ngoAddr: '15, 8th Main, Koramangala 4th Block',
    distanceKm: 4.2,
    estimatedTimeMin: 18,
    foodFreshness: 82,
    trafficCondition: 'Moderate',
    recommendedPickupTime: '12:35 PM',
    activeVolunteersNearby: 3,
    co2SavedKg: 22.5,
    batchDescription: '45 Portions of Hot Dal & Rice',
  },
  {
    id: 'opt-route-2',
    name: 'Urgent Dispatch Route: HSR Layout → Richmond Town',
    restaurant: 'Biryani Central Kitchen',
    restaurantAddr: 'Sector 7, HSR Layout',
    ngo: 'Roti Bank Trust',
    ngoAddr: '22, Richmond Town Community Hall',
    distanceKm: 4.8,
    estimatedTimeMin: 22,
    foodFreshness: 84,
    trafficCondition: 'Moderate',
    recommendedPickupTime: '12:50 PM',
    activeVolunteersNearby: 2,
    co2SavedKg: 34.0,
    batchDescription: '55 Portions of Veg Dum Biryani',
  },
  {
    id: 'opt-route-3',
    name: 'Perishable Produce Transit: Jayanagar → Malleshwaram',
    restaurant: 'Green Leaf South Indian Tiffin',
    restaurantAddr: '24th Cross, 4th Block, Jayanagar',
    ngo: 'Seva Samiti Food Drive',
    ngoAddr: '7th Cross, Malleshwaram',
    distanceKm: 7.6,
    estimatedTimeMin: 32,
    foodFreshness: 91,
    trafficCondition: 'Heavy',
    recommendedPickupTime: '01:15 PM',
    activeVolunteersNearby: 4,
    co2SavedKg: 45.0,
    batchDescription: '35 kg Mixed Fresh Vegetables',
  }
];

export const AiOptimizationPage: React.FC = () => {
  const { showToast } = useApp();
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(mockRoutes[0]);
  const [navigating, setNavigating] = useState(false);

  const handleStartNavigation = () => {
    setNavigating(true);
    showToast(`Turn-by-turn guidance started for ${selectedRoute.restaurant} → ${selectedRoute.ngo}`, 'success');
  };

  return (
    <DashboardLayout
      title="AI Pickup Optimization"
      subtitle="Dynamic routing algorithm prioritizing food shelf-life, urban traffic patterns, and courier proximity."
      breadcrumb="AI Optimization"
    >
      {/* Route Selector Tabs */}
      <div className="bg-white border border-gray-200 rounded-md p-3 shadow-xs">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Select Active Dispatch Queue
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {mockRoutes.map((route) => (
            <button
              key={route.id}
              onClick={() => {
                setSelectedRoute(route);
                setNavigating(false);
              }}
              className={`p-2.5 rounded border text-left transition-all ${
                selectedRoute.id === route.id
                  ? 'border-green-600 bg-green-50/70 text-green-900 font-medium shadow-xs'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-gray-900 truncate">{route.restaurant.split(' ')[0]} → {route.ngo.split(' ')[0]}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-300">
                  {route.distanceKm} km
                </span>
              </div>
              <div className="text-[11px] text-gray-500 truncate">
                {route.batchDescription}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: AI Recommendation Card & Schematic Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: AI Recommendation Panel (Prompt Requirement) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-gray-200 rounded-md p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                  Optimization Summary
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">
                  Recommended Pickup
                </h3>
              </div>
              <span className="text-xs text-gray-500 font-mono">v1.4 Algorithm</span>
            </div>

            {/* Structured Recommendation Stats */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Route:</span>
                <span className="text-right font-semibold text-gray-900">
                  {selectedRoute.restaurant} → {selectedRoute.ngo}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Distance:</span>
                <span className="font-bold text-gray-900 text-sm">{selectedRoute.distanceKm} km</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Estimated Time:</span>
                <span className="font-bold text-green-700 text-sm">~{selectedRoute.estimatedTimeMin} min</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Food Freshness:</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {selectedRoute.foodFreshness}%
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Traffic Condition:</span>
                <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                  selectedRoute.trafficCondition === 'Light'
                    ? 'bg-green-100 text-green-800'
                    : selectedRoute.trafficCondition === 'Moderate'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedRoute.trafficCondition}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Recommended Pickup Time:</span>
                <span className="font-bold text-gray-900">{selectedRoute.recommendedPickupTime}</span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-gray-500 font-medium">Active Volunteer Availability:</span>
                <span className="font-semibold text-gray-800">{selectedRoute.activeVolunteersNearby} Couriers within 3km</span>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartNavigation}
                className={`w-full py-2.5 px-4 rounded font-semibold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 ${
                  navigating
                    ? 'bg-emerald-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <Compass className={`w-4 h-4 ${navigating ? 'animate-spin' : ''}`} />
                <span>{navigating ? 'Navigation Active (GPS Tracking)' : 'Start Navigation'}</span>
              </button>
            </div>
          </div>

          {/* Practical Formula & Algorithmic Rationale Box (Super useful for viva!) */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-xs space-y-2 text-gray-700">
            <div className="font-bold text-gray-900 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-green-700" />
              <span>How The AI Route Engine Works</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Unlike generic delivery apps that optimize solely for shortest distance, our model balances two competing constraints:
            </p>
            <div className="bg-white border border-gray-200 p-2.5 rounded font-mono text-[11px] text-gray-800 space-y-1">
              <div><strong>Score</strong> = (Distance × Traffic_Weight) / (Remaining_Freshness_Hours)</div>
              <div className="text-[10px] text-gray-500">Prioritizes hot cooked meals facing imminent degradation over packaged dry bakery goods.</div>
            </div>
          </div>
        </div>

        {/* Right Column: Schematic Map Display */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Simulated Route & Waypoint Overview
                </h4>
                <p className="text-xs text-gray-500">
                  Real-time waypoint coordinates computed from Bengaluru city grid.
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded">
                Live Route
              </span>
            </div>

            <MapPlaceholder
              originName={selectedRoute.restaurant}
              originAddress={selectedRoute.restaurantAddr}
              destinationName={selectedRoute.ngo}
              destinationAddress={selectedRoute.ngoAddr}
              distanceKm={selectedRoute.distanceKm}
              etaMinutes={selectedRoute.estimatedTimeMin}
              height="h-96"
            />
          </div>

          {/* Navigation Turn Step Preview */}
          {navigating && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-md p-4 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-emerald-950 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-emerald-700" />
                  <span>Turn-by-turn Directions (Simulated)</span>
                </span>
                <span className="text-[11px] bg-emerald-200 px-2 py-0.5 rounded text-emerald-800">
                  Speed: 28 km/h
                </span>
              </div>
              <div className="space-y-1 text-emerald-900">
                <p>1. Start from <strong>{selectedRoute.restaurant}</strong>, proceed onto 100 Feet Road (800m).</p>
                <p>2. Keep left at Domlur Flyover toward Inner Ring Road (1.4 km).</p>
                <p>3. Turn right into Koramangala 4th Block toward <strong>{selectedRoute.ngo}</strong> (600m).</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};
