import { FoodDonation, PickupTask, NotificationItem, PlatformStats } from '../types';

const API_BASE = (import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '') : '') + '/api';

export interface WastagePredictionInput {
  type_of_food: string;
  number_of_guests: number;
  event_type: string;
  quantity_of_food: number;
  storage_conditions: string;
  purchase_history: string;
  seasonality: string;
  preparation_method: string;
  geographical_location: string;
  pricing: string;
}

export interface WastagePredictionOutput {
  predicted_wastage_kg: number;
  wastage_percentage: number;
  risk_level: 'High' | 'Medium' | 'Low';
  carbon_footprint_kg: number;
  potential_meals_lost: number;
  recommendations: string[];
  model_r2_accuracy: number;
}

export interface OptimizedRouteItem {
  pickupId: string;
  donationId: string;
  foodName: string;
  restaurant: string;
  address: string;
  distanceKm: number;
  estimatedDurationMin: number;
  trafficCondition: 'Light' | 'Moderate' | 'Heavy';
  freshnessDecayScore: number;
  urgency: 'High' | 'Medium' | 'Normal';
  aiPriorityScore: number;
  recommendedCourierAction: string;
}

export interface OptimizationResponse {
  algorithm: string;
  activeRoutesCount: number;
  optimalStopSequence: string[];
  totalEstimatedSavingsCO2Kg: number;
  routes: OptimizedRouteItem[];
}

export interface DatasetSummary {
  providersCount: number;
  receiversCount: number;
  claimsCount: number;
  predictionsRun: number;
  datasetFiles: Array<{ filename: string; rows: number; role: string }>;
}

export const api = {
  // Check backend health
  async checkHealth(): Promise<{ status: string; database?: any }> {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Backend health check failed');
    return res.json();
  },

  // Donations
  async getDonations(params?: { status?: string; category?: string; search?: string; limit?: number }): Promise<FoodDonation[]> {
    const query = new URLSearchParams();
    if (params?.status) query.append('status', params.status);
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.limit) query.append('limit', params.limit.toString());

    const res = await fetch(`${API_BASE}/donations?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to load donations');
    return res.json();
  },

  async getDonationById(id: string): Promise<FoodDonation> {
    const res = await fetch(`${API_BASE}/donations/${id}`);
    if (!res.ok) throw new Error(`Failed to load donation ${id}`);
    return res.json();
  },

  async createDonation(donation: Omit<FoodDonation, 'id' | 'createdAt' | 'status' | 'distanceKm' | 'currentFreshnessPercent'>): Promise<{ success: boolean; id: string; message: string }> {
    const res = await fetch(`${API_BASE}/donations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donation),
    });
    if (!res.ok) throw new Error('Failed to create donation');
    return res.json();
  },

  async claimDonation(donationId: string, ngoName: string = 'Feeding Hands Foundation', volunteerName: string = 'Rahul Sharma'): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/donations/${donationId}/claim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ngoName, volunteerName }),
    });
    if (!res.ok) throw new Error('Failed to claim donation');
    return res.json();
  },

  // Pickups
  async getPickups(status?: string): Promise<PickupTask[]> {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    const res = await fetch(`${API_BASE}/pickups${query}`);
    if (!res.ok) throw new Error('Failed to fetch pickups');
    return res.json();
  },

  async acceptPickup(pickupId: string, volunteerName: string = 'Rahul Sharma'): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/pickups/${pickupId}/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volunteer_name: volunteerName }),
    });
    if (!res.ok) throw new Error('Failed to accept pickup');
    return res.json();
  },

  async updatePickupStatus(pickupId: string, newStatus: string): Promise<{ success: boolean; status: string; message: string }> {
    const res = await fetch(`${API_BASE}/pickups/${pickupId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) throw new Error('Failed to update pickup status');
    return res.json();
  },

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    const res = await fetch(`${API_BASE}/notifications`);
    if (!res.ok) throw new Error('Failed to fetch notifications');
    return res.json();
  },

  async markNotificationRead(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Failed to mark notification read');
    return res.json();
  },

  async markAllNotificationsRead(): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/notifications/read-all`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to mark all notifications read');
    return res.json();
  },

  // Stats & Analytics
  async getStats(): Promise<PlatformStats> {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to load stats');
    return res.json();
  },

  async getAnalytics(): Promise<any> {
    const res = await fetch(`${API_BASE}/analytics`);
    if (!res.ok) throw new Error('Failed to load analytics');
    return res.json();
  },

  // AI & ML Endpoints
  async predictWastage(input: WastagePredictionInput): Promise<WastagePredictionOutput> {
    const res = await fetch(`${API_BASE}/ai/predict-wastage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error('Failed to run AI wastage prediction');
    return res.json();
  },

  async getOptimizedRoutes(): Promise<OptimizationResponse> {
    const res = await fetch(`${API_BASE}/ai/optimize-routes`);
    if (!res.ok) throw new Error('Failed to fetch optimized routes');
    return res.json();
  },

  // Dataset Explorer
  async getDatasetSummary(): Promise<DatasetSummary> {
    const res = await fetch(`${API_BASE}/dataset/summary`);
    if (!res.ok) throw new Error('Failed to load dataset summary');
    return res.json();
  },

  async getDatasetProviders(page: number = 1, search?: string): Promise<any[]> {
    const q = new URLSearchParams({ page: page.toString() });
    if (search) q.append('search', search);
    const res = await fetch(`${API_BASE}/dataset/providers?${q.toString()}`);
    if (!res.ok) throw new Error('Failed to load dataset providers');
    return res.json();
  },

  async getDatasetReceivers(page: number = 1, search?: string): Promise<any[]> {
    const q = new URLSearchParams({ page: page.toString() });
    if (search) q.append('search', search);
    const res = await fetch(`${API_BASE}/dataset/receivers?${q.toString()}`);
    if (!res.ok) throw new Error('Failed to load dataset receivers');
    return res.json();
  }
};

