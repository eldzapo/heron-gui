import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => resolve());
  });
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideOAuthClient(),  {
    provide: APP_INITIALIZER,
    useFactory: (oauthService: OAuthService) => {
      return () => {
        initializeOAuth(oauthService);
      }
    },
    multi: true,
    deps: [
      OAuthService
    ]
  }, provideAnimationsAsync()]
};
