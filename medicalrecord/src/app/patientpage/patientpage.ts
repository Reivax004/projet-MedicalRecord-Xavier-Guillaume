import { Account } from '../models/account';
import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Practitioner} from '../models/practitioner';
import {Vaccine} from '../models/vaccine';
import {Establishment} from '../models/establishment';

@Component({
  selector: 'app-patientpage',
  templateUrl: './patientpage.html',
  imports: [
    DatePipe
  ],
  styleUrls: ['./patientpage.scss']
})
export class Patientpage implements OnInit {
  @Input() account: Account | null = null;

  demoAccount: Account = {
    ssn: 123456789,
    lastName: 'Dupont',
    firstName: 'Marie',
    birthDate: new Date('1990-04-12'),
    address: {
      number: 12,
      street: 'rue de la Santé',
      city: 'Paris',
      postalCode: '75005',
      country: 'France'
    },
    sex: 'F',
    phone: 33612345678,
    email: 'marie.dupont@example.com',
    password: '********',
    general_file: {
      weight: 12,
      height: 123,
      blood_pressure: '1',
      blood_group: 'A',
      vaccine: [{
        name: "d",
        injection_date: new Date(),
        vaccination_type: "",
        vaccinator_name: "",
      }],
      allergies:[]
    }
  };

  get current(): Account {
    return this.account ?? this.demoAccount;
  }

  constructor() {}

  ngOnInit(): void {}

  onEdit(): void {
    console.log('Edit patient', this.current);
    alert('Édition (exemple) — implémente la navigation vers le formulaire.');
  }

  protected readonly history = history;
}
/*general_practitioner: {
        lastname: "",
        firstname: "",
        specialization: "",
        phone: "",
        establishment: {
          name: "",
          address: {
            number: 1,
            street: "",
            city: "",
            postalCode: "",
            country: "",
          },
          type: "",
          description: "",
          phone: 12345,
          email: "",
          creation_date: new Date(),
          number_employees: 1
        },
        email: "",
        password: ""
      },*/
