import { Injectable } from "@angular/core";
import {environment} from '../../environments/environment'
import { HttpClient } from "@angular/common/http";
import { OAuthService } from "angular-oauth2-oidc";
import { User } from "../util/types/user.interface";
import { catchError, Observable, of } from "rxjs";
import { Session } from "../util/types/sessions.interface";

@Injectable({
    providedIn: 'root'
  })
  export class WorkoutService {

    private apiUrl = environment.apiUrl; 
    constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

    public addWorkout(session: Session): Observable<Session> {
        return this.httpClient.post<Session>(`${this.apiUrl}/workouts/add`, session, {
          headers: {
            'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
            'Content-type': 'application/json'
          }
        }).pipe(
          catchError(this.handleError<Session>('addSession'))
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
  