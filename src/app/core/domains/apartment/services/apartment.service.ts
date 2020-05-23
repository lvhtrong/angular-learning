import { Injectable } from '@angular/core';
import { environment } from '@env';
import UrlAssembler from 'url-assembler';
import { Store, select } from '@ngrx/store';
import * as fromApartmentActions from '@store/state/domains/apartment/apartment.actions';
import * as fromApartmentSelectors from '@store/state/domains/apartment/apartment.selectors';

import { ApiService } from '../../../services/api/api.service';
import { ApartmentDTO } from '../models/apartment.dto';
import { mapToStoreApartment, mapFromStoreApartment } from '../utils';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  apartments$ = this.store.pipe(
    select(fromApartmentSelectors.selectApartmentEntities),
    map((apartmentEntities) => Object.values(apartmentEntities)),
    map((apartments) => apartments.map((a) => mapFromStoreApartment(a)))
  );

  constructor(private api: ApiService, private store: Store) {}

  /**
   * getApartments
   */
  public getApartments(): Observable<void> {
    return new Observable<void>((observer) => {
      const apiUrl = environment.apiUrl;
      const url = UrlAssembler(apiUrl).segment('/apartments').toString();

      this.api.get<ApartmentDTO[]>(url).subscribe((apartments) => {
        this.store.dispatch(
          fromApartmentActions.upsertApartments({
            apartments: apartments.map((a) => mapToStoreApartment(a)),
          })
        );
        observer.next();
      });
    });
  }
}
