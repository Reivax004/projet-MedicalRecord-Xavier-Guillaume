import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Appointment} from '../models/appointment';
import {AppointmentService} from '../services/appointments';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-medical-appointment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.html',
  styleUrls: ['./appointments.scss']
})
export class Appointments {

  appointments: Appointment[] = [
  ];
  userId: String = "";

  constructor(private appointmentService: AppointmentService, private http: HttpClient) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    console.log("User ID:", this.userId);
    this.appointmentService.getById(this.userId)
    .subscribe((data: any) => {
      this.appointments = data;
    });  
  }
}
