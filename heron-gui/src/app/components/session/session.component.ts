import { Component, Input } from '@angular/core';
import { Session } from '../../util/types/sessions.interface';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CustomDateFormatPipe } from '../../pipes/custom-date-format.pipe.spec';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'heron-session',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss'
})
export class SessionComponent {
  @Input() data : Session | null = null
  
}
