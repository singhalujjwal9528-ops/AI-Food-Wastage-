import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Utensils, 
  HeartHandshake, 
  Truck, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building, 
  Users, 
  MapPin, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const LandingPage: React.FC = () => {
  const { stats, donations } = useApp();

  const recentAvailable = donations.filter(d => d.status === 'Available').slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 border border-green-200 text-green-800 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                <span>Active Food Waste Reduction Network • Bengaluru</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                Turn Surplus Food Into <span className="text-green-600 underline decoration-green-300 decoration-4">Someone's Meal</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                Connect restaurants with NGOs, volunteers, and people in need to reduce food waste and make food redistribution faster.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/restaurant/add-food"
                  className="px-5 py-3 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 shadow-sm transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Donate Food</span>
                </Link>

                <Link
                  to="/available-food"
                  className="px-5 py-3 rounded-md bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:text-green-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  <HeartHandshake className="w-4 h-4 text-green-600" />
                  <span>Find Available Food</span>
                </Link>

                <Link
                  to="/ai-optimization"
                  className="px-4 py-3 rounded-md text-gray-600 hover:text-green-700 text-sm font-medium transition-colors"
                >
                  View AI Routing →
                </Link>
              </div>

              {/* Quick Feature Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-xs text-gray-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Zero Commercial Costs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>FSSAI Hygiene Check</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Real-time GPS Tracking</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual (Clean illustration & card layout - NOT AI robot!) */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-gray-200 rounded-lg p-5 shadow-xs relative">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Live Platform Activity
                  </span>
                  <span className="text-[11px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-medium">
                    Updated Just Now
                  </span>
                </div>

                {/* Simulated Visual Pipeline */}
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 p-3 rounded-md flex items-center gap-3">
                    <div className="p-2 bg-green-50 text-green-700 rounded border border-green-200">
                      <Building className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">Annapurna Bhavan & Caterers</p>
                      <p className="text-[11px] text-gray-500">Posted 45 portions of Hot Dal & Rice</p>
                    </div>
                    <StatusBadge status="Available" size="sm" />
                  </div>

                  <div className="flex justify-center -my-1">
                    <div className="w-0.5 h-4 bg-gray-300"></div>
                  </div>

                  <div className="bg-white border border-blue-200 p-3 rounded-md flex items-center gap-3 shadow-xs">
                    <div className="p-2 bg-blue-50 text-blue-700 rounded border border-blue-200">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">AI Route Dispatch: Rahul S.</p>
                      <p className="text-[11px] text-gray-500">Shortest route computed (12 mins ETA)</p>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      En Route
                    </span>
                  </div>

                  <div className="flex justify-center -my-1">
                    <div className="w-0.5 h-4 bg-gray-300"></div>
                  </div>

                  <div className="bg-white border border-gray-200 p-3 rounded-md flex items-center gap-3">
                    <div className="p-2 bg-amber-50 text-amber-700 rounded border border-amber-200">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">Feeding Hands Foundation</p>
                      <p className="text-[11px] text-gray-500">Serving community dinner in Koramangala</p>
                    </div>
                    <StatusBadge status="Delivered" size="sm" />
                  </div>
                </div>

                <div className="mt-4 p-2.5 bg-green-50/70 border border-green-200 rounded text-center text-xs text-green-900 font-medium">
                  🌱 Estimated 18 kg CO₂ avoided from this single batch redistribution
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Key Metric Statistics Row */}
      <section className="border-b border-gray-200 bg-gray-50/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="bg-white border border-gray-200 rounded-md p-4 text-center">
              <span className="text-2xl sm:text-3xl font-bold text-green-600 block">
                {stats.totalFoodSavedKg.toLocaleString()} kg
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-600 mt-1 block">
                Food Saved
              </span>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-4 text-center">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900 block">
                {stats.totalMealsProvided.toLocaleString()}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-600 mt-1 block">
                Meals Donated
              </span>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-4 text-center">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900 block">
                {stats.activeRestaurantsCount}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-600 mt-1 block">
                Active Restaurants
              </span>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-4 text-center">
              <span className="text-2xl sm:text-3xl font-bold text-green-600 block">
                {stats.partnerNgosCount}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-600 mt-1 block">
                Partner NGOs
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-14 sm:py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded border border-green-200">
              Operational Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">
              How It Works
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              A 4-step rapid turnaround pipeline engineered to deliver freshly prepared food before safety expiration limits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-md p-5 flex flex-col justify-between hover:border-green-300 transition-colors">
              <div>
                <div className="w-8 h-8 rounded bg-green-100 text-green-800 font-bold text-sm flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Restaurant uploads surplus food
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Kitchen managers specify food type, quantity, cooking time, and expected expiry using a 1-minute form.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                • Portion count & dietary tags
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-md p-5 flex flex-col justify-between hover:border-green-300 transition-colors">
              <div>
                <div className="w-8 h-8 rounded bg-green-100 text-green-800 font-bold text-sm flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Nearby NGOs/volunteers are notified
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Automated notifications trigger based on proximity to community shelters, orphanages, and active field workers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                • Geo-fenced radius alerts
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-md p-5 flex flex-col justify-between hover:border-green-300 transition-colors">
              <div>
                <div className="w-8 h-8 rounded bg-green-100 text-green-800 font-bold text-sm flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  AI suggests best pickup route & time
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Optimization algorithm factors in traffic congestion, remaining freshness decay, and transit distance.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                • Dynamic freshness score & ETA
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-gray-200 rounded-md p-5 flex flex-col justify-between hover:border-green-300 transition-colors">
              <div>
                <div className="w-8 h-8 rounded bg-green-100 text-green-800 font-bold text-sm flex items-center justify-center mb-4">
                  4
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Food reaches people before it expires
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Volunteer courier delivers food safely to verified beneficiaries, closing the hunger and carbon waste loop.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                • Proof of delivery & ledger update
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Available Food Board Preview on Home */}
      <section className="py-12 bg-gray-50/50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Currently Available Food in Bengaluru
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Verified donations ready for immediate pickup by registered NGOs or welfare groups.
              </p>
            </div>
            <Link
              to="/available-food"
              className="text-xs sm:text-sm font-semibold text-green-700 hover:text-green-800 inline-flex items-center gap-1"
            >
              <span>View All Available Donations ({donations.filter(d => d.status === 'Available').length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentAvailable.map(item => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-md p-4 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {item.category}
                    </span>
                    <StatusBadge status={item.status} size="sm" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {item.foodName}
                  </h3>
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    <p className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-medium text-gray-800">{item.restaurantName}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate">{item.pickupAddress}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-amber-700 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Expires: {item.expiryTime} ({item.expiresInHours}h left)</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-green-700">
                    {item.quantity} {item.unit} available
                  </span>
                  <Link
                    to="/available-food"
                    className="px-2.5 py-1 text-xs rounded bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
                  >
                    Claim Pickup
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Access Callouts */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-4 rounded border border-gray-200 bg-gray-50/40">
                <div className="flex items-center gap-2 mb-2 font-semibold text-gray-900 text-sm">
                  <Utensils className="w-4 h-4 text-green-600" />
                  <span>For Restaurants & Caterers</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  Upload daily excess meals in 60 seconds. Prevent wastage, receive donation receipts, and build CSR impact.
                </p>
                <Link to="/restaurant/dashboard" className="text-xs font-semibold text-green-700 hover:underline">
                  Open Restaurant Dashboard →
                </Link>
              </div>

              <div className="p-4 rounded border border-gray-200 bg-gray-50/40">
                <div className="flex items-center gap-2 mb-2 font-semibold text-gray-900 text-sm">
                  <HeartHandshake className="w-4 h-4 text-green-600" />
                  <span>For NGOs & Community Shelters</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  Browse edible donations categorized by distance and shelf-life. Request immediate allocation with one click.
                </p>
                <Link to="/ngo/dashboard" className="text-xs font-semibold text-green-700 hover:underline">
                  Open NGO Portal →
                </Link>
              </div>

              <div className="p-4 rounded border border-gray-200 bg-gray-50/40">
                <div className="flex items-center gap-2 mb-2 font-semibold text-gray-900 text-sm">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span>For Volunteers & Couriers</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  Pick up food along your daily commute using our AI routing. Keep meals hot and safe in insulated bags.
                </p>
                <Link to="/volunteer/dashboard" className="text-xs font-semibold text-green-700 hover:underline">
                  Open Volunteer Hub →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
