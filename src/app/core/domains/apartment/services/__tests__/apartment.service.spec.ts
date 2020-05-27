import { TestBed } from '@angular/core/testing';
import { cold } from 'jest-marbles';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ApiService } from '@core/services/api/api.service';
import { ApartmentService } from '../apartment.service';
import { ApartmentDTO } from '../../models/apartment.dto';
import { Observable } from 'rxjs';
import { Apartment } from '@store/state/domains/apartment/apartment.model';

jest.mock('@store/state/domains/apartment/apartment.selectors', () => ({
  selectApartmentEntities: jest.fn((a) => a),
}));
jest.mock('@core/services/api/api.service');

const getApartmentDTO = (id: string): ApartmentDTO => {
  return {
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
    id,
    rooms: ['room1', 'room2'],
  };
};

const getApartmentStore = (id: string): Apartment => {
  return {
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
    id,
    rooms: ['room1', 'room2'],
  };
};

const configureModules = (
  apiServiceValue = {
    get: jest.fn().mockReturnValue(
      new Observable<ApartmentDTO[]>((observer) => {
        observer.next([]);
      })
    ),
  }
) => {
  TestBed.configureTestingModule({
    providers: [
      ApartmentService,
      {
        provide: ApiService,
        useValue: apiServiceValue,
      },
      provideMockStore({
        initialState: [],
      }),
    ],
  });
};

describe('getApartments', () => {
  it('should upsert returned apartments to store', (done) => {
    const apiApartments = [getApartmentDTO('id-1')];
    const apiServiceMockValue = {
      get: jest.fn().mockReturnValue(
        new Observable<ApartmentDTO[]>((observer) => {
          observer.next(apiApartments);
        })
      ),
    };
    configureModules(apiServiceMockValue);

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    const apartmentService = TestBed.inject(ApartmentService);
    apartmentService.getApartments().subscribe(() => {
      expect(store.dispatch as jest.Mock).toHaveBeenCalledTimes(1);
      expect((store.dispatch as jest.Mock).mock.calls[0]).toMatchSnapshot();

      done();
    });

    expect(apiServiceMockValue.get).toHaveBeenCalledTimes(1);
    expect(apiServiceMockValue.get).toHaveBeenCalledWith('/apartments');
  });

  it('should map the stored apartment to apartment$ variable', () => {
    configureModules();

    const store = TestBed.inject(MockStore);
    const apartmentService = TestBed.inject(ApartmentService);

    const apartment = getApartmentStore('id-1');
    store.setState([apartment]);

    const expected = cold('a', {
      a: [apartment],
    });

    expect(apartmentService.apartments$).toBeObservable(expected);
  });
});
