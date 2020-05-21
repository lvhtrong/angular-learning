import * as utils from '../index';
import { ApartmentDTO } from '../../models/apartment.dto';
import { Apartment } from '@store/state/domains/apartment/apartment.model';

describe('mapToStoreApartment', () => {
  const getUtil = () => {
    return utils.mapToStoreApartment;
  };

  it('should return new object with structure', () => {
    const input = {
      description: {
        long: 'long-desc',
        short: 'short-desc',
      },
      price: {
        min: 1,
        max: 2,
      },
      address: {
        city: 'city-1',
        district: 'district-1',
        street: 'street-1',
      },
      location: {
        lat: 'lat-1',
        long: 'long-1',
      },
      specs: ['specs-1'],
      images: ['utilities-1'],
      utilities: ['utilities-1'],
      banner: 'banner',
      title: 'title',
      type: 'type',
      createdBy: 'createdBy',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      roomsCount: 2,
      id: 'id',
      rooms: ['room1', 'room2'],
    };

    const util = getUtil();
    const result = util(input);

    expect(result).toMatchSnapshot();
  });
});

describe('mapFromStoreApartment', () => {
  const getUtil = () => {
    return utils.mapFromStoreApartment;
  };

  it('should return new object with structure', () => {
    const input = {
      description: {
        long: 'long-desc',
        short: 'short-desc',
      },
      price: {
        min: 1,
        max: 2,
      },
      address: {
        city: 'city-1',
        district: 'district-1',
        street: 'street-1',
      },
      location: {
        lat: 'lat-1',
        long: 'long-1',
      },
      specs: ['specs-1'],
      images: ['utilities-1'],
      utilities: ['utilities-1'],
      banner: 'banner',
      title: 'title',
      type: 'type',
      createdBy: 'createdBy',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      roomsCount: 2,
      id: 'id',
      rooms: ['room1', 'room2'],
    };

    const util = getUtil();
    const result = util(input);

    expect(result).toMatchSnapshot();
  });
});
