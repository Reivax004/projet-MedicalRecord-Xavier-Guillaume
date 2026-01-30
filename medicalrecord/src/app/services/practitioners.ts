import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Practitioner } from '../models/practitioner';

@Injectable({
  providedIn: 'root'
})
export class PractitionerService {

  private baseUrl = 'http://localhost:3000/api/practitioners';

  constructor(private http: HttpClient) {}

  getPractitioners(): Observable<Practitioner[]> {
    return this.http.get<Practitioner[]>(this.baseUrl);
  }

  getById(id: string): Observable<Practitioner> {
    return this.http.get<Practitioner>(`${this.baseUrl}/${id}`);
  }

  create(practitioner: Partial<Practitioner>): Observable<Practitioner> {
    return this.http.post<Practitioner>(this.baseUrl, practitioner);
  }

  update(id: string, practitioner: Partial<Practitioner>): Observable<Practitioner> {
    return this.http.put<Practitioner>(`${this.baseUrl}/${id}`, practitioner);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
