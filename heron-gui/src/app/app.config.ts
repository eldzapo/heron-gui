import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducers';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { AuthInterceptor } from './util/authInterceptor';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:9090/realms/heron',
  tokenEndpoint: 'http://localhost:9090/realms/heron/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  clientId: 'heron',
  responseType: 'code',
  scope: 'openid profile',
  showDebugInformation: true,
};

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve, reject) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin()
      .then(isLoggedIn => {
        if (isLoggedIn) {
          resolve();
        } else {
          reject('OAuth login failed');
        }
      })
      .catch(err => reject(err));
  });
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideOAuthClient(),  provideStore({ user: userReducer }),
    provideEffects([UserEffects]),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => initializeOAuth(oauthService);
      },
      multi: true,
      deps: [OAuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
   provideAnimationsAsync()]
};
