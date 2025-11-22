import { Account } from '../models/account';
import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';

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
      street: '12 rue de la Santé',
      city: 'Paris',
      postalCode: '75005',
      country: 'France'
    },
    sex: 'F',
    phone: 33612345678,
    email: 'marie.dupont@example.com',
    password: '********'
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
