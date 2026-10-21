import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Heart, Shield, BookOpen, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto text-gray-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-base">
              <div className="w-7 h-7 rounded bg-green-600 flex items-center justify-center text-white">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span>AI Food Waste Platform</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              A computer science capstone project aiming to eradicate urban food waste through AI routing, freshness estimation, and instant NGO pickup dispatch.
            </p>
            <div className="text-xs text-gray-400 font-medium">
              Deployed locally for Academic Viva & Demonstration
            </div>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/available-food" className="hover:text-green-700 transition-colors">
                  Available Food Board
                </Link>
              </li>
              <li>
                <Link to="/ai-optimization" className="hover:text-green-700 transition-colors">
                  AI Pickup Optimization
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="hover:text-green-700 transition-colors">
                  Live Dispatch Tracking
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-green-700 transition-colors">
                  Environmental Impact & Stats
                </Link>
              </li>
              <li>
                <Link to="/donation-history" className="hover:text-green-700 transition-colors">
                  Food Donation Ledger
                </Link>
              </li>
            </ul>
          </div>

          {/* Role Access */}
          <div>
            <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-3">
              Role Access & Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/restaurant/dashboard" className="hover:text-green-700 transition-colors">
                  Restaurant Kitchen Portal
                </Link>
              </li>
              <li>
                <Link to="/restaurant/add-food" className="hover:text-green-700 transition-colors">
                  Upload Surplus Meal Form
                </Link>
              </li>
              <li>
                <Link to="/ngo/dashboard" className="hover:text-green-700 transition-colors">
                  NGO Shelter Dashboard
                </Link>
              </li>
              <li>
                <Link to="/volunteer/dashboard" className="hover:text-green-700 transition-colors">
                  Volunteer Delivery Hub
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-green-700 transition-colors">
                  Central Administration Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Viva Notes */}
          <div>
            <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-3">
              Project Specification
            </h4>
            <div className="bg-gray-50 border border-gray-200 rounded p-3 text-xs space-y-1.5 text-gray-600">
              <div className="flex items-center gap-1.5 font-medium text-gray-800">
                <BookOpen className="w-3.5 h-3.5 text-green-700" />
                <span>Capstone Project Architecture</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Stack: React 18, TypeScript, Tailwind CSS, Recharts & Lucide Icons. Designed for clean evaluation.
              </p>
              <div className="text-[10px] text-green-700 font-semibold pt-1 border-t border-gray-200">
                Verified: Safe Food Distribution Protocol
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <div>
            © 2026 AI Food Waste Platform. Developed for B.Tech Project Viva & Presentation.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-600">
              Built with purpose for sustainability & zero hunger
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
