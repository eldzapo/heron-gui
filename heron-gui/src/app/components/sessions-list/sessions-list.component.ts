import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { Session } from '../../util/types/sessions.interface';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { SessionComponent } from '../session/session.component';
import {format} from 'date-fns/format';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SessionOptionsComponent } from '../session-options/session-options.component';
import { SessionsService } from '../../service/sessions.service';

@Component({
  selector: 'heron-sessions-list',
  standalone: true,
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss'],
  imports: [
    CommonModule, SessionComponent,MatIconModule,MatButtonModule,MatTooltipModule,SessionOptionsComponent
  ]
})
export class SessionsListComponent implements OnInit {
  protected filteredSessions$: Observable<Session[]> | undefined;
  private currentDateSubject: BehaviorSubject<Date>;
  protected currentDate$: Observable<Date>;
  protected session4Options$ : Observable<Session> | undefined;
  private sessions: Session[] = [];
  protected loading = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private sessionService: SessionsService
  ) {
    this.currentDateSubject = new BehaviorSubject<Date>(new Date());
    this.currentDate$ = this.currentDateSubject.asObservable();
  }

  ngOnInit(): void {
    this.currentDateSubject.next(new Date());
    this.loadAndFilterSessions();
  }

 protected loadAndFilterSessions(): void {
    const todayDate = this.getFormattedDate(this.currentDateSubject.getValue());
    this.sessionService.getSessions().subscribe((result: { [key: string]: Session[] }) => {
      for (const key in result) {
        if (result.hasOwnProperty(key) && key === todayDate) {
          this.sessions = result[key];
          this.filteredSessions$ = of(this.sessions);
          this.cdr.detectChanges();
          return;
        }
      }
    });
  }

 private getFormattedDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

 protected formatDateTime(date: Date | null): string {
    if (!date) { return ''}
    return format(date, "dd/MM/yyyy");
  }

  protected goToNextDay(): void {
    const currentDate = this.currentDateSubject.getValue();
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
  
    const thirtyDaysFromToday = new Date();
    thirtyDaysFromToday.setDate(thirtyDaysFromToday.getDate() + 30);
    if (nextDate <= thirtyDaysFromToday) {
      this.currentDateSubject.next(nextDate);
      this.loadAndFilterSessions();
      this.cdr.detectChanges();
    }
  }
  
  protected goToPreviousDay(): void {
    const currentDate = this.currentDateSubject.getValue();
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (prevDate >= today) {
      this.currentDateSubject.next(prevDate);
      this.loadAndFilterSessions();
      this.cdr.detectChanges();
    }
  } 

  protected handleSessionClick(session: Session | null): void {
    const sess = session
    sess ? this.session4Options$ = of(sess) : null;
  }
  
}
