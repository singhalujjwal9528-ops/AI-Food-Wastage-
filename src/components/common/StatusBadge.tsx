import React from 'react';
import { DonationStatus } from '../../types';

interface StatusBadgeProps {
  status: DonationStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  switch (status) {
    case 'Available':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md bg-green-50 text-green-700 border border-green-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          Available
        </span>
      );
    case 'Pickup Assigned':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Pickup Assigned
        </span>
      );
    case 'Picked Up':
    case 'On the Way':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          {status}
        </span>
      );
    case 'Delivered':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Delivered
        </span>
      );
    case 'Expired':
    case 'Cancelled':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md bg-red-50 text-red-700 border border-red-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
          {status}
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center rounded-md bg-gray-100 text-gray-700 border border-gray-200 ${sizeClasses}`}>
          {status}
        </span>
      );
  }
};
