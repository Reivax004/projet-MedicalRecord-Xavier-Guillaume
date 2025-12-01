import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PatientService } from '../services/patient';
import { Account } from '../models/account';

@Component({
  selector: 'app-patient-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patientpage.html',
  styleUrls: ['./patientpage.scss']
})
export class PatientPage implements OnInit {

  current!: Account;
  loading: boolean = true;
  error: string | null = null;
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {

    // ⬅️ On récupère l’ID MongoDB dans l'URL
    this.userId = localStorage.getItem('userId') || '';

    if (!this.userId) {
      this.error = "Identifiant patient invalide.";
      this.loading = false;
      return;
    }

    // ⬅️ On charge le patient via son ID MongoDB
    this.patientService.getPatient(this.userId).subscribe({
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

  onEdit() {
    if (!this.current || !this.current._id) return;
    this.router.navigate(['/register/', this.current._id]);
  }

  onDelete() {

    if (!this.current || !this.current._id) return;

    const confirmDelete = confirm(
      `Es-tu sûr de vouloir supprimer le patient ${this.current.firstname} ${this.current.lastname} ?`
    );

    if (!confirmDelete) return;

    this.patientService.deletePatient(this.current._id).subscribe({
      next: () => {
        alert('Patient supprimé avec succès.');
        this.router.navigate(['/patientlist']); // ➡️ Change vers ta vraie page de liste
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de la suppression du patient.");
      }
    });
  }

  protected readonly history = history;
}
