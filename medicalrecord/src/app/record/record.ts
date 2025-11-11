import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicalRecord } from '../models/record';

@Component({
  selector: 'app-medical-record',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './record.html',
  styleUrls: ['./record.scss']
})
export class Record implements OnInit {
  medicalForm!: FormGroup;
  showForm = signal(true); // signal pour le futur, ici toujours vrai

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.medicalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      sex: ['', Validators.required],
      weight: [''],
      height: [''],
      bloodType: ['', Validators.required],
      allergies: [''],
      chronicDiseases: [''],
      currentMedications: [''],
      pastSurgeries: [''],
      emergencyContact: ['', Validators.required]
    });
  }
}
