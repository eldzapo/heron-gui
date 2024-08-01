import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Session } from '../../util/types/sessions.interface';
import { CustomDateFormatPipe } from '../../pipes/custom-date-format.pipe';
import { MatCardModule } from '@angular/material/card';
import { TimeSlotPipe } from '../../pipes/time-slot.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'heron-session-options',
  standalone: true,
  imports: [CommonModule,CustomDateFormatPipe,MatCardModule, MatButtonModule, TimeSlotPipe],
  templateUrl: './session-options.component.html',
  styleUrl: './session-options.component.scss'
})
export class SessionOptionsComponent {
  @Input() session : Session | null = null;
}
