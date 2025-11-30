import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Appointment} from '../models/appointment';
import {AppointmentService} from '../services/appointments';


@Component({
  selector: 'app-medical-appointment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.html',
  styleUrls: ['./appointments.scss']
})
export class Appointments {

  appointments: Appointment[] = [
    /*
    {
      patientId:1,
      practitionerId:1,
      name: 'Consultation Dr. Martin',
      date: new Date('2025-03-20'),
      type: 'Consultation générale',
      description: 'Première consultation pour vérifier la tension.'
    },
    {
      patientId:2,
      practitionerId:2,
      name: 'Radiographie',
      date: new Date('2025-04-02'),
      type: 'Imagerie médicale',
      description: 'Radiographie du genou gauche.'
    },
    {
      patientId:3,
      practitionerId:3,
      name: 'Vaccination',
      date: new Date('2025-04-10'),
      type: 'Vaccin',
      description: 'Injection du vaccin contre la grippe saisonnière.'
    }*/
  ];

  constructor(private appointmentService: AppointmentService) {}
  ngOnInit() {
    this.appointmentService.getById("65f4b001a1b2c30000000001")
      .subscribe((data: any) => {
        this.appointments = data;
      });
  }

}
