import { Component, Input } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { Link } from '../../util/types/link.interface';
import { GuideComponent } from '../guide/guide.component';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'heron-side-nav',
  standalone: true,
  imports: [MatSidenavModule,MatButtonModule,MatIconModule,ThemeToggleComponent,GuideComponent,NgFor,NgIf],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  protected showFiller = false;
  @Input() links:Link[] | undefined = []

  constructor(private oauthService: OAuthService){}

  protected logout() {
    console.log('click')
    this.oauthService.logOut();
  }


}
