import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Session } from '../../util/types/sessions.interface';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { SessionComponent } from '../session/session.component';

@Component({
  selector: 'heron-sessions-list',
  standalone: true,
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss'],
  imports: [
    CommonModule, SessionComponent
  ]
})
export class SessionsListComponent implements OnInit {
  protected filteredSessions$: Observable<Session[]> | undefined;
  private currentDateSubject: BehaviorSubject<Date>;
  currentDate$: Observable<Date>;
  private sessions: Session[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private sessionService: UserService
  ) {
    this.currentDateSubject = new BehaviorSubject<Date>(new Date());
    this.currentDate$ = this.currentDateSubject.asObservable();
  }

  ngOnInit(): void {
    this.loadAndFilterSessions();
  }

  loadAndFilterSessions(): void {
    const todayDate = this.getFormattedDate(this.currentDateSubject.getValue());
    this.sessionService.getHelloSessions().subscribe((result: { [key: string]: Session[] }) => {
      console.log('All Sessions:', result);
      for (const key in result) {
        if (result.hasOwnProperty(key) && key === todayDate) {
          this.sessions = result[key];
          this.filteredSessions$ = of(this.sessions);
          console.log('Filtered Sessions for Today:', this.filteredSessions$);
          this.cdr.detectChanges();
          return;
        }
      }
    });
  }

  getFormattedDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  goToNextDay(): void {
    const currentDate = this.currentDateSubject.getValue();
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
  
    // Check if nextDate is not beyond 30 days from today
    const thirtyDaysFromToday = new Date();
    thirtyDaysFromToday.setDate(thirtyDaysFromToday.getDate() + 30);
    if (nextDate <= thirtyDaysFromToday) {
      this.currentDateSubject.next(nextDate);
      this.loadAndFilterSessions();
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }
  
  
  goToPreviousDay(): void {
    const currentDate = this.currentDateSubject.getValue();
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
  
    // Check if prevDate is not older than today
    if (prevDate >= new Date()) {
      this.currentDateSubject.next(prevDate);
      this.loadAndFilterSessions();
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }  
  
}
