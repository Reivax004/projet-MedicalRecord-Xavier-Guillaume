import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Account } from '../models/account';
import { MedicalRecord } from '../models/record';
import { PatientService } from '../services/patient';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerForm: FormGroup;
  serverError: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private patientService: PatientService
  ) {
    this.registerForm = this.fb.group({
      ssn: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],

      number: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    this.serverError = null;
    this.success = false;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const v = this.registerForm.value;

    // Si tu veux typer proprement avec Account / MedicalRecord côté front :
    const medicalRecord: MedicalRecord = {
      // À compléter éventuellement selon ton modèle front
      // ex: weight: 0, height: 0, blood_group: '', blood_pressure: '', vaccines: [], allergies: []
    } as any;

    const account: Account = {
      SSN: v.ssn,
      firstname: v.firstName,
      lastname: v.lastName,
      birthdate: v.birthDate,
      address: {
        number: v.number,
        street: v.street,
        city: v.city,
        postal_code: v.postalCode,
        country: v.country
      },
      email: v.email,
      password: v.password,
      general_file: medicalRecord
    } as any;

    try {
      // Payload aligné sur ton backend Patient
      await this.patientService.registerPatient({
        SSN: account.ssn,
        firstname: account.firstName,
        lastname: account.lastName,
        birthdate: account.birthDate,
        address: account.address,
        email: account.email,
        password: account.password
      });

      this.success = true;
      await this.router.navigate(['/patientpage']);
    } catch (err: any) {
      console.error(err);
      this.serverError = 'Erreur lors de la création du compte.';
    }
  }
}
