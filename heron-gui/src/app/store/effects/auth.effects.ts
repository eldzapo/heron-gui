import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OAuthService } from 'angular-oauth2-oidc';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { authSuccess, authFailure, loadAuth } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  loadAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAuth),
      mergeMap(() =>
        this.oauthService.loadDiscoveryDocumentAndLogin().then(
          () => {
            const token = this.oauthService.getAccessToken();
            if (token) {
              return authSuccess({ token });
            } else {
              return authFailure({ error: 'No token available' });
            }
          },
          error => authFailure({ error })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private oauthService: OAuthService
  ) {}
}
