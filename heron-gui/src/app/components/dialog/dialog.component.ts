import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Session } from '../../util/types/sessions.interface';


@Component({
  selector: 'heron-dialog',
  standalone: true,
  imports: [ 
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule],
  template: `<div>
  <h2 mat-dialog-title>Reservation</h2>
  <mat-dialog-content>
        <p>{{ data.session.startDate }}</p>
        <p>{{ data.session.endDate }}</p>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close>No</button>
        <button mat-button mat-dialog-close cdkFocusInitial>Ok</button>
  </mat-dialog-actions>
  </div>`,
    styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { session: Session }
  ) {}


}
