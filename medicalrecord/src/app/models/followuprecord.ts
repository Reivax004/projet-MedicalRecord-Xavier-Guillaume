import {Prescription} from './prescription';

export interface FollowupRecord {
  _id?: string;
  patientId: number;
  pathology: String;
  start_date: Date;
  end_date: Date | null;
  prescriptions: Prescription[];
  status: string;
}
