import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Link } from './util/types/link.interface';
import { User } from './util/types/user.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from './store/actions/user.actions';
import { AsyncPipe, NgIf } from '@angular/common';
import { loadAuth } from './store/actions/auth.actions';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, ThemeToggleComponent, SideNavComponent, 
    MatSidenavModule, NgIf, AsyncPipe, MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Store]
})
export class AppComponent implements OnInit {
  protected title = 'heron-gui';
  protected fullName = '';
  protected user$: Observable<User | null> | undefined;
  protected loading$: Observable<boolean> | undefined;
  protected token$: Observable<boolean> | undefined;
  protected tokenLoading$: Observable<boolean> | undefined;
  private userService = inject(UserService);
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

  constructor() {
    this.token$ = this.store.select(state => state.auth.token);
    this.tokenLoading$ = this.store.select(state => state.auth.loading);
    this.user$ = this.store.select(state => state.user.user);
    this.loading$ = this.store.select(state => state.user.loading);
    this.store.dispatch(UserActions.loadUser());
  }

  protected removeIssParameter() {
    const url = new URL(window.location.href);
    url.searchParams.delete('iss');
    window.history.replaceState({}, document.title, url.pathname);
  }

  ngOnInit(): void {
    window.onload = this.removeIssParameter;
    this.store.dispatch(loadAuth());
    this.removeIssParameter();

    this.userService.getKeyCloakUser().subscribe(
      user => {
        this.userService.checkIfUserExists(user.email).subscribe(
          exists => {
            if (exists) {
              this.store.dispatch(UserActions.loadUserSuccess({ user }));
            } else {
              this.userService.addUser(user).subscribe(
                newUser => {
                  this.store.dispatch(UserActions.addUser({ user: newUser }));
                }
              );
            }
          }
        );
      },
      error => {
        console.error('Error fetching KeyCloak user:', error);
      }
    );
  }
}
