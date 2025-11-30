import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MedicalDocument} from '../models/medicaldocument';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Medicaldocument {

  private baseUrl = 'http://localhost:3000/api/medicaldocuments'; // adapte l'URL

  constructor(private http: HttpClient) {}

  /** 🔹 CREATE ONE DOCUMENT */
  create(document: MedicalDocument): Observable<MedicalDocument> {
    return this.http.post<MedicalDocument>(`${this.baseUrl}/create`, document);
  }

  /** 🔹 CREATE MULTIPLE DOCUMENTS */
  createmultiple(documents: MedicalDocument[]): Observable<MedicalDocument[]> {
    return this.http.post<MedicalDocument[]>(`${this.baseUrl}/create-multiple`, documents);
  }

  /** 🔹 GET ALL DOCUMENTS */
  getAll(): Observable<MedicalDocument[]> {
    return this.http.get<MedicalDocument[]>(`${this.baseUrl}`);
  }

  /** 🔹 GET DOCUMENT BY ID */
  getById(id: string): Observable<MedicalDocument> {
    return this.http.get<MedicalDocument>(`${this.baseUrl}/${id}`);
  }

  /** 🔹 GET DOCUMENTS BY FOLLOWUP ID */
  getByFollowupId(followupId: string | undefined): Observable<MedicalDocument[]> {
    return this.http.get<MedicalDocument[]>(`${this.baseUrl}/followup/${followupId}`);
  }

  /** 🔹 UPDATE DOCUMENT */
  update(id: string, document: MedicalDocument): Observable<MedicalDocument> {
    return this.http.put<MedicalDocument>(`${this.baseUrl}/${id}`, document);
  }

  /** 🔹 DELETE DOCUMENT */
  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
