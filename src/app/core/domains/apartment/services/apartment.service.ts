import { Injectable } from '@angular/core';
import { environment } from '@env';
import UrlAssembler from 'url-assembler';
import { Observable } from 'rxjs';

import { ApiService } from '../../../services/api/api.service';
import { ApartmentApiResponse } from '../models/apartment-api-response';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  constructor(private api: ApiService) {}

  /**
   * getApartments
   */
  public getApartments(): Observable<ApartmentApiResponse[]> {
    const apiUrl = environment.apiUrl;
    const url = UrlAssembler(apiUrl).segment('/apartments').toString();

    return this.api.get<ApartmentApiResponse[]>(url);
  }
}
