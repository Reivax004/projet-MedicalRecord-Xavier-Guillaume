import {Vaccine} from './vaccine';
import {Practitioner} from './practitioner';

export interface MedicalRecord {
  _id?: string;
  weight: number;
  height: number;
  blood_group : string;
  blood_pressure: string;
  //general_practitioner: Practitioner;
  vaccine: Vaccine[];
  allergies: [];
}


