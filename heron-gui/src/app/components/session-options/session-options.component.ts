import { CommonModule } from '@angular/common';
import { Component, inject, Inject, Input } from '@angular/core';
import { Session } from '../../util/types/sessions.interface';
import { CustomDateFormatPipe } from '../../pipes/custom-date-format.pipe';
import { MatCardModule } from '@angular/material/card';
import { TimeSlotPipe } from '../../pipes/time-slot.pipe';
import { MatButtonModule } from '@angular/material/button';
import { WorkoutService } from '../../service/workout.service';
import { Store } from '@ngrx/store';
import { User } from '../../util/types/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'heron-session-options',
  standalone: true,
  imports: [CommonModule,CustomDateFormatPipe,MatCardModule, MatButtonModule, TimeSlotPipe],
  templateUrl: './session-options.component.html',
  styleUrl: './session-options.component.scss'
})
export class SessionOptionsComponent {
  @Input() session : Session | null = null;
  private store = inject(Store<{ user: { user: User | null, loading: boolean } }>);
  protected user$: Observable<User | null> | undefined;

  constructor(  private workoutService: WorkoutService,
  ){ 
    this.user$ = this.store.select(state => state.user.user);

  }

  protected reserve(session: Session){
    this.user$?.subscribe((user) => {
      if(user)
      this.workoutService.addWorkout({
        id:null,
        customer: user.id,
        startDate: session.startDate,
        endDate: session.endDate,
        reserved: true  
      }).subscribe(console.log)
      else console.log('err')
    })
    console.log(session);
  }

}
