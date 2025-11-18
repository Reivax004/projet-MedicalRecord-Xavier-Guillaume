import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Register} from './register/register';
import {Record} from './record/record';
import {FollowupRecord} from './followuprecord/followuprecord';
import {RecordTransition} from './recordtransition/recordtransition';
import {AccountPractitioner} from './accountpractitioner/accountpractitioner';
import {AccountTransition} from './accounttransition/accounttransition';
import {Appointments} from './appointments/appointments';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'home', component: Home},
  { path: 'register', component: Register},
  { path: 'accountpractitioner', component: AccountPractitioner},
  { path: 'accounttransition', component: AccountTransition},
  { path: 'record', component: Record},
  { path: 'followuprecord', component: FollowupRecord},
  { path: 'recordtransition', component: RecordTransition},
  { path: 'appointments', component: Appointments},
  { path: '**', redirectTo: 'home'}

];
