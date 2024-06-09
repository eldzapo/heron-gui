import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Link } from './util/types/link.interface';
import { UserService } from './service/user.service';
import { User } from './util/types/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ThemeToggleComponent, SideNavComponent, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  protected title = 'heron-gui';
  protected fullName = '';

  protected LINKS: Link[] = [
    {
      id: 1,
      title: 'Sessions',
      description: 'Sessions list',
      icon: 'exercise',
      path: 'sessions-list'
    },
    {
      id: 2,
      title: 'Profile',
      description: 'Profile',
      icon: 'account_circle',
      path: 'user-profile'
    },
    {
      id: 3,
      title: 'About',
      description: 'About',
      icon: 'description',
      path: 'how-it-works'
    }
  ];

  constructor(
    private oauthService: OAuthService,
    private httpClient: HttpClient,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { };


  protected removeIssParameter() {
        const url = new URL(window.location.href);
        url.searchParams.delete('iss');
        window.history.replaceState({}, document.title, url.pathname);
  }

  ngOnInit(): void {
    window.onload = this.removeIssParameter;
  }

  protected getUser() {
    console.log('test')
    this.userService.getKeyCloakUser().subscribe(user => {
      console.log('User data:', user);
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }


  getHelloSessions() {
    this.httpClient.get<{ data: any[] }>('http://localhost:8080/api/sessions/generate', {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      }
    }).subscribe(result => {
      console.log(result);
    });
  }
}
