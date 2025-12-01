import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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

  current!: Practitioner;
  loading: boolean = true;
  error: string = '';
  practitionerId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private practitionerService: PractitionerService
  ) {}

  ngOnInit(): void {
    this.practitionerId = String(this.route.snapshot.paramMap.get('id'));
    console.log("ID du praticien récupéré :", this.practitionerId);

    if (!this.practitionerId) {
      this.error = "Aucun praticien trouvé (ID manquant)";
      this.loading = false;
      return;
    }

    this.loadPractitionerById(this.practitionerId);
  }

  loadPractitionerById(id: string): void {
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

  goBack(): void {
    this.router.navigate(['/practitioners']); // adapte selon ta route
  }

  editPractitioner(): void {
    if (this.current ) {
      this.router.navigate(['/accountpractitioner/', this.current._id]);
    }
  }

  deletePractitioner(): void {
    if (!this.current || !this.current._id) return;

    if (confirm("Voulez-vous vraiment supprimer ce praticien ?")) {
      this.practitionerService.delete(this.current._id).subscribe({
        next: () => {
          alert("Praticien supprimé avec succès");
          this.router.navigate(['/practitioners']);
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la suppression du praticien");
        }
      });
    }
  }
}
