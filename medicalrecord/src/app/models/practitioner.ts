import {Address} from './address';
import {Establishment} from './establishment';

export interface Practitioner {
  nom: string;
  prenom: string;
  specialisation: string;
  telephone: string;
  etablissement: Establishment;
}
