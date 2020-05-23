import {
  selectApartment,
  selectApartmentEntities,
} from '../apartment.selectors';

describe('selectApartment', () => {
  it.each([['1'], [1]])(
    'should return "apartments" property %#',
    (expectedResult) => {
      const state = {
        apartments: expectedResult,
      };
      const result = selectApartment.projector(state);

      expect(result).toBe(expectedResult);
    }
  );
});

describe('selectApartmentEntities', () => {
  it.each([['1'], [1]])(
    'should return "entities" property %#',
    (expectedResult) => {
      const state = {
        entities: expectedResult,
      };
      const result = selectApartmentEntities.projector(state);

      expect(result).toBe(expectedResult);
    }
  );
});
