import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Account, Role } from '../models/account';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerForm: FormGroup;
  roles: Role[] = ['Patient', 'Médecin', 'Secrétaire'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const account: Account = this.registerForm.value;
      console.log(account); // Objet typé Account
      alert('Inscription réussie !');

      // Redirection selon rôle
      if (account.role === 'Patient') {
        this.router.navigate(['/medical-record']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
