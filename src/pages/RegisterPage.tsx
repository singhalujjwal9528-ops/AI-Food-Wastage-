import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UtensilsCrossed, Building, HeartHandshake, Truck, UserCheck, Shield } from 'lucide-react';
import { UserRole, User } from '../types';

export const RegisterPage: React.FC = () => {
  const { setCurrentUser, showToast } = useApp();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('restaurant');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bengaluru, Karnataka');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      showToast('Please fill out all required fields', 'warning');
      return;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      phone,
      organization: organization || name,
      address,
      city,
      verified: true,
    };

    setCurrentUser(newUser);
    showToast(`Account created successfully for ${name} as ${role.toUpperCase()}`, 'success');

    if (role === 'restaurant') navigate('/restaurant/dashboard');
    else if (role === 'ngo') navigate('/ngo/dashboard');
    else if (role === 'volunteer') navigate('/volunteer/dashboard');
    else navigate('/available-food');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6">
        
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-md bg-green-600 flex items-center justify-center text-white mb-3 shadow-xs">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Create an Account
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Join the verified network to donate surplus meals or coordinate local food rescue.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-6 shadow-xs">
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Select Your Role *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                
                <button
                  type="button"
                  onClick={() => setRole('restaurant')}
                  className={`p-2.5 rounded border text-left flex flex-col justify-between transition-colors ${
                    role === 'restaurant'
                      ? 'border-green-600 bg-green-50 text-green-900 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Building className="w-4 h-4 mb-1 text-green-600" />
                  <span className="text-xs">Restaurant</span>
                  <span className="text-[10px] text-gray-500">Catering/Hotel</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('ngo')}
                  className={`p-2.5 rounded border text-left flex flex-col justify-between transition-colors ${
                    role === 'ngo'
                      ? 'border-green-600 bg-green-50 text-green-900 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4 mb-1 text-green-600" />
                  <span className="text-xs">NGO</span>
                  <span className="text-[10px] text-gray-500">Charity/Shelter</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('volunteer')}
                  className={`p-2.5 rounded border text-left flex flex-col justify-between transition-colors ${
                    role === 'volunteer'
                      ? 'border-green-600 bg-green-50 text-green-900 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Truck className="w-4 h-4 mb-1 text-green-600" />
                  <span className="text-xs">Volunteer</span>
                  <span className="text-[10px] text-gray-500">Courier/Driver</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('recipient')}
                  className={`p-2.5 rounded border text-left flex flex-col justify-between transition-colors ${
                    role === 'recipient'
                      ? 'border-green-600 bg-green-50 text-green-900 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <UserCheck className="w-4 h-4 mb-1 text-green-600" />
                  <span className="text-xs">Recipient</span>
                  <span className="text-[10px] text-gray-500">Community Home</span>
                </button>

              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name / Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Organization / Entity Name
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Grand Paradise Banquet"
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@kitchen.com"
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98450 12345"
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a secure password"
                className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Physical Address / Landmark
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 54, CMH Road, Indiranagar"
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  City & State
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:border-green-600"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded bg-green-600 text-white font-medium hover:bg-green-700 transition-colors text-sm shadow-xs"
              >
                Complete Registration as {role.toUpperCase()}
              </button>
            </div>
          </form>

          <div className="mt-5 pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-green-700 hover:underline">
              Log in instead
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
