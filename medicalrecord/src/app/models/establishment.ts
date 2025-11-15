import {Address} from './address';

export interface Establishment {
  adresse: Address;
  type: string;          // ex: "Hôpital", "Clinique", "Cabinet"
  description?: string;  // optionnel
  telephone: string;
  email: string;
  date_creation: Date;
  effectifs: number;
}
