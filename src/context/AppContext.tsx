import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, FoodDonation, PickupTask, NotificationItem, PlatformStats, UserRole, DonationStatus } from '../types';
import { mockUsers, initialDonations, initialPickups, initialNotifications, platformStats as initialStats } from '../data/mockData';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  donations: FoodDonation[];
  pickups: PickupTask[];
  notifications: NotificationItem[];
  stats: PlatformStats;
  addDonation: (newDonation: Omit<FoodDonation, 'id' | 'createdAt' | 'status' | 'distanceKm' | 'currentFreshnessPercent'>) => string;
  acceptPickupByNgo: (donationId: string, ngoName?: string) => void;
  acceptPickupByVolunteer: (pickupId: string, volunteerName?: string) => void;
  updatePickupStatus: (pickupId: string, newStatus: DonationStatus) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current logged in user (defaults to Restaurant user for quick testing)
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('afwp_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return mockUsers[0]; // Chef Rajesh Kumar (Restaurant)
  });

  const [donations, setDonations] = useState<FoodDonation[]>(() => {
    const saved = localStorage.getItem('afwp_donations');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return initialDonations;
  });

  const [pickups, setPickups] = useState<PickupTask[]>(() => {
    const saved = localStorage.getItem('afwp_pickups');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return initialPickups;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('afwp_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return initialNotifications;
  });

  const [stats, setStats] = useState<PlatformStats>(initialStats);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('afwp_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('afwp_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('afwp_pickups', JSON.stringify(pickups));
  }, [pickups]);

  useEffect(() => {
    localStorage.setItem('afwp_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    const match = mockUsers.find(u => u.role === role);
    if (match) {
      setCurrentUser(match);
      showToast(`Switched active view to ${match.role.toUpperCase()} (${match.name})`, 'info');
    }
  };

  const addDonation = (donationData: Omit<FoodDonation, 'id' | 'createdAt' | 'status' | 'distanceKm' | 'currentFreshnessPercent'>): string => {
    const newId = `DON-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newDonation: FoodDonation = {
      ...donationData,
      id: newId,
      status: 'Available',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      distanceKm: +(2 + Math.random() * 4).toFixed(1),
      currentFreshnessPercent: 95,
    };

    setDonations(prev => [newDonation, ...prev]);

    // Also create available pickup task
    const newPickup: PickupTask = {
      id: `PKP-${Math.floor(800 + Math.random() * 200)}`,
      donationId: newId,
      foodName: `${newDonation.foodName} (${newDonation.quantity} ${newDonation.unit})`,
      quantity: `${newDonation.quantity} ${newDonation.unit}`,
      restaurantName: newDonation.restaurantName,
      restaurantAddress: newDonation.pickupAddress,
      ngoName: 'Awaiting Claim / Assignment',
      ngoAddress: 'Nearest verified NGO',
      distanceKm: newDonation.distanceKm,
      estimatedTimeMin: Math.round(newDonation.distanceKm * 4 + 5),
      pickupTime: 'Within 2 hours',
      status: 'Available',
      urgencyLevel: newDonation.expiresInHours <= 3 ? 'High' : 'Medium',
      trafficCondition: 'Moderate',
      freshnessScore: 95,
    };
    setPickups(prev => [newPickup, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Surplus Food Published',
      message: `${newDonation.quantity} ${newDonation.unit} of ${newDonation.foodName} published by ${newDonation.restaurantName}.`,
      type: 'donation',
      timestamp: 'Just now',
      read: false,
      actionUrl: '/restaurant/donations'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Update stats
    setStats(prev => ({
      ...prev,
      totalFoodSavedKg: prev.totalFoodSavedKg + (newDonation.unit === 'kg' ? newDonation.quantity : Math.round(newDonation.quantity * 0.4)),
      totalDonationsCount: prev.totalDonationsCount + 1,
      totalMealsProvided: prev.totalMealsProvided + (newDonation.unit === 'portions' ? newDonation.quantity : Math.round(newDonation.quantity * 2.2)),
    }));

    showToast(`Donation #${newId} successfully published!`, 'success');
    return newId;
  };

  const acceptPickupByNgo = (donationId: string, ngoName: string = 'Feeding Hands Foundation') => {
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        return {
          ...d,
          status: 'Pickup Assigned',
          assignedNgoName: ngoName,
          assignedVolunteerName: 'Rahul Sharma (Volunteer)'
        };
      }
      return d;
    }));

    setPickups(prev => prev.map(p => {
      if (p.donationId === donationId) {
        return {
          ...p,
          status: 'Pickup Assigned',
          ngoName,
          volunteerName: 'Rahul Sharma'
        };
      }
      return p;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Donation Claimed by NGO',
      message: `${ngoName} accepted pickup for donation #${donationId}. Volunteer dispatched.`,
      type: 'pickup',
      timestamp: 'Just now',
      read: false,
      actionUrl: '/tracking'
    };
    setNotifications(prev => [notif, ...prev]);
    showToast(`Pickup request accepted by ${ngoName}!`, 'success');
  };

  const acceptPickupByVolunteer = (pickupId: string, volunteerName: string = 'Rahul Sharma') => {
    setPickups(prev => prev.map(p => {
      if (p.id === pickupId) {
        return {
          ...p,
          status: 'Pickup Assigned',
          volunteerName
        };
      }
      return p;
    }));

    const targetPickup = pickups.find(p => p.id === pickupId);
    if (targetPickup) {
      setDonations(prev => prev.map(d => {
        if (d.id === targetPickup.donationId) {
          return { ...d, status: 'Pickup Assigned', assignedVolunteerName: volunteerName };
        }
        return d;
      }));
    }

    showToast(`Pickup #${pickupId} assigned to volunteer ${volunteerName}!`, 'success');
  };

  const updatePickupStatus = (pickupId: string, newStatus: DonationStatus) => {
    let affectedDonationId: string | undefined;

    setPickups(prev => prev.map(p => {
      if (p.id === pickupId) {
        affectedDonationId = p.donationId;
        return { ...p, status: newStatus };
      }
      return p;
    }));

    if (affectedDonationId) {
      setDonations(prev => prev.map(d => {
        if (d.id === affectedDonationId) {
          return { ...d, status: newStatus };
        }
        return d;
      }));
    }

    showToast(`Pickup #${pickupId} status updated to: ${newStatus}`, 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        donations,
        pickups,
        notifications,
        stats,
        addDonation,
        acceptPickupByNgo,
        acceptPickupByVolunteer,
        updatePickupStatus,
        markNotificationRead,
        markAllNotificationsRead,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
