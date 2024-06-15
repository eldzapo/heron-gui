import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, inject, Pipe, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Link } from './util/types/link.interface';
import { User } from './util/types/user.interface';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import * as UserActions from './store/actions/user.actions'
import { AsyncPipe, NgIf } from '@angular/common';
import { loadAuth } from './store/actions/auth.actions';
import {MatToolbarModule} from '@angular/material/toolbar';
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ThemeToggleComponent, SideNavComponent, MatSidenavModule, NgIf, AsyncPipe,MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[Store]
})
export class AppComponent implements OnInit{
  protected title = 'heron-gui';
  protected fullName = '';
  protected user$: Observable<User | null> | undefined;
  protected loading$: Observable<boolean> | undefined;
  protected token$: Observable<boolean> | undefined;
  protected tokenLoading$: Observable<boolean> | undefined;

  private store = inject(Store<{ user: { user: User | null, loading: boolean } }>);

  public isAuthenticated = false;

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
  ) { 
    this.token$ = this.store.select(state => state.auth.token);
    this.tokenLoading$ = this.store.select(state => state.auth.loading)
    this.user$ = this.store.select(state => state.user.user);
    this.loading$ = this.store.select(state => state.user.loading);
    this.store.dispatch(loadAuth());
  };

  protected removeIssParameter() {
        const url = new URL(window.location.href);
        url.searchParams.delete('iss');
        window.history.replaceState({}, document.title, url.pathname);
  }

  ngOnInit(): void {
    window.onload = this.removeIssParameter;
    this.store.dispatch(UserActions.loadUser());
    this.store.dispatch(loadAuth());
    this.removeIssParameter();
  }

}
