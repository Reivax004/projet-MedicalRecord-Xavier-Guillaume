import {Practitioner} from './practitioner';

export interface Document {
  id: number;
  type: string;
  date: Date;
  description: string;
  praticien: Practitioner;
}
