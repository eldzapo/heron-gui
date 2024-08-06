import { Injectable } from "@angular/core";
import {environment} from '../../environments/environment'
import { HttpClient } from "@angular/common/http";
import { OAuthService } from "angular-oauth2-oidc";
import { catchError, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class SessionsService {
    private apiUrl = environment.apiUrl; 
    constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

    
  public getSessions(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/sessions/generate`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      }
    }).pipe(
      catchError(this.handleError<any>('getHelloSessions', []))
    );
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.error('Error details:', error);
      return of(result as T);
    };
  }
  }
  