import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Practitioner } from '../models/practitioner';

@Injectable({
  providedIn: 'root'
})
export class PractitionerService {

  private apiUrl = 'http://localhost:3000/api/practitioners';

  constructor(private http: HttpClient) {}

  getOne(id: string) {
    return this.http.get<Practitioner>(`${this.apiUrl}/${id}`);
  }

  create(data: Practitioner) {
    return this.http.post(this.apiUrl, data);
  }

  update(id: string, data: Practitioner) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
