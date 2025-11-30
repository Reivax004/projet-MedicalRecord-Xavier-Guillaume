import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FollowupRecord } from '../models/followuprecord';

@Injectable({
  providedIn: 'root',
})
export class Followuprecord {

  private apiUrl = 'http://localhost:3000/api/followuprecord';

  constructor(private http: HttpClient) {}

  // GET ALL
  getAll(): Observable<FollowupRecord[]> {
    return this.http.get<FollowupRecord[]>(this.apiUrl);
  }

  // GET ONE BY ID
  getById(id: string): Observable<FollowupRecord> {
    return this.http.get<FollowupRecord>(`${this.apiUrl}/${id}`);
  }

  // GET ALL BY PATIENT ID
  getByPatientId(patientId: string): Observable<FollowupRecord[]> {
    const url = `${this.apiUrl}/patient/${patientId}`;
    console.log('🚀 Appel API:', url);
    console.log(patientId);
    return this.http.get<FollowupRecord[]>(url);
  }

  // CREATE
  create(record: {
    //patientId?: string;
    pathology: any;
    start_date: any;
    end_date: any;
    status: any;
    prescriptions: any[];
    medical_document: any[]
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, record);
  }

  // UPDATE
  update(id: string, record: {
    pathology: any;
    start_date: any;
    end_date: any;
    status: any;
    prescriptions: any[];
    medical_document: any[]
  }): Observable<FollowupRecord> {
    return this.http.put<FollowupRecord>(`${this.apiUrl}/${id}`, record);
    //                                   ↑ Parenthèse, pas backtick seul
  }

  // DELETE
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
    //                      ↑ Parenthèse, pas backtick seul
  }
}
