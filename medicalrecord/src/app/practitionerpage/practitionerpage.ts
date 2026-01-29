import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Practitioner } from '../models/practitioner';
import {PractitionerService} from '../services/practitioners';

@Component({
  selector: 'app-practitioner-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practitionerpage.html',
  styleUrls: ['./practitionerpage.scss']
})
export class PractitionerPage implements OnInit {

  public current!: Practitioner;
  public loading: boolean = true;
  public error: string = '';
  private practitionerId: string = '';

  constructor(
    private router: Router,
    private practitionerService: PractitionerService
  ) {}

  public ngOnInit(): void {
    this.practitionerId = localStorage.getItem('userId') || '';
    console.log("ID du praticien récupéré :", this.practitionerId);

    if (!this.practitionerId) {
      this.error = "Aucun praticien trouvé (ID manquant)";
      this.loading = false;
      return;
    }

    this.loadPractitionerById(this.practitionerId);
  }

  private loadPractitionerById(id: string): void {
    this.loading = true;

    this.practitionerService.getById(id).subscribe({
      next: (data) => {
        console.log("Praticien chargé :", data);
        this.current = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur :", err);
        this.error = "Impossible de charger le praticien";
        this.loading = false;
      }
    });
  }

  public goBack(): void {
    this.router.navigate(['/practitioners']); // adapte selon ta route
  }

  public editPractitioner(): void {
    if (this.current ) {
      this.router.navigate(['/accountpractitioner/', this.current._id]);
    }
  }

  public deletePractitioner(): void {
    if (!this.current?._id) return;

    const ok = confirm("Voulez-vous vraiment supprimer ce praticien ?");
    if (!ok) return;

    this.practitionerService.delete(this.current._id).subscribe({
      next: () => {
        this.clearSession();
        this.router.navigate(['/home']).then(() => {
          alert("Praticien supprimé avec succès");
          window.location.reload();
        });
      },
      error: (err: unknown) => {
        console.error(err);
        alert("Erreur lors de la suppression du praticien");
      }
    });
  }

  private clearSession(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('userFirstname');
    localStorage.removeItem('userLastname');
  }
}
