from typing import Optional, List, Literal
from pydantic import BaseModel, Field

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    phone: Optional[str] = None
    organization: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    avatar: Optional[str] = None
    verified: Optional[bool] = True

class FoodDonationCreate(BaseModel):
    foodName: str
    category: str
    quantity: float
    unit: str
    cookedTime: Optional[str] = ""
    expiryTime: Optional[str] = ""
    expiresInHours: Optional[float] = 4.0
    restaurantId: Optional[str] = "user-rest-1"
    restaurantName: Optional[str] = "Annapurna Bhavan & Caterers"
    pickupAddress: str
    contactNumber: str
    additionalNotes: Optional[str] = ""
    dietaryType: str = "Veg"

class FoodDonationResponse(BaseModel):
    id: str
    foodName: str
    category: str
    quantity: float
    unit: str
    cookedTime: Optional[str] = ""
    expiryTime: Optional[str] = ""
    expiresInHours: Optional[float] = 4.0
    restaurantId: Optional[str] = ""
    restaurantName: Optional[str] = ""
    pickupAddress: Optional[str] = ""
    contactNumber: Optional[str] = ""
    additionalNotes: Optional[str] = ""
    dietaryType: Optional[str] = "Veg"
    status: str
    createdAt: str
    assignedNgoId: Optional[str] = ""
    assignedNgoName: Optional[str] = ""
    assignedVolunteerId: Optional[str] = ""
    assignedVolunteerName: Optional[str] = ""
    estimatedDeliveryTime: Optional[str] = ""
    distanceKm: Optional[float] = 3.0
    currentFreshnessPercent: Optional[float] = 95.0

class ClaimDonationRequest(BaseModel):
    ngoId: Optional[str] = "user-ngo-1"
    ngoName: Optional[str] = "Feeding Hands Foundation"
    volunteerName: Optional[str] = "Rahul Sharma"

class PickupTaskResponse(BaseModel):
    id: str
    donationId: str
    foodName: str
    quantity: str
    restaurantName: str
    restaurantAddress: Optional[str] = ""
    ngoName: Optional[str] = ""
    ngoAddress: Optional[str] = ""
    volunteerId: Optional[str] = ""
    volunteerName: Optional[str] = ""
    distanceKm: Optional[float] = 2.5
    estimatedTimeMin: Optional[int] = 15
    pickupTime: Optional[str] = "Within 2 hours"
    status: str
    urgencyLevel: Optional[str] = "Medium"
    trafficCondition: Optional[str] = "Moderate"
    freshnessScore: Optional[float] = 90.0

class UpdatePickupStatusRequest(BaseModel):
    status: str

class NotificationResponse(BaseModel):
    id: str
    title: str
    message: str
    type: str
    timestamp: str
    read: bool
    actionUrl: Optional[str] = None

class PlatformStatsResponse(BaseModel):
    totalFoodSavedKg: float
    totalMealsProvided: int
    totalDonationsCount: int
    activeRestaurantsCount: int
    partnerNgosCount: int
    activeVolunteersCount: int
    co2ReductionKg: float

class WastagePredictionRequest(BaseModel):
    type_of_food: str = Field(..., example="Cooked Meals")
    number_of_guests: int = Field(..., example=350)
    event_type: str = Field(..., example="Corporate")
    quantity_of_food: int = Field(..., example=400)
    storage_conditions: str = Field(..., example="Refrigerated")
    purchase_history: str = Field(..., example="Regular")
    seasonality: str = Field(..., example="All Seasons")
    preparation_method: str = Field(..., example="Buffet")
    geographical_location: str = Field(..., example="Urban")
    pricing: str = Field(..., example="Moderate")

class WastagePredictionResponse(BaseModel):
    predicted_wastage_kg: float
    wastage_percentage: float
    risk_level: str
    carbon_footprint_kg: float
    potential_meals_lost: int
    recommendations: List[str]
    model_r2_accuracy: float

