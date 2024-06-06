import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ThemeService } from './service/theme/theme.service';
import { Link } from './util/types/link.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ThemeToggleComponent, SideNavComponent, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected title = 'heron-gui';
  protected helloText = {};

  protected LINKS: Link[] = [
    {
      "id":1,
      "title":"Sessions",
      "description": "Sessions list",
      "icon":"exercise",
      "path":"sessions-list"
    },
    {
      "id":2,
      "title":"Profile",
      "description": "Profile",
      "icon":"account_circle",
      "path":"user-profile"
    },
    {
      "id":3,
      "title":"About",
      "description": "About",
      "icon":"description",
      "path":"how-it-works"
    }
  ]

  constructor(
    private oauthService: OAuthService, 
    private httpClient: HttpClient,
  ) { 
  }

  getHelloText() {
    this.httpClient.get('http://localhost:8080/api/sessions/generate', {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      }
    }).subscribe(result => {
      console.log(this.oauthService.getAccessToken())
      console.log(result)
      this.helloText = result.toString();
    });
  }

}
