export type SpaceType = "Hotel" | "Apartment" | "Guest";

export interface Space {
  id: string;
  name: string;
  hotel: string;
  location: string;
  pricePerNight: number; // in Rupees
  nightsLabel: string; // e.g. "1 Nights" as shown on cards
  rating: number;
  reviews: number;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  photoCount: number;
  type: SpaceType;
  popular?: boolean;
  area?: string; // grouping key for Discover carousels
}

export interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  birthDate: string;
  role: string;
}

export interface Booking {
  spaceId: string;
  startDate: string;
  endDate: string;
  nights: number;
  guests: number;
  total: number;
}
