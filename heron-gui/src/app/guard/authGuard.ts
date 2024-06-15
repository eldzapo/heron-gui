import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private oauthService: OAuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    const claims = this.oauthService.getIdentityClaims();
    const email = claims ? claims['email'] : null;

    if (!email) {
      this.router.navigate(['/signup']);
      return of(false);
    }

    return this.http.get(`/api/users/email/${email}`).pipe(
      map((user: any) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/signup']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/signup']);
        return of(false);
      })
    );
  }
}
