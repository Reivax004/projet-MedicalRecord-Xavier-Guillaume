import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Register} from './register/register';
import {Record} from './record/record';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'home', component: Home},
  { path: 'register', component: Register},
  { path: 'record', component: Record},
  { path: '**', redirectTo: 'home'},
];
