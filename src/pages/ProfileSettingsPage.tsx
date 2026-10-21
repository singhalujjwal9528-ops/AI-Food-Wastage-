import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../components/common/DashboardLayout';
import { 
  User, 
  Settings, 
  Bell, 
  Lock, 
  MapPin, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  Building 
} from 'lucide-react';

export const ProfileSettingsPage: React.FC = () => {
  const { currentUser, setCurrentUser, showToast } = useApp();

  const [activeSection, setActiveSection] = useState<'profile' | 'account' | 'notifications' | 'password' | 'location'>('profile');

  // Form states initialized with currentUser data
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [organization, setOrganization] = useState(currentUser.organization || '');
  const [address, setAddress] = useState(currentUser.address);
  const [city, setCity] = useState(currentUser.city);
  const [radiusKm, setRadiusKm] = useState(10);

  // Notification toggles
  const [notifNearbyDonation, setNotifNearbyDonation] = useState(true);
  const [notifExpiryAlert, setNotifExpiryAlert] = useState(true);
  const [notifRouteRecalculation, setNotifRouteRecalculation] = useState(true);
  const [notifSmsBackup, setNotifSmsBackup] = useState(false);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      name,
      email,
      phone,
      organization,
      address,
      city,
    });
    showToast('Profile and preferences updated successfully!', 'success');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      showToast('Passwords do not match or field is empty', 'warning');
      return;
    }
    showToast('Security password updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <DashboardLayout
      title="Profile & Organization Settings"
      subtitle="Manage your identity credentials, geo-fenced delivery alerts, and security preferences."
      breadcrumb="Settings"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Settings Navigation Sidebar */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-md p-2 shadow-xs space-y-1">
            <button
              onClick={() => setActiveSection('profile')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded text-left transition-colors ${
                activeSection === 'profile'
                  ? 'bg-green-50 text-green-800 border-l-2 border-green-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4 text-gray-500" />
              <span>Personal Information</span>
            </button>

            <button
              onClick={() => setActiveSection('location')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded text-left transition-colors ${
                activeSection === 'location'
                  ? 'bg-green-50 text-green-800 border-l-2 border-green-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>Location & Radius</span>
            </button>

            <button
              onClick={() => setActiveSection('notifications')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded text-left transition-colors ${
                activeSection === 'notifications'
                  ? 'bg-green-50 text-green-800 border-l-2 border-green-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bell className="w-4 h-4 text-gray-500" />
              <span>Notification Preferences</span>
            </button>

            <button
              onClick={() => setActiveSection('account')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded text-left transition-colors ${
                activeSection === 'account'
                  ? 'bg-green-50 text-green-800 border-l-2 border-green-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-4 h-4 text-gray-500" />
              <span>Account Role & Verification</span>
            </button>

            <button
              onClick={() => setActiveSection('password')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded text-left transition-colors ${
                activeSection === 'password'
                  ? 'bg-green-50 text-green-800 border-l-2 border-green-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Lock className="w-4 h-4 text-gray-500" />
              <span>Password & Security</span>
            </button>
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-8 lg:col-span-9">
          
          {/* Section 1: Personal Information */}
          {activeSection === 'profile' && (
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-xs">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">
                Personal Information
              </h3>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Organization / Entity
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded shadow-xs flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Personal Details</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Section 2: Location */}
          {activeSection === 'location' && (
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                Operating Location & Notification Radius
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Base Address / Kitchen Entrance
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      City & State
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Geo-Alert Radius: {radiusKm} km
                    </label>
                    <input
                      type="range"
                      min={2}
                      max={25}
                      value={radiusKm}
                      onChange={(e) => setRadiusKm(Number(e.target.value))}
                      className="w-full accent-green-600 mt-2"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>2 km</span>
                      <span>15 km</span>
                      <span>25 km</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => showToast('Location and radius preferences updated!', 'success')}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded shadow-xs flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Location Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Notification Preferences */}
          {activeSection === 'notifications' && (
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                Notification Preferences
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                  <div>
                    <div className="text-xs font-bold text-gray-900">Nearby Surplus Food Alert</div>
                    <div className="text-[11px] text-gray-500">Receive alert when food is published within your configured radius.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifNearbyDonation}
                    onChange={(e) => setNotifNearbyDonation(e.target.checked)}
                    className="rounded text-green-600 focus:ring-green-600 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                  <div>
                    <div className="text-xs font-bold text-gray-900">Food Expiry Countdown Warning</div>
                    <div className="text-[11px] text-gray-500">Urgent notifications when perishable meals drop below 2 hours shelf-life.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifExpiryAlert}
                    onChange={(e) => setNotifExpiryAlert(e.target.checked)}
                    className="rounded text-green-600 focus:ring-green-600 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                  <div>
                    <div className="text-xs font-bold text-gray-900">AI Route Recalculations</div>
                    <div className="text-[11px] text-gray-500">Live alerts when peak traffic reroutes your volunteer dispatch.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifRouteRecalculation}
                    onChange={(e) => setNotifRouteRecalculation(e.target.checked)}
                    className="rounded text-green-600 focus:ring-green-600 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                  <div>
                    <div className="text-xs font-bold text-gray-900">SMS / WhatsApp Secondary Dispatch</div>
                    <div className="text-[11px] text-gray-500">Receive OTP and pickup confirmations directly on registered mobile.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifSmsBackup}
                    onChange={(e) => setNotifSmsBackup(e.target.checked)}
                    className="rounded text-green-600 focus:ring-green-600 w-4 h-4"
                  />
                </label>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => showToast('Notification rules saved!', 'success')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded shadow-xs"
                >
                  Save Notification Preferences
                </button>
              </div>
            </div>
          )}

          {/* Section 4: Account Settings */}
          {activeSection === 'account' && (
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                Account Settings & Verification
              </h3>

              <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Role:</span>
                  <span className="font-bold text-gray-900 uppercase">{currentUser.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Entity Status:</span>
                  <span className="font-bold text-green-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Partner
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account ID:</span>
                  <span className="font-mono text-gray-700">{currentUser.id}</span>
                </div>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded text-xs text-green-900">
                To test different role permissions during a project viva, use the role switcher located at the top-right of the header.
              </div>
            </div>
          )}

          {/* Section 5: Password */}
          {activeSection === 'password' && (
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                Change Password
              </h3>

              <form onSubmit={handlePasswordChange} className="space-y-3 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded shadow-xs"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
};
