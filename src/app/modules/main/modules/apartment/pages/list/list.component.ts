import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '@core/domains/apartment/services/apartment.service';
import { map } from 'rxjs/operators';
import { Apartment } from '../../models/apartment';

@Component({
  selector: 'app-aparment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  apartments: Apartment[];

  constructor(private apartmentService: ApartmentService) {}

  ngOnInit(): void {
    this.apartmentService
      .getApartments()
      .pipe(
        map((data) => {
          return data.map<Apartment>((apartment) => ({
            id: apartment.id,
            shortDescription: apartment.description.short,
            title: apartment.title,
            type: apartment.type,
            address: `${apartment.address.street} ${apartment.address.district} ${apartment.address.city}`,
          }));
        }),
        map((apartments) => {
          this.apartments = apartments;
        })
      )
      .subscribe();
  }
}
