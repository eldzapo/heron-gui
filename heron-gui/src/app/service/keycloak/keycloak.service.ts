import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak: Keycloak.KeycloakInstance;

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:9090/realms/heron',
      realm: 'heron',
      clientId: 'heron'
    });
  }
  init(): Promise<void> {
    return this.keycloak.init({ onLoad: 'login-required' }).then(
      authenticated => {
        if (authenticated) {
          return Promise.resolve();
        } else {
          return Promise.reject('Authentication failed');
        }
      },
      error => {
        return Promise.reject('Keycloak initialization error');
      }
    );
  }

  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.keycloak.token) {
        this.keycloak.updateToken(30).then(
          () => {
            if (this.keycloak.token) {
              resolve(this.keycloak.token);
            } else {
              reject('Failed to refresh token: Token is undefined after refresh');
            }
          },
          () => reject('Failed to refresh token')
        );
      } else {
        reject('No token available');
      }
    });
  }  

  isAuthenticated(): boolean | undefined {
    return this.keycloak.authenticated;
  }
}