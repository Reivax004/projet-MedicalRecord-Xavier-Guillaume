import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowupRecord } from '../models/followuprecord';
import { Followuprecord } from '../services/followuprecord';
import {Medicaldocument} from '../services/medicaldocument';
import {MedicalDocument} from '../models/medicaldocument';

@Component({
  selector: 'app-record-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './followuppage.html',
  styleUrls: ['./followuppage.scss']
})
export class Followuppage implements OnInit {

  followups: FollowupRecord[] = [];
  loading: boolean = true;
  error: string = '';
  patientId: string = ''; // ← Initialisé au lieu de !
  followupId: string = '';
  medicalDocuments: MedicalDocument[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private followuprecordService: Followuprecord,
    private medicalDocumentService: Medicaldocument
  ) {}

  ngOnInit(): void {
    // Récupération du paramètre 'patientId' depuis l'URL
    this.followupId = this.route.snapshot.paramMap.get('id') || '';
    this.patientId = this.route.snapshot.paramMap.get('patientId') || '';

    console.log("ID du dossier récupéré :", this.followupId);
    console.log("ID du patient récupéré :", this.patientId);

    if (!this.patientId) {
      this.error = "Aucun patient trouvé (ID manquant)";
      this.loading = false;
      return;
    }

    this.loadFollowupsByPatientId(this.patientId);
  }

  loadFollowupsByPatientId(patientId: string): void {
    this.loading = true;
    this.error = '';

    this.followuprecordService.getByPatientId(patientId).subscribe({
      next: (data) => {
        this.followups = data;
        this.loading = false;

        // Charger les documents médicaux pour chaque followup
        for (let follow of this.followups) {
          this.medicalDocumentService.getByFollowupId(follow._id).subscribe({
            next: (docs: any[]) => {
              follow.medical_document = docs; // <- on injecte les documents dans le followup
            },
            error: (err) => {
              console.error("Erreur chargement docs :", err);
              follow.medical_document = [];
            }
          });
        }
      },
      error: (err) => {
        console.error("Erreur complète :", err);
        this.error = "Impossible de charger les dossiers de suivi";
        this.loading = false;
      }
    });
  }


  loadMedicalDocuments(followupId: string | undefined): void {
    this.medicalDocumentService.getByFollowupId(followupId).subscribe({
      next: (docs: any) => {
        console.log("Documents médicaux chargés :", docs);
        this.medicalDocuments = docs;
        this.loading = false;
      },
      error: (err: any) => {
        console.error("Erreur chargement documents médicaux :", err);
        this.medicalDocuments = [];
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/patients']); // Adaptez selon votre route
  }

  createNewFollowup(): void {
    this.router.navigate(['/followuprecord'], {
      queryParams: { patientId: this.patientId }
    });
  }

  deleteFollowup(followupId: string | undefined, event: Event): void {
    event.stopPropagation();
    if (confirm("Voulez-vous vraiment supprimer ce dossier ?")) {
      this.followuprecordService.delete(followupId).subscribe({
        next: () => {
          alert("Dossier supprimé");
          this.loadFollowupsByPatientId(this.patientId);
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la suppression du dossier");
        }
      });
    }
  }

  editFollowup(followupId: string | undefined, event: Event): void {
    event.stopPropagation();
    console.log(followupId);
    this.router.navigate(['/followuprecord/', followupId]);
  }

  formatDate(date: any): string {
    if (!date) return 'Non renseignée';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getStatusClass(status: string): string {
    switch(status?.toLowerCase()) {
      case 'actif': return 'status-active';
      case 'terminé': return 'status-completed';
      case 'en pause': return 'status-paused';
      default: return 'status-default';
    }
  }
}
