import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UpdateTracking } from '@store/models/common/update-tracking.model';
import { Apartment } from './apartment.model';
import * as ApartmentActions from './apartment.actions';

export const apartmentsFeatureKey = 'apartments';

export interface State extends EntityState<Apartment>, UpdateTracking {
  // additional entities state properties
}

export const adapter: EntityAdapter<Apartment> = createEntityAdapter<Apartment>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  updatedAt: null
});


export const reducer = createReducer(
  initialState,
  on(ApartmentActions.addApartment,
    (state, action) => adapter.addOne(action.apartment, state)
  ),
  on(ApartmentActions.upsertApartment,
    (state, action) => adapter.upsertOne(action.apartment, state)
  ),
  on(ApartmentActions.addApartments,
    (state, action) => adapter.addMany(action.apartments, state)
  ),
  on(ApartmentActions.upsertApartments,
    (state, action) => adapter.upsertMany(action.apartments, state)
  ),
  on(ApartmentActions.updateApartment,
    (state, action) => adapter.updateOne(action.apartment, state)
  ),
  on(ApartmentActions.updateApartments,
    (state, action) => adapter.updateMany(action.apartments, state)
  ),
  on(ApartmentActions.deleteApartment,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ApartmentActions.deleteApartments,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ApartmentActions.loadApartments,
    (state, action) => adapter.setAll(action.apartments, state)
  ),
  on(ApartmentActions.clearApartments,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
