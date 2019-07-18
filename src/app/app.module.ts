import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { MovieListComponent } from './movie-list/movie-list.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LeftMainComponent } from './left-main/left-main.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DatepickerRangeComponent } from './datepicker-range/datepicker-range.component';
import { DateFormatPipe } from './date-format.pipe';

import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeEn, 'en');

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieCreateComponent,
    LeftMainComponent,
    ReservationComponent,
    ReservationListComponent,
    DatepickerRangeComponent,
    DateFormatPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    ApiService,
    DateFormatPipe,
    {
      provide: LOCALE_ID,
      useValue: 'en'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
