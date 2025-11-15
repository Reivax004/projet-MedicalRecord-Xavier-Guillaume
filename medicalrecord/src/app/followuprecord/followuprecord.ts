import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormControl} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dossier-suivi',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './followuprecord.html',
  styleUrls: ['./followuprecord.scss']
})
export class FollowupRecord {

  dossierForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dossierForm = this.fb.group({
      id: ['', Validators.required],
      pathologie: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: [''],
      etat: ['', Validators.required],
      prescriptions: this.fb.array<FormGroup>([]),
      documents_medicaux: this.fb.array<FormGroup>([])

    });
  }

  // GETTERS
  get prescriptions(): FormArray {
    return this.dossierForm.get('prescriptions') as FormArray;
  }

  get documentsMedicaux(): FormArray {
    return this.dossierForm.get('documents_medicaux') as FormArray;
  }

  // --- PRESCRIPTIONS ---
  addPrescription() {
    const group = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required]
    });
    this.prescriptions.push(group);
  }

  removePrescription(index: number) {
    this.prescriptions.removeAt(index);
  }

  // --- DOCUMENTS MÉDICAUX ---
  addMedicalDoc() {
    const group = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required]
    });
    this.documentsMedicaux.push(group);
  }

  removeMedicalDoc(index: number) {
    this.documentsMedicaux.removeAt(index);
  }

  // --- SUBMIT ---
  onSubmit() {
    if (this.dossierForm.valid) {
      const dossier: FollowupRecord = this.dossierForm.value;
      console.log("Dossier enregistré :", dossier);
      alert("Dossier de suivi enregistré !");
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
  }
}
