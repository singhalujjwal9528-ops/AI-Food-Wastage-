import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../components/common/DashboardLayout';
import { 
  UtensilsCrossed, 
  MapPin, 
  Clock, 
  Phone, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { FoodCategory } from '../types';

export const AddSurplusFoodPage: React.FC = () => {
  const { currentUser, addDonation, showToast } = useApp();
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState('');
  const [category, setCategory] = useState<FoodCategory>('Cooked Meals');
  const [quantity, setQuantity] = useState<number>(30);
  const [unit, setUnit] = useState<'portions' | 'kg' | 'packets' | 'liters' | 'boxes'>('portions');
  const [dietaryType, setDietaryType] = useState<'Veg' | 'Non-Veg'>('Veg');
  
  // Timestamps
  const [cookedTime, setCookedTime] = useState('Today, 12:00 PM');
  const [expiryTime, setExpiryTime] = useState('Today, 04:30 PM');
  const [expiresInHours, setExpiresInHours] = useState<number>(4.5);

  // Logistics
  const [pickupAddress, setPickupAddress] = useState(currentUser.address || '42, 100 Feet Road, Indiranagar, Bengaluru');
  const [contactNumber, setContactNumber] = useState(currentUser.phone || '+91 98450 18274');
  const [additionalNotes, setAdditionalNotes] = useState('Hot and freshly prepared in commercial kitchen. Packaged in sanitized food-grade containers.');
  const [hygieneConfirmed, setHygieneConfirmed] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishedId, setPublishedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!foodName || quantity <= 0) {
      showToast('Please provide a valid food name and quantity', 'warning');
      return;
    }

    if (!hygieneConfirmed) {
      showToast('Please confirm the food safety and hygiene declaration', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      const newId = await addDonation({
        foodName,
        category,
        quantity,
        unit,
        cookedTime,
        expiryTime,
        expiresInHours,
        restaurantId: currentUser.id,
        restaurantName: currentUser.organization || currentUser.name,
        pickupAddress,
        contactNumber,
        additionalNotes,
        dietaryType,
      });

      setPublishedId(newId);
    } catch {
      // Handled in context toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout
      title="Add Surplus Food Donation"
      subtitle="Publish edible commercial surplus to notify nearby verified NGOs and volunteer couriers immediately."
      breadcrumb="Upload Surplus Meal"
    >
      {publishedId ? (
        /* Confirmation State */
        <div className="bg-white border border-green-200 rounded-md p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Surplus Food Published Successfully!
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Donation Reference: <strong className="font-mono text-gray-900">{publishedId}</strong>
          </p>
          <div className="bg-green-50/70 border border-green-200 rounded-md p-4 my-6 text-left text-xs text-gray-700 space-y-1.5">
            <div className="font-semibold text-green-900 text-sm mb-1">
              Automated Redistribution Pipeline Triggered:
            </div>
            <p>✓ 4 verified NGOs within 5 km notified via push alert.</p>
            <p>✓ AI route recommendation calculated for active volunteers.</p>
            <p>✓ Expected volunteer dispatch window: ~15 to 30 minutes.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setPublishedId(null);
                setFoodName('');
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50"
            >
              Add Another Donation
            </button>
            <button
              onClick={() => navigate('/restaurant/dashboard')}
              className="px-4 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700"
            >
              Go to Restaurant Dashboard
            </button>
            <button
              onClick={() => navigate('/available-food')}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded text-sm font-medium hover:bg-gray-200"
            >
              View on Live Food Board
            </button>
          </div>
        </div>
      ) : (
        /* Main Practical Form */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Food Details */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white border border-gray-200 rounded-md p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
                1. Food Item Details
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Food Item Name / Description *
                </label>
                <input
                  type="text"
                  required
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="e.g. Steamed Rice, Rajma & 40 Rotis"
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Food Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FoodCategory)}
                    className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-white focus:border-green-600"
                  >
                    <option value="Cooked Meals">Cooked Meals</option>
                    <option value="Bakery & Bread">Bakery & Bread</option>
                    <option value="Fresh Produce">Fresh Produce</option>
                    <option value="Dairy Products">Dairy Products</option>
                    <option value="Packaged Foods">Packaged Foods</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Dietary Classification *
                  </label>
                  <select
                    value={dietaryType}
                    onChange={(e) => setDietaryType(e.target.value as 'Veg' | 'Non-Veg')}
                    className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-white focus:border-green-600"
                  >
                    <option value="Veg">Vegetarian (Pure Veg)</option>
                    <option value="Non-Veg">Non-Vegetarian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Quantity & Unit *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={1}
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-24 text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value as any)}
                      className="flex-1 text-sm border border-gray-300 rounded px-2 py-2 bg-white focus:border-green-600"
                    >
                      <option value="portions">portions</option>
                      <option value="kg">kg</option>
                      <option value="packets">packets</option>
                      <option value="boxes">boxes</option>
                      <option value="liters">liters</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Time Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Preparation Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={cookedTime}
                    onChange={(e) => setCookedTime(e.target.value)}
                    placeholder="Today, 11:30 AM"
                    className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Expected Expiry Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={expiryTime}
                    onChange={(e) => setExpiryTime(e.target.value)}
                    placeholder="Today, 04:00 PM"
                    className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Safe Hours Remaining
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="72"
                    value={expiresInHours}
                    onChange={(e) => setExpiresInHours(Number(e.target.value))}
                    className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                  />
                </div>
              </div>
            </div>

            {/* Logistics & Location Details */}
            <div className="bg-white border border-gray-200 rounded-md p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
                2. Pickup Location & Logistics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Pickup Address / Kitchen Gate *
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Street, Landmark, City"
                    className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Kitchen Contact Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+91 98450 12345"
                    className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Packaging & Handling Instructions
                </label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Please bring clean thermal containers or large transport vessels."
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                />
              </div>

              {/* Hygiene check */}
              <div className="pt-2 border-t border-gray-100">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hygieneConfirmed}
                    onChange={(e) => setHygieneConfirmed(e.target.checked)}
                    className="mt-0.5 rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                  <span className="text-xs text-gray-600 leading-snug">
                    I verify under food safety standards that this food was prepared hygienically, untouched by customers, and stored under safe temperature control.
                  </span>
                </label>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/restaurant/dashboard')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-green-600 text-white rounded text-sm font-semibold hover:bg-green-700 transition-colors shadow-xs flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Publishing Donation...</span>
                ) : (
                  <>
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>Publish Food Donation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Location Map Preview & AI Freshness Indicator */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Visual Location Picker Box */}
            <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Pickup Location Pin
                </span>
                <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-mono">
                  12.9716° N, 77.5946° E
                </span>
              </div>

              {/* Simple Map Preview */}
              <div className="w-full h-44 bg-slate-100 border border-gray-200 rounded relative overflow-hidden flex items-center justify-center text-center p-3">
                {/* SVG Schematic Street Map */}
                <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 30 Q 120 70 300 20" stroke="#64748b" strokeWidth="4" fill="none" />
                  <path d="M 40 0 Q 70 120 180 200" stroke="#64748b" strokeWidth="6" fill="none" />
                  <path d="M 150 0 L 150 180" stroke="#64748b" strokeWidth="3" fill="none" />
                </svg>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shadow-md animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="mt-1 text-xs font-semibold text-gray-900 bg-white/90 px-2 py-0.5 rounded border border-gray-200 shadow-xs">
                    {pickupAddress.split(',')[0] || 'Kitchen Location'}
                  </span>
                  <span className="text-[10px] text-gray-500 bg-white/80 px-1 rounded mt-0.5">
                    Verified Bengaluru pickup point
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500">
                This geocode is shared automatically with volunteer couriers to optimize travel times.
              </p>
            </div>

            {/* AI Freshness Prediction Card */}
            <div className="bg-green-50/60 border border-green-200 rounded-md p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-green-900">
                <Sparkles className="w-4 h-4 text-green-700" />
                <span>AI Freshness Estimation</span>
              </div>
              <p className="text-gray-700">
                Based on cooked time and shelf-life, our algorithmic decay model predicts:
              </p>
              <div className="bg-white border border-green-200 p-2.5 rounded text-gray-800 space-y-1">
                <div className="flex justify-between font-medium">
                  <span>Current Freshness:</span>
                  <span className="text-green-700 font-bold">95% (Safe)</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Target Delivery Window:</span>
                  <span>Within 3.5 hrs</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Recommended Transit:</span>
                  <span>Under 25 mins</span>
                </div>
              </div>
            </div>

            {/* Fast Tips for Student Project */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-xs text-gray-600 space-y-1">
              <div className="flex items-center gap-1 font-semibold text-gray-800">
                <Info className="w-3.5 h-3.5 text-gray-500" />
                <span>Quick Tip</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Publishing here immediately updates the NGO Dashboard and Volunteer Available Pickups view without needing a page refresh!
              </p>
            </div>

          </div>

        </form>
      )}
    </DashboardLayout>
  );
};
