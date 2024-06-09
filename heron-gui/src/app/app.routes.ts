import { Routes } from '@angular/router';
import { SessionsListComponent } from './components/sessions-list/sessions-list.component'; // Update the path accordingly
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sessions-list', pathMatch: 'full' }, // Redirect to signup if no route is specified
  { path: 'sessions-list', component: SessionsListComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'signup', component: UserFormComponent }

];
