import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbCalendar, NgbDate, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {DateFormatPipe} from '../date-format.pipe';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ViewChild } from '@angular/core';
import { setTimeout } from 'timers';
import 'jquery';
import 'bootstrap';


@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.css']
})
export class DatepickerRangeComponent implements OnInit {
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  @ViewChild('d') datePickerRef;
  input;

  @Input() labelText: string;
  @Output() callbackMethod = new EventEmitter<string>();

  constructor(
    calendar: NgbCalendar,
    private fb: FormBuilder,
    private dateFormatPipe: DateFormatPipe
  ) {
    this.fromDate = null;
    this.toDate = null;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.input = this.datePickerRef._elRef.nativeElement;
  }

  public resetDates(){
    this.fromDate = null;
    this.toDate = null;
    this.input.value = '';
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if ((this.fromDate && !this.toDate && date.after(this.fromDate)) || (date.equals(this.fromDate) && !this.fromDate.equals(this.toDate))) {
      this.toDate = date;
      this.datePickerRef.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.callbackMethod.next(JSON.stringify({from: this.fromDate, to: this.toDate}));
    this.setDateToInput();
  }

  private setDateToInput() {
    let from = this.dateFormatPipe.transformLargeFormat(new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day));
    if (!this.fromDate.equals(this.toDate) && this.toDate) {
      let to = this.dateFormatPipe.transformLargeFormat(new Date(this.toDate.year, this.toDate.month-1, this.toDate.day));
      this.input.value = from + ' - ' + to;
    } else {
      this.input.value = from;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
