import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MedicalDocument} from '../models/medicaldocument';
import {Observable} from 'rxjs';
import {medical_documents_group} from '../models/medical_documents_group';

@Injectable({
  providedIn: 'root',
})
export class Medicaldocument {

  private apiUrl = 'http://localhost:3000/api/medicaldocuments'; // adapte l'URL

  constructor(private http: HttpClient) {}

  getByFollowupId(followupId: string | undefined): Observable<MedicalDocument[]> {
    return this.http.get<MedicalDocument[]>(`${this.apiUrl}/followup/${followupId}`);
  }

  getByFollowupTypeId(followupId: string | undefined): Observable<medical_documents_group[]> {
    return this.http.get<medical_documents_group[]>(`${this.apiUrl}/followup/type/${followupId}`);
  }

  create(document: MedicalDocument): Observable<MedicalDocument> {
    return this.http.post<MedicalDocument>(`${this.apiUrl}/create`, document);
  }

  update(id: string, document: MedicalDocument): Observable<MedicalDocument> {
    return this.http.put<MedicalDocument>(`${this.apiUrl}/${id}`, document);
  }

  delete(id: string | undefined): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
