import {Establishment} from './establishment';

export interface Practitioner {
  _id?: string;
  lastname: string;
  firstname: string;
  specialization: string;
  phone: string;
  establishment?: Establishment;
  email: string;
  password: string;
}
