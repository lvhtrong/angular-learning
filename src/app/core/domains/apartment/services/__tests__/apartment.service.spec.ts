import { ApartmentService } from '../apartment.service';

const getApiInstance = () => {
  return {
    get: jest.fn(),
  };
};

const getStoreInstance = () => {
  return {
    dispatch: jest.fn(),
  };
};

const setup = ({ api, store }) => {
  return new ApartmentService(api, store);
};

describe('getApartments', () => {
  const api = getApiInstance();
  const store = getStoreInstance();

  beforeEach(() => {
    api.get.mockClear();
    store.dispatch.mockClear();
  });

  it('should call api to get apartments', () => {
    const apartmentService = setup({
      api,
      store,
    });

    apartmentService.getApartments();

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('/apartments');
  });
});
