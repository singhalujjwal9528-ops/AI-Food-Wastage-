import React from 'react';
import { MapPin, Navigation, Clock, Building, HeartHandshake, ShieldCheck } from 'lucide-react';

interface MapPlaceholderProps {
  originName?: string;
  originAddress?: string;
  destinationName?: string;
  destinationAddress?: string;
  currentStep?: 'created' | 'assigned' | 'picked_up' | 'on_the_way' | 'delivered';
  volunteerName?: string;
  distanceKm?: number;
  etaMinutes?: number;
  height?: string;
  showAiMetrics?: boolean;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  originName = 'Annapurna Bhavan (Indiranagar)',
  originAddress = '42, 100 Feet Road, Indiranagar',
  destinationName = 'Feeding Hands Foundation (Koramangala)',
  destinationAddress = '15, 8th Main, Koramangala 4th Block',
  currentStep = 'on_the_way',
  volunteerName = 'Rahul Sharma (Hero Electric Bike)',
  distanceKm = 3.8,
  etaMinutes = 14,
  height = 'h-80',
  showAiMetrics = false,
}) => {
  return (
    <div className={`relative w-full ${height} bg-slate-50 border border-gray-200 rounded-lg overflow-hidden flex flex-col justify-between p-4 shadow-sm select-none`}>
      {/* SVG Background Grid simulating city roads and blocks */}
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Main Road arteries */}
        <line x1="10%" y1="75%" x2="90%" y2="25%" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
        <line x1="10%" y1="75%" x2="90%" y2="25%" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
        
        <line x1="20%" y1="15%" x2="80%" y2="85%" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
        <line x1="20%" y1="15%" x2="80%" y2="85%" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
        
        {/* Active AI Computed Route Path */}
        <path
          d="M 120 220 Q 280 160 480 90 T 700 80"
          fill="none"
          stroke="#16a34a"
          strokeWidth="4"
          strokeDasharray="6,4"
          className="animate-pulse"
        />
      </svg>

      {/* Top Map Status Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-white/95 backdrop-blur-sm border border-gray-200 p-2.5 rounded-md shadow-xs">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
          <span>Live GPS & AI Route Tracking: <strong>Bengaluru Central Zone</strong></span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-1 font-semibold text-gray-800">
            <Navigation className="w-3.5 h-3.5 text-green-600" /> {distanceKm} km
          </span>
          <span className="flex items-center gap-1 font-semibold text-gray-800">
            <Clock className="w-3.5 h-3.5 text-green-600" /> ~{etaMinutes} mins
          </span>
        </div>
      </div>

      {/* Schematic Map Node Markers */}
      <div className="relative z-10 my-auto flex items-center justify-between px-4 sm:px-12">
        {/* Origin Restaurant Node */}
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="bg-white border-2 border-green-600 text-green-700 p-2 rounded-full shadow-sm hover:scale-105 transition-transform">
            <Building className="w-5 h-5" />
          </div>
          <div className="mt-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded text-center shadow-xs max-w-[140px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 block">Restaurant</span>
            <span className="text-xs font-semibold text-gray-800 truncate block">{originName.split('(')[0]}</span>
            <span className="text-[10px] text-gray-500 truncate block">{originAddress}</span>
          </div>
        </div>

        {/* Volunteer In Transit Marker */}
        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white p-2.5 rounded-full shadow-md animate-bounce">
            <Navigation className="w-5 h-5 transform rotate-45" />
          </div>
          <div className="mt-1.5 bg-white border border-green-300 px-2.5 py-1 rounded text-center shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 block">Volunteer En Route</span>
            <span className="text-xs font-semibold text-gray-900 block">{volunteerName}</span>
            <span className="text-[10px] text-gray-600 font-medium">ETA: {etaMinutes} mins</span>
          </div>
        </div>

        {/* Destination NGO Node */}
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="bg-white border-2 border-amber-600 text-amber-700 p-2 rounded-full shadow-sm hover:scale-105 transition-transform">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div className="mt-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded text-center shadow-xs max-w-[140px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">NGO Destination</span>
            <span className="text-xs font-semibold text-gray-800 truncate block">{destinationName.split('(')[0]}</span>
            <span className="text-[10px] text-gray-500 truncate block">{destinationAddress}</span>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between bg-white border border-gray-200 p-2.5 rounded-md text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>Optimal traffic route via Inner Ring Road avoids Old Airport Rd peak congestion.</span>
        </div>
        <div className="text-gray-500 italic">
          Simulated map interface for college demonstration
        </div>
      </div>
    </div>
  );
};
