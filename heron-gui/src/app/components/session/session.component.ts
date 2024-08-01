import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Session } from '../../util/types/sessions.interface';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { format, parse } from 'date-fns';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CustomDateFormatPipe } from '../../pipes/custom-date-format.pipe';
import { TimeSlotPipe } from '../../pipes/time-slot.pipe';

@Component({
  selector: 'heron-session',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,MatDividerModule,MatDialogModule, CustomDateFormatPipe, TimeSlotPipe ],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss'
})
export class SessionComponent {
  @Input() data : Session | null = null;
  @Output() sessionClicked: EventEmitter<Session | null> = new EventEmitter<Session | null>();

  constructor(public dialog: MatDialog) {};

  protected openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { session: this.data }
    });
  }

  protected onSessionClick(): void {
    this.sessionClicked.emit(this.data);
  }
  
}
