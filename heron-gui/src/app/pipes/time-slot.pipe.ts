import { Pipe, PipeTransform } from '@angular/core';
import { parse } from 'date-fns';

@Pipe({
  name: 'timeSlot',
  standalone: true
})
export class TimeSlotPipe implements PipeTransform {

  transform(dateString: string | undefined): string {
    if (!dateString) { return 'Termin'; }
    const parsedDate = parse(dateString, "HH:mm dd/MM/yyyy", new Date());
    const hour = parsedDate.getHours();
    if (hour >= 4 && hour < 12) {
      return "Jutranji termin";
    } else if (hour >= 12 && hour < 18) {
      return "Popoldanski termin";
    } else if (hour >= 18 && hour < 23) {
      return "Vecerni termin";
    } else {
      return "Nocni termin";
    }
  }
}
