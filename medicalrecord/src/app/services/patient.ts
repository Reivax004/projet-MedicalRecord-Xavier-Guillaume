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

  // Récupérer tous les patients
  getPatients(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl);
  }

  // Récupérer un patient par id
  getPatient(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/${id}`);
  }

  // Créer un patient
  createPatient(patient: Partial<Account>): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, patient);
  }

  // Mettre à jour un patient
  updatePatient(id: string, patient: Partial<Account>): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}/${id}`, patient);
  }

  // Supprimer un patient
  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
