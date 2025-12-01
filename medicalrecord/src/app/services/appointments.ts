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

  // GET ONE
  getById(patientId: String): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${patientId}`);
  }
}
