import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Account} from '../models/account';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      ssn: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      sex: ['', Validators.required],
      phone: ['', Validators.required],

      // Adresse découpée
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {

      // Reconstruction de l'objet Account avec address
      const account: Account = {
        ssn: this.registerForm.value.ssn,
        lastName: this.registerForm.value.lastName,
        firstName: this.registerForm.value.firstName,
        birthDate: this.registerForm.value.birthDate,
        sex: this.registerForm.value.sex,
        phone: this.registerForm.value.phone,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        address: {
          street: this.registerForm.value.street,
          city: this.registerForm.value.city,
          postalCode: this.registerForm.value.postalCode,
          country: this.registerForm.value.country
        }
      };

      console.log(account);
      alert('Inscription réussie !');
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
