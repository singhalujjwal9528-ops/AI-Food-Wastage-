import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../components/common/DashboardLayout';
import { 
  Bell, 
  CheckCheck, 
  Utensils, 
  Truck, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  Filter
} from 'lucide-react';
import { NotificationItem } from '../types';

export const NotificationCenter: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredNotifications = notifications.filter(n => {
    if (filterType === 'unread') return !n.read;
    if (filterType === 'donation') return n.type === 'donation';
    if (filterType === 'pickup') return n.type === 'pickup' || n.type === 'delivery';
    if (filterType === 'ai_route') return n.type === 'ai_route';
    return true;
  });

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'donation':
        return <div className="p-2 bg-green-50 text-green-700 rounded border border-green-200"><Utensils className="w-4 h-4" /></div>;
      case 'pickup':
        return <div className="p-2 bg-blue-50 text-blue-700 rounded border border-blue-200"><Truck className="w-4 h-4" /></div>;
      case 'expiry':
        return <div className="p-2 bg-red-50 text-red-700 rounded border border-red-200"><Clock className="w-4 h-4" /></div>;
      case 'delivery':
        return <div className="p-2 bg-emerald-50 text-emerald-700 rounded border border-emerald-200"><CheckCircle className="w-4 h-4" /></div>;
      case 'ai_route':
        return <div className="p-2 bg-purple-50 text-purple-700 rounded border border-purple-200"><Sparkles className="w-4 h-4" /></div>;
      default:
        return <div className="p-2 bg-gray-50 text-gray-700 rounded border border-gray-200"><Bell className="w-4 h-4" /></div>;
    }
  };

  return (
    <DashboardLayout
      title="Notification Center"
      subtitle="Real-time alerts regarding surplus meals, AI route recalculations, and courier pickups."
      breadcrumb="Notifications"
      actionButton={
        <button
          onClick={markAllNotificationsRead}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded shadow-xs transition-colors"
        >
          <CheckCheck className="w-3.5 h-3.5 text-gray-500" />
          <span>Mark All Read</span>
        </button>
      }
    >
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
            filterType === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilterType('unread')}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
            filterType === 'unread'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Unread ({notifications.filter(n => !n.read).length})
        </button>
        <button
          onClick={() => setFilterType('donation')}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
            filterType === 'donation'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Food Donations
        </button>
        <button
          onClick={() => setFilterType('pickup')}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
            filterType === 'pickup'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Pickups & Deliveries
        </button>
        <button
          onClick={() => setFilterType('ai_route')}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
            filterType === 'ai_route'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          AI Route Insights
        </button>
      </div>

      {/* Notification List Cards */}
      <div className="bg-white border border-gray-200 rounded-md shadow-xs divide-y divide-gray-200">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-xs">
            <Bell className="w-8 h-8 mx-auto text-gray-300 mb-2" />
            <p className="font-semibold text-gray-700">No notifications in this category</p>
            <p className="text-gray-400 mt-0.5">You're completely up to date.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                notif.read ? 'bg-white hover:bg-gray-50/50' : 'bg-green-50/20 hover:bg-green-50/40 border-l-4 border-l-green-600'
              }`}
            >
              {getNotifIcon(notif.type)}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-sm font-semibold ${notif.read ? 'text-gray-900' : 'text-gray-950 font-bold'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-[11px] text-gray-500 shrink-0 font-medium">
                    {notif.timestamp}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {notif.message}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  {notif.actionUrl && (
                    <Link
                      to={notif.actionUrl}
                      onClick={() => markNotificationRead(notif.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-800"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  {!notif.read && (
                    <button
                      onClick={() => markNotificationRead(notif.id)}
                      className="text-[11px] text-gray-500 hover:text-gray-800"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};
