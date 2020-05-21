import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../..';

export const selectDomains = (state: State) => state.domains;
