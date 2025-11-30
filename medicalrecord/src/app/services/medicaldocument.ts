import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MedicalDocument} from '../models/medicaldocument';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Medicaldocument {

  private apiUrl = 'http://localhost:3000/api/medicaldocuments'; // adapte l'URL

  constructor(private http: HttpClient) {}

  /** 🔹 GET DOCUMENTS BY FOLLOWUP ID */
  getByFollowupId(followupId: string | undefined): Observable<MedicalDocument[]> {
    return this.http.get<MedicalDocument[]>(`${this.apiUrl}/followup/${followupId}`);
  }

  /** 🔹 CREATE ONE DOCUMENT */
  create(document: MedicalDocument): Observable<MedicalDocument> {
    return this.http.post<MedicalDocument>(`${this.apiUrl}/create`, document);
  }

  /** 🔹 CREATE MULTIPLE DOCUMENTS */
  createmultiple(documents: MedicalDocument[]): Observable<MedicalDocument[]> {
    return this.http.post<MedicalDocument[]>(`${this.apiUrl}/create-multiple`, documents);
  }

  /** 🔹 GET ALL DOCUMENTS */
  getAll(): Observable<MedicalDocument[]> {
    return this.http.get<MedicalDocument[]>(`${this.apiUrl}`);
  }

  /** 🔹 GET DOCUMENT BY ID */
  getById(id: string): Observable<MedicalDocument> {
    return this.http.get<MedicalDocument>(`${this.apiUrl}/${id}`);
  }

  /** 🔹 UPDATE DOCUMENT */
  update(id: string, document: MedicalDocument): Observable<MedicalDocument> {
    return this.http.put<MedicalDocument>(`${this.apiUrl}/${id}`, document);
  }

  /** 🔹 DELETE DOCUMENT */
  delete(id: string | undefined): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
