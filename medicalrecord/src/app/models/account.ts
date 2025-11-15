import {Address} from './address';

export type Role = 'Patient' | 'Médecin' | 'Secrétaire';

export interface Account {
  role: Role;
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
