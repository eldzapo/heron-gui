import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'heron-side-nav',
  standalone: true,
  imports: [MatSidenavModule,MatButtonModule,ThemeToggleComponent],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  protected showFiller = false;

  constructor(private oauthService: OAuthService){}

  protected logout() {
    this.oauthService.logOut();
  }


}
