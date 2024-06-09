import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from '../../util/types/user.interface';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';

let USER : User = {
  "name": null,
  "surname": null,
  "birthdate": null,
  "idCardNumber": null,
  "emso":null,
}

interface KKResult {
  firstName : string,
  lastName : string
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {


USER: any;

constructor ( private oauthService: OAuthService, private httpClient: HttpClient, private userService : UserService) { }

protected getKeyCloakUser() {
 this.userService.getKeyCloakUser()
}

protected  onSubmit() {
      throw new Error('Method not implemented.');
      }
}
