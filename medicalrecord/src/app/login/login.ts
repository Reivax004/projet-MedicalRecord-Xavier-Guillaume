import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  credentials = {
    email: '',
    password: ''
  };

  isLoggedIn = false;
  userId: string | null = null;
  userType: string | null = null;
  firstname: string | null = null;
  lastname: string | null = null;

  error = '';
  isSubmitting = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.userType = localStorage.getItem('userType');
    this.firstname = localStorage.getItem('userFirstname');
    this.lastname = localStorage.getItem('userLastname');

    this.isLoggedIn = !!this.userId;
  }

  submit(): void {
    this.error = '';
    this.isSubmitting = true;

    this.http.post<any>('http://localhost:3000/api/login', this.credentials)
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;

          localStorage.setItem('userId', res.id);
          localStorage.setItem('userType', res.type);
          localStorage.setItem('userFirstname', res.firstname);
          localStorage.setItem('userLastname', res.lastname);

          this.userId = res.id;
          this.userType = res.type;
          this.firstname = res.firstname;
          this.lastname = res.lastname;
          this.isLoggedIn = true;

          // redirection si tu veux, ou tu restes sur la page login
          // this.router.navigate(['/']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.error = err.error?.message || 'Erreur lors de la connexion';
        }
      });
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('userFirstname');
    localStorage.removeItem('userLastname');

    this.userId = null;
    this.userType = null;
    this.firstname = null;
    this.lastname = null;
    this.isLoggedIn = false;
  }
}
