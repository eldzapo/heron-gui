import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from '../util/types/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl = 'http://localhost:8080'

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  public getKeyCloakUser(): Observable<User> {
    return this.httpClient.get<{ firstname: string, lastname: string, email: string}>('http://localhost:8080/api/user-info', {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        'Content-type': 'application/json'
      }
    }).pipe(
      map(result => ({
        name: result.firstname,
        surname: result.lastname,
        email : result.email,
        birthdate: null,
        idCardNumber: null,
        emso: null
      }))
    );
  }

  private checkUserExists(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiUrl}/users/exists/${email}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        'Content-type': 'application/json'
      }
    });
  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, user, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        'Content-type': 'application/json'
      }
    }).pipe(
      tap(console.log)
    );
  }

  public getHelloSessions(): Observable<any> { 
    return this.httpClient.get(`${this.apiUrl}/api/sessions/generate`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      }
    }).pipe(
      tap(console.log),
      catchError(error => {
        console.error('Error loading sessions:', error);
        return of([]); 
      })
    );
  }  
  


}
