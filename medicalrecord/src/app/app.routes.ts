import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Register} from './register/register';
import {Record} from './record/record';
import {RecordTransition} from './recordtransition/recordtransition';
import {AccountPractitioner} from './accountpractitioner/accountpractitioner';
import {AccountTransition} from './accounttransition/accounttransition';
import {Appointments} from './appointments/appointments';
import {PatientPage} from './patientpage/patientpage';
//import {Practitionerpage} from './practitionerpage/practitionerpage';
import {RecordPage} from './recordpage/recordpage';
import {FollowupRecord} from './followuprecord/followuprecord';
import {Followuppage} from './followuppage/followuppage';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'home', component: Home},
  { path: 'register', component: Register},
  { path: 'register/:id', component: Register},
  { path: 'accountpractitioner', component: AccountPractitioner},
  { path: 'accounttransition', component: AccountTransition},
  { path: 'record', component: Record },
  { path: 'record/:id', component: Record },
  { path: 'followuprecord', component: FollowupRecord},
  { path: 'followuprecord/:id', component: FollowupRecord},
  { path: 'followuppage/:patientId', component: Followuppage},
  { path: 'recordtransition', component: RecordTransition},
  { path: 'appointments', component: Appointments},
  { path: 'patientpage', component: PatientPage},
  { path: 'patientpage/:id', component: PatientPage},
  //{ path: 'practitionerpage', component: Practitionerpage},
  //{ path: 'testmongo', component: Testmongo},
  { path: 'medicalrecord/:id', component: RecordPage },
  { path: '**', redirectTo: 'home'},
];
