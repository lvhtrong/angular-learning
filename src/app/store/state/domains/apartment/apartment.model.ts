import { UpdateTracking } from '@store/models/common/update-tracking.model';

export interface Apartment extends UpdateTracking {
  id: string;
  description?: Description;
  price?: Price;
  address?: Address;
  location?: Location;
  specs?: string[];
  images?: string[];
  utilities?: string[];
  banner?: string;
  title?: string;
  type?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt: string;
  roomsCount?: number;
  rooms?: string[];
}

interface Description {
  short: string;
  long: string;
}

interface Price {
  max: number;
  min: number;
}

interface Address {
  street: string;
  district: string;
  city: string;
}

interface Location {
  long: string;
  lat: string;
}
