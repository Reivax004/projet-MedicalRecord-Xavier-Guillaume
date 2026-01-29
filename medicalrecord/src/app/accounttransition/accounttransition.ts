import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-transition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounttransition.html',
  styleUrls: ['./accounttransition.scss']
})
export class AccountTransition {

  constructor(private router: Router) {}

  public goToPatientAccount(): void {
    this.router.navigate(['/register']);
  }

  public goToPractitionerAccount(): void {
    this.router.navigate(['/accountpractitioner']);
  }
}
