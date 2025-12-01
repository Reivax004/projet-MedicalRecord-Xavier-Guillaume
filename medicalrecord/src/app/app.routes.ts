import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Register} from './register/register';
import {Record} from './record/record';
import {RecordTransition} from './recordtransition/recordtransition';
import {AccountTransition} from './accounttransition/accounttransition';
import {Appointments} from './appointments/appointments';
import {PatientPage} from './patientpage/patientpage';
//import {Practitionerpage} from './practitionerpage/practitionerpage';
import {RecordPage} from './recordpage/recordpage';
import {FollowupRecord} from './followuprecord/followuprecord';
import {Followuppage} from './followuppage/followuppage';
import {Login} from './login/login';
import {PractitionerForm} from './accountpractitioner/accountpractitioner';
import {PractitionerPage} from './practitionerpage/practitionerpage';
import {AllPractitionners} from './allpractitionners/allpractitionners';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'home', component: Home},
  { path: 'register', component: Register},
  { path: 'register/:id', component: Register},
  { path: 'accountpractitioner', component: PractitionerForm},
  { path: 'accountpractitioner/:id', component: PractitionerForm},
  { path: 'accounttransition', component: AccountTransition},
  { path: 'record', component: Record },
  { path: 'record/:id', component: Record },
  { path: 'followuprecord', component: FollowupRecord},
  { path: 'followuprecord/:id', component: FollowupRecord},
  { path: 'followuppage/:id', component: Followuppage},
  { path: 'recordtransition', component: RecordTransition},
  { path: 'appointments', component: Appointments},
  { path: 'patientpage', component: PatientPage},
  { path: 'patientpage/:id', component: PatientPage},
  { path: 'practitionerpage', component: PractitionerPage},
  { path: 'practitionerpage/:id', component: PractitionerPage},
  { path: 'medicalrecord/:id', component: RecordPage },
  { path: 'allpractitioners', component: AllPractitionners },
  { path: 'login', component: Login },
  { path: 'practitioners/numbers/:practitionerId', component: Appointments },
  { path: '**', redirectTo: 'home'},
];
