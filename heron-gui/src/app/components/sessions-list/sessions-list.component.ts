import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  filteredSessions$: Observable<Session[]> | undefined;
  today = '';
  private sessions: Session[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private sessionService: UserService
  ) {}

  ngOnInit(): void {
    this.loadAndFilterSessions();
  }

  protected getTodayDate(): string {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  }

  loadAndFilterSessions(): void {
    this.sessionService.getHelloSessions().subscribe((result: { [key: string]: Session[] }) => {
      console.log('All Sessions:', result);

      const todayDate = this.getTodayDate();

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
}
