import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Practitioner} from '../models/practitioner';


@Component({
  selector: 'app-practitioner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './accountpractitioner.html',
  styleUrls: ['./accountpractitioner.scss']
})
export class AccountPractitioner {
  practitionerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.practitionerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      specialisation: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],

      establishment: this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        description: [''],
        phone: [''],
        email: ['', Validators.email]
      }),

      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.required],
        country: ['', Validators.required]
      })
    });
  }

  onSubmit() {
    if (this.practitionerForm.valid) {
      const practitioner: Practitioner = this.practitionerForm.value;
      console.log('Practitioner saved:', practitioner);
      alert('Practitioner account created!');
    } else {
      alert('Please fill all required fields.');
    }
  }
}
