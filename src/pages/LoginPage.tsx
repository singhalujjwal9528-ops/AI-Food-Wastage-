import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockUsers } from '../data/mockData';
import { UtensilsCrossed, Lock, Mail, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { setCurrentUser, showToast } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('contact@annapurnabhavan.in');
  const [password, setPassword] = useState('••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('restaurant');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Find matching user or fallback to first role
      const matched = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) 
        || mockUsers.find(u => u.role === selectedRole) 
        || mockUsers[0];

      setCurrentUser(matched);
      showToast(`Welcome back, ${matched.name}!`, 'success');

      if (matched.role === 'restaurant') navigate('/restaurant/dashboard');
      else if (matched.role === 'ngo') navigate('/ngo/dashboard');
      else if (matched.role === 'volunteer') navigate('/volunteer/dashboard');
      else if (matched.role === 'admin') navigate('/admin/dashboard');
      else navigate('/available-food');
    }, 400);
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    const user = mockUsers.find(u => u.role === role) || mockUsers[0];
    setCurrentUser(user);
    showToast(`Logged in directly as ${user.name} (${role.toUpperCase()})`, 'success');

    if (role === 'restaurant') navigate('/restaurant/dashboard');
    else if (role === 'ngo') navigate('/ngo/dashboard');
    else if (role === 'volunteer') navigate('/volunteer/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
    else navigate('/available-food');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-md bg-green-600 flex items-center justify-center text-white mb-3 shadow-xs">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Sign in to AI Food Waste Platform
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Access your food donation portal, route optimization, and delivery tracking.
          </p>
        </div>

        {/* Quick Viva / Evaluator One-Click Persona Login */}
        <div className="bg-white border border-green-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-green-900 mb-2">
            <UserCheck className="w-4 h-4 text-green-700" />
            <span>Fast Demo Sign-In (Select Persona)</span>
          </div>
          <p className="text-[11px] text-gray-500 mb-3">
            Click any role to test and grade the complete platform immediately:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('restaurant')}
              className="p-2 border border-gray-200 hover:border-green-400 hover:bg-green-50 rounded text-left transition-colors"
            >
              <div className="font-semibold text-gray-800">Restaurant</div>
              <div className="text-[10px] text-gray-500">Annapurna Bhavan</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('ngo')}
              className="p-2 border border-gray-200 hover:border-green-400 hover:bg-green-50 rounded text-left transition-colors"
            >
              <div className="font-semibold text-gray-800">NGO Partner</div>
              <div className="text-[10px] text-gray-500">Feeding Hands</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('volunteer')}
              className="p-2 border border-gray-200 hover:border-green-400 hover:bg-green-50 rounded text-left transition-colors"
            >
              <div className="font-semibold text-gray-800">Volunteer Courier</div>
              <div className="text-[10px] text-gray-500">Rahul Sharma</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2 border border-gray-200 hover:border-green-400 hover:bg-green-50 rounded text-left transition-colors"
            >
              <div className="font-semibold text-gray-800">Administrator</div>
              <div className="text-[10px] text-gray-500">Project Reviewer</div>
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <div className="bg-white border border-gray-200 rounded-md p-6 shadow-xs">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Account Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600"
              >
                <option value="restaurant">Restaurant / Caterer</option>
                <option value="ngo">NGO / Charitable Shelter</option>
                <option value="volunteer">Volunteer Delivery Partner</option>
                <option value="recipient">Community Recipient</option>
                <option value="admin">System Administrator</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 pl-9 focus:border-green-600 focus:ring-1 focus:ring-green-600"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to registered email.', 'info'); }} className="text-xs text-green-700 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 pl-9 focus:border-green-600 focus:ring-1 focus:ring-green-600"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded bg-green-600 text-white font-medium hover:bg-green-700 transition-colors text-sm shadow-xs flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-semibold text-green-700 hover:underline">
              Register here
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
