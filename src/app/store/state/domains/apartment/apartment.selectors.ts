import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectDomains } from '../domains.selectors';

export const selectApartment = createSelector(
  selectDomains,
  (state) => state.apartments
);

export const selectApartmentEntities = createSelector(
  selectApartment,
  (state) => state.entities
);
