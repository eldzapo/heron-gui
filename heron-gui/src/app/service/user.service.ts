import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from '../util/types/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Session } from '../util/types/sessions.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl = 'http://localhost:8080'

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  public getKeyCloakUser(): Observable<User> {
    return this.httpClient.get<{ firstName: string, lastName: string }>('http://localhost:8080/api/hello', {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        'Content-type': 'application/json'
      }
    }).pipe(
     tap(console.log),
      map(result => ({
        name: result.name,
        surname: result.lastName,
        birthdate: null,
        idCardNumber: null,
        emso: null
      }))
    );
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

  public getHelloSessions(): Observable<any> { // Change return type to Observable<any>
    return this.httpClient.get(`${this.apiUrl}/api/sessions/generate`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      }
    }).pipe(
      tap(console.log),
      catchError(error => {
        console.error('Error loading sessions:', error);
        return of([]); // Return an empty array if there's an error
      })
    );
  }  
  


}
