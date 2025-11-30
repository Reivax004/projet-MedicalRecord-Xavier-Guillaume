/*
import { Account } from '../models/account';
import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Address} from '../models/address';
import {Practitioner} from '../models/practitioner';

@Component({
  selector: 'app-patientpage',
  templateUrl: './practitionerpage.html',
  imports: [
    DatePipe
  ],
  styleUrls: ['./practitionerpage.scss']
})
export class Practitionerpage implements OnInit {
  @Input() practitioner: Practitioner | null = null;

  // @ts-ignore
  demoAccount: Practitioner = {
    lastname: 'Dr',
    firstname: 'House',
    specialization: 'Cardiologie',
    phone: '019283746',
    establishment:{
      name: "santé",
      address: {
        number: 12,
        street: 'rue de la Santé',
        city: 'Paris',
        postal_code: '75005',
        country: 'France'
      },
      type: 'santé',
      description: 'santé',
      phone: 1234,
      email: 'sddfv@df',
      creation_date: new Date(),
      number_employees: 12,
    }

  };

  get current(): Practitioner {
    return this.practitioner ?? this.demoAccount;
  }

  constructor() {}

  ngOnInit(): void {}

  onEdit(): void {
    console.log('Edit patient', this.current);
    alert('Édition (exemple) — implémente la navigation vers le formulaire.');
  }

  protected readonly history = history;
}
*/
