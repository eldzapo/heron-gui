import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../util/types/user.interface';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/actions/user.actions'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'heron-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  private store = inject(Store<{ user: { user: User | null, loading: boolean } }>);
  protected user$: Observable<User | null> | undefined;
  protected loading$: Observable<boolean> | undefined;

  constructor(){
    this.user$ = this.store.select(state => state.user.user);
    this.loading$ = this.store.select(state => state.user.loading);
    this.store.dispatch(UserActions.loadUser());
  }
}
