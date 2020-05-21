import { Apartment as StoreApartment } from '@store/state/domains/apartment/apartment.model';
import { ApartmentDTO } from '../models/apartment.dto';

export function mapToStoreApartment(apartment: ApartmentDTO): StoreApartment {
  return {
    id: apartment.id,
    updatedAt: apartment.updatedAt,
    description: apartment.description,
    price: apartment.price,
    address: apartment.address,
    location: apartment.location,
    specs: apartment.specs,
    images: apartment.images,
    utilities: apartment.utilities,
    banner: apartment.banner,
    title: apartment.title,
    type: apartment.type,
    createdBy: apartment.createdBy,
    createdAt: apartment.createdAt,
    roomsCount: apartment.roomsCount,
    rooms: apartment.rooms,
  };
}

export function mapFromStoreApartment(apartment: StoreApartment): ApartmentDTO {
  return {
    id: apartment.id,
    updatedAt: apartment.updatedAt,
    description: apartment.description,
    price: apartment.price,
    address: apartment.address,
    location: apartment.location,
    specs: apartment.specs,
    images: apartment.images,
    utilities: apartment.utilities,
    banner: apartment.banner,
    title: apartment.title,
    type: apartment.type,
    createdBy: apartment.createdBy,
    createdAt: apartment.createdAt,
    roomsCount: apartment.roomsCount,
    rooms: apartment.rooms,
  };
}
