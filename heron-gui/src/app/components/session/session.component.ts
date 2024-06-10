import { Component, Input } from '@angular/core';
import { Session } from '../../util/types/sessions.interface';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {format} from 'date-fns/format';

@Component({
  selector: 'heron-session',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss'
})
export class SessionComponent {
  @Input() data : Session | null = null;

  formatDateTime(date: Date | null | undefined): string {
    if (!date) { return ''}
    return format(date, "HH:mm dd/MM/yyyy");
  }
  
}
