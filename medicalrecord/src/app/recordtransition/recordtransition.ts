import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transition-record',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recordtransition.html',
  styleUrls: ['./recordtransition.scss']
})
export class RecordTransition {
  constructor(private router: Router) {}

  goToFollowup() {
    this.router.navigate(['/followuprecord']);
  }

  goToMedical() {
    this.router.navigate(['/record']);
  }
}
