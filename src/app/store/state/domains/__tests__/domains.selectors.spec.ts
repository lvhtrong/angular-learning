import { selectDomains } from '../domains.selectors';

describe('selectDomains', () => {
  it.each([[1], ['1']])(
    'should return "domains" property %#',
    (expectedValue) => {
      const state = {
        domains: expectedValue,
      };

      const result = selectDomains(state as any);

      expect(result).toEqual(expectedValue);
    }
  );
});
