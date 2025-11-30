import {Practitioner} from './practitioner';

export interface MedicalDocument {
  _id: string;
  follow_up_file_Id: string;
  //practitioner: Practitioner;
  type: string;
  date: Date;
  description: string;
}
