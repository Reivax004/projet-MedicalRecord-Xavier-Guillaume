import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:3000/api/appointments';

  constructor(private http: HttpClient) {}

  getById(patientId: String, type: String): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${patientId}/${type}`);
  }

  getNumberPatientsForPractitioner(id: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/practitioners/numbers/${id}`);
  }
}
