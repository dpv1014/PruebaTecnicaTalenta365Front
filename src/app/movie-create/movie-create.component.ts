import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../api.service';
import {HttpParams} from '@angular/common/http';
import {DateFormatPipe} from '../date-format.pipe';
import {DatepickerRangeComponent} from '../datepicker-range/datepicker-range.component';
import 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {
  myForm: FormGroup;

  @ViewChild('datePicker') datePicker: DatepickerRangeComponent;

  constructor(
    private fb: FormBuilder,
    public apiService: ApiService,
    private dateFormatPipe: DateFormatPipe
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      url: this.fb.control(''),
      day_start: this.fb.control('', Validators.required),
      day_end: this.fb.control('', Validators.required)
    });
  }
  ngAfterViewInit() {
  }

  openModal() {
    this.resetForm();
    $('.modal_movie').modal('show');
  }

  resetForm() {
    this.myForm.controls.name.setValue('');
    this.myForm.controls.description.setValue('');
    this.myForm.controls.url.setValue('');
    this.myForm.controls.day_start.setValue('');
    this.myForm.controls.day_end.setValue('');

    this.datePicker.resetDates();
  }

  updateValueInputsDate(filter) {
    const dates = JSON.parse(filter);
    this.myForm.controls.day_start.setValue('');
    this.myForm.controls.day_end.setValue('');
    if (dates.from && dates.to) {
      const from = this.dateFormatPipe.transformShortFormat(new Date(dates.from.year, dates.from.month-1, dates.from.day));
      const to = this.dateFormatPipe.transformShortFormat(new Date(dates.to.year, dates.to.month-1, dates.to.day));
      this.myForm.controls.day_start.setValue(from);
      this.myForm.controls.day_end.setValue(to);
    } else if (dates.from) {
      const from = this.dateFormatPipe.transformShortFormat(new Date(dates.from.year, dates.from.month-1, dates.from.day));
      this.myForm.controls.day_start.setValue(from);
      this.myForm.controls.day_end.setValue(from);
    } else if (dates.to) {
      const to = this.dateFormatPipe.transformShortFormat(new Date(dates.to.year, dates.to.month-1, dates.to.day));
      this.myForm.controls.day_start.setValue(to);
      this.myForm.controls.day_end.setValue(to);
    }
  }

  createMovie(form) {
    console.log(form);
    const values = form.value;
    const params = new HttpParams({
      fromObject: {
        name: values.name,
        description: values.description,
        url: values.url,
        day_start: values.day_start,
        day_end: values.day_end
      }
    });
    this.apiService.post('movies', params).subscribe((data) => {
      this.apiService.movies = [...this.apiService.movies, data];
      this.apiService.refreshMovies();
      $('.modal').modal('hide');
      alert("Película creada con éxito.");
    });
  }

}
