import {Address} from './address';

export interface Practitioner {
  nom: string;
  prenom: string;
  specialisation: string;
  telephone: string;
  etablissement: Document;
  adresse: Address;
}
