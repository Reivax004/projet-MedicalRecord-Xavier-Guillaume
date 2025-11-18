import {Address} from './address';


export interface Account {
  ssn: number;
  lastName: string;
  firstName: string;
  birthDate: Date;
  address: Address;
  sex: string;
  phone: number;
  email: string;
  password: string;
}
