/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../services/patient'
@Component({
  selector: 'app-testmongo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './testmongo.html'
})
export class Testmongo implements OnInit {

  patients: any[] = [];
  patientForm!: FormGroup;
  editingId: string | null = null; // null = mode création, sinon = mode édition

  constructor(
    private patientService: PatientService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    // Formulaire réactif
    this.patientForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname:  ['', Validators.required],
      email:     ['', [Validators.email]]
    });

    // Chargement initial
    this.patients = await this.patientService.getPatients();
  }

  async onSubmit() {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    const formValue = this.patientForm.value;

    if (this.editingId) {
      const updated = await this.patientService.updatePatient(this.editingId, formValue);
      const index = this.patients.findIndex(p => p._id === this.editingId);
      if (index !== -1) {
        this.patients[index] = updated;
      }
      this.editingId = null;
    } else {
      const created = await this.patientService.addPatient(formValue);
      this.patients.push(created);
    }

    this.patientForm.reset();
  }

  editPatient(patient: any) {
    this.editingId = patient._id;
    this.patientForm.patchValue({
      firstname: patient.firstname,
      lastname: patient.lastname,
      email: patient.email
    });
  }

  async deletePatient(patient: any) {
    await this.patientService.deletePatient(patient._id);
    this.patients = this.patients.filter(p => p._id !== patient._id);

    if (this.editingId === patient._id) {
      this.editingId = null;
      this.patientForm.reset();
    }
  }

  cancelEdit() {
    this.editingId = null;
    this.patientForm.reset();
  }
}
*/
