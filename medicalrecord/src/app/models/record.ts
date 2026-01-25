import {Vaccine} from './vaccine';

export interface MedicalRecord {
  _id?: string;
  weight: number;
  height: number;
  blood_group : string;
  blood_pressure: string;
  vaccines: Vaccine[];
  allergies: [];
}


