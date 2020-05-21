import { Action, createReducer, on, combineReducers } from '@ngrx/store';
import * as fromApartment from './apartment/apartment.reducer';

export const domainsFeatureKey = 'domains';

export interface State {
  [fromApartment.apartmentsFeatureKey]: fromApartment.State;
}

export const reducer = combineReducers({
  [fromApartment.apartmentsFeatureKey]: fromApartment.reducer,
});
