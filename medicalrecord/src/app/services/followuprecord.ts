import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FollowupRecord } from '../models/followuprecord';
import {Prescription} from '../models/prescription';
import {MedicalDocument} from '../models/medicaldocument';

@Injectable({
  providedIn: 'root',
})
export class FollowuprecordService {

  private apiUrl = 'http://localhost:3000/api/followuprecord';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FollowupRecord[]> {
    return this.http.get<FollowupRecord[]>(this.apiUrl);
  }

  getById(id: string): Observable<FollowupRecord> {
    return this.http.get<FollowupRecord>(`${this.apiUrl}/form/${id}`);
  }

  getByPatientId(patientId: string): Observable<{
    inProgress: FollowupRecord[],
    others: FollowupRecord[]
  }> {
    const url = `${this.apiUrl}/${patientId}`
    return this.http.get<{ inProgress: FollowupRecord[], others: FollowupRecord[] }>(url);
  }

  create(FollowupRecord: {
    patientId?: string;
    pathology: string;
    start_date: Date;
    end_date: Date | null;
    status: string;
    prescriptions: Prescription[];
    medical_document: MedicalDocument[]
  }): Observable<FollowupRecord> {
    return this.http.post<any>(this.apiUrl, FollowupRecord);
  }

  update(id: string, followuprecord: {
    pathology: string;
    start_date: Date;
    end_date: Date | null;
    status: string;
    prescriptions: Prescription[];
    medical_document: MedicalDocument[]
  }): Observable<FollowupRecord> {
    return this.http.put<FollowupRecord>(`${this.apiUrl}/${id}`, followuprecord);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
