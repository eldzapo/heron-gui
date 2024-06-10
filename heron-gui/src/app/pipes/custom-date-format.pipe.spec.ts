import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat',
  standalone: true
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value, 'HH:mm dd/MM/yyyy');
    return formattedDate || '';
  }
}
