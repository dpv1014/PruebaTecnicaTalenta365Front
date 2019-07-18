import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {DateFormatPipe} from '../date-format.pipe';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(
    public apiService: ApiService,
    private dateFormatPipe: DateFormatPipe
  ) { }

  ngOnInit() {
    this.apiService.get('reservations', {}).subscribe((data) => {
      let dataArray = new Int8Array(data);
      let reservations: Object[] = [];
      for(let i in dataArray){
        reservations[i] = data[i];
      }
      this.apiService.reservations = reservations;
      this.apiService.refreshReservations();
    });
  }

  updateReservationsWithFilter(filter){
    let dates = JSON.parse(filter);
    let from = dates.from;
    let to = dates.to;
    if(from && to){
      from = this.dateFormatPipe.transformShortFormat(new Date(from.year, from.month-1, from.day));
      to = this.dateFormatPipe.transformShortFormat(new Date(to.year, to.month-1, to.day));
      this.apiService.get('reservations', {params: {date_start: from, date_end: to}}).subscribe((data) => {
        let dataArray = new Int8Array(data);
        let reservations: Object[] = [];
        for(let i in dataArray){
          reservations[i] = data[i];
        }
        this.apiService.reservations = reservations;
        this.apiService.refreshReservations();
      });
    }
  }

}
