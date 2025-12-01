import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PractitionerService, Practitioner } from '../services/practitioner';

@Component({
  selector: 'app-practitioner-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './practitionerpage.html',
  styleUrls: ['./practitionerpage.scss']
})
export class PractitionerPage implements OnInit {

  practitioners: Practitioner[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private practitionerService: PractitionerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPractitioners();
  }

  loadPractitioners(): void {
    this.loading = true;
    this.error = null;

    this.practitionerService.getAllPractitioners().subscribe({
      next: (data) => {
        this.practitioners = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Impossible de charger la liste des praticiens.';
        this.loading = false;
      }
    });
  }

  viewPractitioner(pract: Practitioner): void {
    // vers la page de détail/compte praticien si tu en as une
    this.router.navigate(['/practitioner', pract._id]);
  }
}
