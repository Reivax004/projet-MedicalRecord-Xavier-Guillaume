import {Address} from './address';
import {MedicalRecord} from './record';


export interface Account {
  _id?: string;
  SSN: number;
  lastname: string;
  firstname: string;
  birthdate: Date;
  address: Address;
  sex: string;
  phone: number;
  email: string;
  password: string;
  general_file : MedicalRecord;
}
