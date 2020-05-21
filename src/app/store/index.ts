import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '@env';
import * as fromDomains from './state/domains/domains.reducer';

export interface State {
  [fromDomains.domainsFeatureKey]: fromDomains.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromDomains.domainsFeatureKey]: fromDomains.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
