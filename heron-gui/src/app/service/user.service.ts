import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from '../util/types/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl; 
  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  public getKeyCloakUser(): Observable<User> {
    return this.httpClient.get<{ firstname: string, lastname: string, email: string }>(`${this.apiUrl}/user-info`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        'Content-type': 'application/json'
      }
    }).pipe(
      map(result => ({
        name: result.firstname,
        surname: result.lastname,
        email: result.email,
        birthdate: null,
        idCardNumber: null,
        emso: null
      })),
      catchError(this.handleError<User>('getKeyCloakUser'))
    );
  }

  public checkIfUserExists(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiUrl}/customers/by-email/${email}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        'Content-type': 'application/json'
      }
    }).pipe(
      catchError(this.handleError<boolean>('checkIfUserExists'))
    );
  }  

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/customers`, user, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        'Content-type': 'application/json'
      }
    }).pipe(
      catchError(this.handleError<User>('addUser'))
    );
  }

  public getSessions(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/sessions/generate`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      }
    }).pipe(
      catchError(this.handleError<any>('getHelloSessions', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.error('Error details:', error);
      return of(result as T);
    };
  }
}
