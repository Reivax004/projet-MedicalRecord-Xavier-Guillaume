import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:3000/api/patient';

  constructor(private http: HttpClient) {}

  getPatients(id: string): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/practitioners/${id}`);
  }

  getPatient(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/${id}`);
  }

  createPatient(patient: Partial<Account>): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, patient);
  }

  updatePatient(id: string, patient: Partial<Account>): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}/${id}`, patient);
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
