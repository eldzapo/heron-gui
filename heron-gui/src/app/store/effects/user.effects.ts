// src/app/store/effects/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../../service/user.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(() => this.userService.getKeyCloakUser().pipe(
        map(user => UserActions.loadUserSuccess({ user })),
        catchError(error => of(UserActions.loadUserFailure({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
