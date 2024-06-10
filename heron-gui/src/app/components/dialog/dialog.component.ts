import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'heron-dialog',
  standalone: true,
  imports: [ 
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,],
  template: `<div>
  <h2 mat-dialog-title>Reservation</h2>
      <mat-dialog-content>
        Would you like to delete cat.jpeg?
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close>No</button>
        <button mat-button mat-dialog-close cdkFocusInitial>Ok</button>
  </mat-dialog-actions>
  </div>`,
    styleUrl: './dialog.component.scss'
})
export class DialogComponent {

}
