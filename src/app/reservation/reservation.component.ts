import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public apiService: ApiService
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      movie_id: this.fb.control(''),
      cellphone: this.fb.control('', Validators.required),
      id_number: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required)
    });
  }

  createReservation(form){
    console.log(form);
    let values = form.value;
    let movie_id = $('#movie-id').val() as string;
    const params = new HttpParams({
      fromObject: {
        name: values.name,
        movie_id: movie_id,
        cellphone: values.cellphone,
        id_number: values.id_number,
        email: values.email
      }
    });
    this.apiService.post('reservations', params).subscribe((data) => {
      $(".modal_reservation").modal("hide");
    });
  }

}
