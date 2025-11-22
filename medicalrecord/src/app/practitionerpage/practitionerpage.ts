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
    nom: 'Dr',
    prenom: 'House',
    specialisation: 'Cardiologie',
    telephone: '019283746',
    etablissement:{
      adress: {
        street: '12 rue de la Santé',
        city: 'Paris',
        postalCode: '75005',
        country: 'France'
      },
      type: 'santé',
      description: 'santé',
      telephone: '1234',
      email: 'sddfv@df',
      date_creation: new Date(),
      effectifs: 12
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
