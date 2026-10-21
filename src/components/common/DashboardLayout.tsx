import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
  breadcrumb?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  actionButton,
  breadcrumb,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-white">
      {/* Sidebar Component */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Sub-header with Title & Actions */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                {breadcrumb && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Link to="/" className="hover:text-green-700">Home</Link>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <span>{breadcrumb}</span>
                  </div>
                )}
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {actionButton && (
              <div className="shrink-0">
                {actionButton}
              </div>
            )}
          </div>
        </div>

        {/* Page Body */}
        <div className="p-4 sm:p-8 flex-1 bg-white">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
