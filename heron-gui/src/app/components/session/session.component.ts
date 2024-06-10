import { Component, Input } from '@angular/core';
import { Session } from '../../util/types/sessions.interface';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { format, parse } from 'date-fns';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'heron-session',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,MatDividerModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss'
})
export class SessionComponent {
  @Input() data : Session | null = null;

 protected formatDateTime(date: Date | null | undefined): string {
    if (!date) { return ''}
    return format(date, "HH:mm dd/MM/yyyy");
  }

  protected getTimeSlot(dateString: string | undefined): string {
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
