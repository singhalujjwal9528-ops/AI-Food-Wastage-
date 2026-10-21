export type UserRole = 'restaurant' | 'ngo' | 'volunteer' | 'recipient' | 'admin';

export type FoodCategory = 
  | 'Cooked Meals' 
  | 'Bakery & Bread' 
  | 'Fresh Produce' 
  | 'Dairy Products' 
  | 'Packaged Foods' 
  | 'Beverages';

export type DonationStatus = 
  | 'Available' 
  | 'Pickup Assigned' 
  | 'Picked Up' 
  | 'On the Way' 
  | 'Delivered' 
  | 'Expired' 
  | 'Cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  organization?: string;
  address: string;
  city: string;
  avatar?: string;
  verified?: boolean;
}

export interface FoodDonation {
  id: string;
  foodName: string;
  category: FoodCategory;
  quantity: number;
  unit: 'kg' | 'portions' | 'packets' | 'liters' | 'boxes';
  cookedTime: string;
  expiryTime: string;
  expiresInHours: number;
  restaurantId: string;
  restaurantName: string;
  pickupAddress: string;
  contactNumber: string;
  additionalNotes?: string;
  dietaryType: 'Veg' | 'Non-Veg';
  status: DonationStatus;
  createdAt: string;
  assignedNgoId?: string;
  assignedNgoName?: string;
  assignedVolunteerId?: string;
  assignedVolunteerName?: string;
  estimatedDeliveryTime?: string;
  distanceKm: number;
  currentFreshnessPercent: number;
}

export interface PickupTask {
  id: string;
  donationId: string;
  foodName: string;
  quantity: string;
  restaurantName: string;
  restaurantAddress: string;
  ngoName: string;
  ngoAddress: string;
  volunteerId?: string;
  volunteerName?: string;
  distanceKm: number;
  estimatedTimeMin: number;
  pickupTime: string;
  status: DonationStatus;
  urgencyLevel: 'High' | 'Medium' | 'Normal';
  trafficCondition: 'Light' | 'Moderate' | 'Heavy';
  freshnessScore: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'donation' | 'pickup' | 'expiry' | 'delivery' | 'ai_route' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface PlatformStats {
  totalFoodSavedKg: number;
  totalMealsProvided: number;
  totalDonationsCount: number;
  activeRestaurantsCount: number;
  partnerNgosCount: number;
  activeVolunteersCount: number;
  co2ReductionKg: number;
}
