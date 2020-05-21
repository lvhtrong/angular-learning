import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Apartment } from './apartment.model';

export const loadApartments = createAction(
  '[Apartment/API] Load Apartments',
  props<{ apartments: Apartment[] }>()
);

export const addApartment = createAction(
  '[Apartment/API] Add Apartment',
  props<{ apartment: Apartment }>()
);

export const upsertApartment = createAction(
  '[Apartment/API] Upsert Apartment',
  props<{ apartment: Apartment }>()
);

export const addApartments = createAction(
  '[Apartment/API] Add Apartments',
  props<{ apartments: Apartment[] }>()
);

export const upsertApartments = createAction(
  '[Apartment/API] Upsert Apartments',
  props<{ apartments: Apartment[] }>()
);

export const updateApartment = createAction(
  '[Apartment/API] Update Apartment',
  props<{ apartment: Update<Apartment> }>()
);

export const updateApartments = createAction(
  '[Apartment/API] Update Apartments',
  props<{ apartments: Update<Apartment>[] }>()
);

export const deleteApartment = createAction(
  '[Apartment/API] Delete Apartment',
  props<{ id: string }>()
);

export const deleteApartments = createAction(
  '[Apartment/API] Delete Apartments',
  props<{ ids: string[] }>()
);

export const clearApartments = createAction('[Apartment/API] Clear Apartments');
