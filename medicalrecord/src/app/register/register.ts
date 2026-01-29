import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Account } from '../models/account';
import { MedicalRecord } from '../models/record';
import { PatientService } from '../services/patient';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register implements OnInit {

  public registerForm: FormGroup;
  public serverError: string | null = null;
  public isEdit: boolean = false;
  private idToEdit: string | null = null; // <-- ID MongoDB

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {
    this.registerForm = this.fb.group({
      SSN: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      sex: ['', Validators.required],
      phone: ['', Validators.required],
      number: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public ngOnInit(): void {

    // ⬅️ On récupère l'ID MongoDB dans l’URL
    this.idToEdit = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.idToEdit;

    if (this.isEdit && this.idToEdit) {
      this.patientService.getPatient(this.idToEdit).subscribe({
        next: (patient: Account) => this.loadForm(patient),
        error: (err) => console.error('Impossible de charger le patient', err)
      });
    }
  }

  private loadForm(patient: Account): void {
    this.registerForm.patchValue({
      SSN: patient.SSN,
      firstname: patient.firstname,
      lastname: patient.lastname,
      birthdate: patient.birthdate,
      sex: patient.sex,
      phone: patient.phone,
      number: patient.address.number,
      street: patient.address.street,
      city: patient.address.city,
      postal_code: patient.address.postal_code,
      country: patient.address.country,
      email: patient.email,
      password: patient.password
    });
  }

  public onSubmit(): void {
    console.log('Form submitted');
    this.serverError = null;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const v = this.registerForm.value;

    const account: Account = {
      SSN: v.SSN,
      firstname: v.firstname,
      lastname: v.lastname,
      birthdate: v.birthdate,
      sex: v.sex,
      phone: v.phone,
      address: {
        number: v.number,
        street: v.street,
        city: v.city,
        postal_code: v.postal_code,
        country: v.country
      },
      email: v.email,
      password: v.password,
      general_file: {} as MedicalRecord
    };

    if (this.isEdit && this.idToEdit) {
      // MODE EDIT
      this.patientService.updatePatient(this.idToEdit, account).subscribe({
        next: () => {
          alert('Patient mis à jour !');
          this.router.navigate(['/patient', this.idToEdit]);
        },
        error: (err) => {
          console.error(err);
          this.serverError = 'Erreur lors de la mise à jour';
        }
      });

    } else {
      // MODE CREATE
      this.patientService.createPatient(account).subscribe({
        next: (created: any) => {
          alert('Patient créé !');
          this.router.navigate(['/patientpage', created._id]); // ➜ Redirige vers la fiche du nouveau patient
        },
        error: (err) => {
          console.error(err);
          this.serverError = 'Erreur lors de la création';
        }
      });
    }
  }
}
