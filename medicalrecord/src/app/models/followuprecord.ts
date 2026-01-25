import {Prescription} from './prescription';
import {MedicalDocument} from './medicaldocument';

export interface FollowupRecord {
  _id: string;
  patientId: string;
  pathology: string;
  start_date: Date;
  end_date: Date | null;
  prescriptions: Prescription[];
  status: string;
  medical_document: MedicalDocument[];
  documentsByType?: { [key: string]: MedicalDocument[] };
}
