import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let borderClass = 'border-gray-200 bg-white text-gray-900';
        let Icon = Info;
        let iconColor = 'text-blue-600';

        if (toast.type === 'success') {
          borderClass = 'border-green-200 bg-white text-gray-900 shadow-md';
          Icon = CheckCircle;
          iconColor = 'text-green-600';
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-200 bg-white text-gray-900 shadow-md';
          Icon = AlertCircle;
          iconColor = 'text-amber-600';
        } else if (toast.type === 'error') {
          borderClass = 'border-red-200 bg-white text-gray-900 shadow-md';
          Icon = AlertCircle;
          iconColor = 'text-red-600';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border ${borderClass} shadow-sm transition-all animate-in fade-in duration-200`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-sm font-medium text-gray-800">
              {toast.message}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
