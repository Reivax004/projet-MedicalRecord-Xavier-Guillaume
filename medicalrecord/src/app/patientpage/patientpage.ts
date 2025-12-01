import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PatientService } from '../services/patient';
import { Account } from '../models/account';
import { PractitionerService } from '../services/practitioner';

@Component({
  selector: 'app-patient-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patientpage.html',
  styleUrls: ['./patientpage.scss']
})
export class PatientPage implements OnInit {

  current!: Account;
  loading = true;
  error: string | null = null;

  userType: string | null = null; // 'patient' ou 'practitioner'

  constructor(
    private router: Router,
    private patientService: PatientService,
    private practitionerService: PractitionerService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    this.userType = localStorage.getItem('userType');

    if (!id || !this.userType) {
      this.error = "Vous devez être connecté pour accéder à cette page.";
      this.loading = false;
      return;
    }

    if (this.userType === 'patient') {
      this.loadPatient(id);
    } else if (this.userType === 'practitioner') {
      this.loadPractitioner(id);
    } else {
      this.error = "Type de compte inconnu.";
      this.loading = false;
    }
  }

  private loadPatient(id: string): void {
    this.patientService.getPatient(id).subscribe({
      next: (patient: Account) => {
        this.current = patient;
        this.loading = false;
      },
      error: () => {
        this.error = "Patient introuvable ou erreur serveur.";
        this.loading = false;
      }
    });
  }

  private loadPractitioner(id: string): void {
    this.practitionerService.getPractitioner(id).subscribe({
      next: (pract: Account) => {
        this.current = pract;
        this.loading = false;
      },
      error: () => {
        this.error = "Praticien introuvable ou erreur serveur.";
        this.loading = false;
      }
    });
  }

  onEdit() {
    if (!this.current || !this.current._id) return;

    if (this.userType === 'patient') {
      this.router.navigate(['/register', this.current._id]); // page édition patient
    } else if (this.userType === 'practitioner') {
      this.router.navigate(['/practitionerregister', this.current._id]); // adapte à ta route praticien
    }
  }

  onDelete() {
    if (!this.current || !this.current._id) return;

    const label =
      this.userType === 'practitioner' ? 'praticien' : 'patient';

    const confirmDelete = confirm(
      `Es-tu sûr de vouloir supprimer le ${label} ${this.current.firstname} ${this.current.lastname} ?`
    );

    if (!confirmDelete) return;

    if (this.userType === 'patient') {
      this.patientService.deletePatient(this.current._id).subscribe({
        next: () => {
          alert('Patient supprimé avec succès.');
          this.afterDelete();
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la suppression du patient.");
        }
      });
    } else if (this.userType === 'practitioner') {
      this.practitionerService.deletePractitioner(this.current._id).subscribe({
        next: () => {
          alert('Praticien supprimé avec succès.');
          this.afterDelete();
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la suppression du praticien.");
        }
      });
    }
  }

  private afterDelete(): void {
    // on peut aussi vider le localStorage car le compte n'existe plus
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('userFirstname');
    localStorage.removeItem('userLastname');

    this.router.navigate(['/']); // ou une page d’accueil
  }

  protected readonly history = history;
}
