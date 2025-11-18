import {Address} from './address';

export interface Establishment {
  adresse: Address;
  type: string;
  description?: string;
  telephone: string;
  email: string;
  date_creation: Date;
  effectifs: number;
}
