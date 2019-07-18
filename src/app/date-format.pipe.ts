import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';


@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe  extends DatePipe implements PipeTransform {

  transformLargeFormat(value: any, args?: any): any {
    return super.transform(value, 'd MMM y');
  }

  transformShortFormat(value: any, args?: any): any {
    return super.transform(value, 'y-M-d');
  }

}
