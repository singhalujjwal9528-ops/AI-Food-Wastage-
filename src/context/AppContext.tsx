import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, FoodDonation, PickupTask, NotificationItem, PlatformStats, UserRole, DonationStatus } from '../types';
import { mockUsers, initialDonations, initialPickups, initialNotifications, platformStats as initialStats } from '../data/mockData';
import { api } from '../services/api';

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
  backendOnline: boolean;
  refreshData: () => Promise<void>;
  addDonation: (newDonation: Omit<FoodDonation, 'id' | 'createdAt' | 'status' | 'distanceKm' | 'currentFreshnessPercent'>) => Promise<string>;
  acceptPickupByNgo: (donationId: string, ngoName?: string) => Promise<void>;
  acceptPickupByVolunteer: (pickupId: string, volunteerName?: string) => Promise<void>;
  updatePickupStatus: (pickupId: string, newStatus: DonationStatus) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current logged in user (defaults to Restaurant user for viva testing)
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
  const [backendOnline, setBackendOnline] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Toast notifier
  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Synchronize data from real FastAPI + SQLite backend
  const refreshData = useCallback(async () => {
    try {
      const [dons, pks, notifs, st] = await Promise.all([
        api.getDonations({ limit: 100 }),
        api.getPickups(),
        api.getNotifications(),
        api.getStats()
      ]);

      if (dons && dons.length > 0) setDonations(dons);
      if (pks && pks.length > 0) setPickups(pks);
      if (notifs && notifs.length > 0) setNotifications(notifs);
      if (st) setStats(st);

      setBackendOnline(true);
    } catch (err) {
      // Backend not running yet or starting up; continue with local storage gracefully
      setBackendOnline(false);
    }
  }, []);

  // Poll / initial fetch on mount
  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 12000);
    return () => clearInterval(interval);
  }, [refreshData]);

  // Sync to local storage for backup
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

  const switchRole = (role: UserRole) => {
    const match = mockUsers.find(u => u.role === role);
    if (match) {
      setCurrentUser(match);
      showToast(`Switched active view to ${match.role.toUpperCase()} (${match.name})`, 'info');
    }
  };

  const addDonation = async (donationData: Omit<FoodDonation, 'id' | 'createdAt' | 'status' | 'distanceKm' | 'currentFreshnessPercent'>): Promise<string> => {
    try {
      const res = await api.createDonation(donationData);
      showToast(`Donation #${res.id} published to SQLite database!`, 'success');
      await refreshData();
      return res.id;
    } catch {
      // Fallback local creation
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

      showToast(`Donation #${newId} saved locally!`, 'success');
      return newId;
    }
  };

  const acceptPickupByNgo = async (donationId: string, ngoName: string = 'Feeding Hands Foundation') => {
    try {
      await api.claimDonation(donationId, ngoName, 'Rahul Sharma');
      showToast(`Pickup request accepted by ${ngoName}!`, 'success');
      await refreshData();
    } catch {
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

      showToast(`Pickup request accepted by ${ngoName}!`, 'success');
    }
  };

  const acceptPickupByVolunteer = async (pickupId: string, volunteerName: string = 'Rahul Sharma') => {
    try {
      await api.acceptPickup(pickupId, volunteerName);
      showToast(`Pickup #${pickupId} assigned to volunteer ${volunteerName}!`, 'success');
      await refreshData();
    } catch {
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
      showToast(`Pickup #${pickupId} assigned to volunteer ${volunteerName}!`, 'success');
    }
  };

  const updatePickupStatus = async (pickupId: string, newStatus: DonationStatus) => {
    try {
      await api.updatePickupStatus(pickupId, newStatus);
      showToast(`Pickup #${pickupId} updated in DB: ${newStatus}`, 'info');
      await refreshData();
    } catch {
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
    }
  };

  const markNotificationRead = async (id: string) => {
    try {
      await api.markNotificationRead(id);
    } catch { /* ignore */ }
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = async () => {
    try {
      await api.markAllNotificationsRead();
    } catch { /* ignore */ }
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
        backendOnline,
        refreshData,
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
