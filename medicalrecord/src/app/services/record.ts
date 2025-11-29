import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalRecord } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  private apiUrl = 'http://localhost:3000/api/medical-records';

  constructor(private http: HttpClient) {}

  // GET ALL
  getAll(): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(this.apiUrl);
  }

  // GET ONE
  getById(id: string): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(`${this.apiUrl}/${id}`);
  }

  // CREATE
  create(record: MedicalRecord): Observable<MedicalRecord> {
    return this.http.post<MedicalRecord>(this.apiUrl, record);
  }

  // UPDATE
  update(id: string, record: MedicalRecord): Observable<MedicalRecord> {
    return this.http.put<MedicalRecord>(`${this.apiUrl}/${id}`, record);
  }

  // DELETE
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
