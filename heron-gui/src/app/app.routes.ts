import { Routes } from '@angular/router';
import { SessionsListComponent } from './components/sessions-list/sessions-list.component'; // Update the path accordingly
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';

export const routes: Routes = [
  { path: 'sessions-list', component: SessionsListComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'how-it-works', component: HowItWorksComponent }
];
