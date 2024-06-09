import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'heron-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss']
})
export class SessionsListComponent implements OnInit {

  sessions: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private oauthService: OAuthService,
    private httpClient: HttpClient,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getHelloSessions();
  }

  protected getHelloSessions() {
    this.httpClient.get<{ data: any[] }>('http://localhost:8080/api/sessions/generate', {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      }
    }).subscribe({
      next: result => {
        this.sessions = result.data;
        this.loading = false;
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: err => {
        this.error = 'Failed to fetch sessions.';
        this.loading = false;
        this.cdr.detectChanges(); // Manually trigger change detection
      }
    });
  }

  protected getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getSessionsForToday(): any[] {
    const todayDate = this.getTodayDate();
    return this.sessions.filter(session => session.date === todayDate);
  }
}
