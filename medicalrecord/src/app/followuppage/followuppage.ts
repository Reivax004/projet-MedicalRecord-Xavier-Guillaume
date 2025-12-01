import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowupRecord } from '../models/followuprecord';
import { Followuprecord } from '../services/followuprecord';
import {Medicaldocument} from '../services/medicaldocument';
import {MedicalDocument} from '../models/medicaldocument';
import {catchError, forkJoin, of} from 'rxjs';

@Component({
  selector: 'app-record-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './followuppage.html',
  styleUrls: ['./followuppage.scss']
})
export class Followuppage implements OnInit {

  followupsInProgress: FollowupRecord[] = [];
  followupsOther: FollowupRecord[] = [];
  loading: boolean = true;
  error: string = '';
  patientId: string = ''; // ← Initialisé au lieu de !
  followupId: string = '';
  medicalDocuments: MedicalDocument[] = [];
  userType: string | null = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private followuprecordService: Followuprecord,
    private medicalDocumentService: Medicaldocument
  ) {}

  ngOnInit(): void {
    // Récupération de l'utilisateur connecté
   
    this.userType = localStorage.getItem('userType');
    if(this.userType === 'practitioner'){
      this.patientId = this.route.snapshot.paramMap.get('id') || '';
    }
    else{
      this.patientId = localStorage.getItem('userId') || '';
    }

    if (!this.patientId) {
      this.error = "Aucun utilisateur connecté (ID manquant)";
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
        console.log("Dossiers de suivi chargés :", data);     

        this.followupsInProgress = data.inProgress || [];
        this.followupsOther = data.others || [];
        console.log("Dossiers en cours :", this.followupsInProgress);
        console.log("Autres dossiers :", this.followupsOther);
        // Si pas de followups → on arrête
        if (
          this.followupsInProgress.length === 0 &&
          this.followupsOther.length === 0
        ) {
          this.loading = false;
          return;
        }
        // On prépare toutes les requêtes
        const requestsInProgress = this.followupsInProgress.map(follow =>
          this.medicalDocumentService.getByFollowupId(follow._id).pipe(
            catchError(() => of([]))
          )
        );

        const requestsOther = this.followupsOther.map(follow =>
          this.medicalDocumentService.getByFollowupId(follow._id).pipe(
            catchError(() => of([]))
          )
        );

        forkJoin(requestsInProgress).subscribe((docs) => {
          docs.forEach((docList, i) => {
            this.followupsInProgress[i].medical_document = docList;
          });
          this.loading = false
        });

        forkJoin(requestsOther).subscribe((docs) => {
          docs.forEach((docList, i) => {
            this.followupsOther[i].medical_document = docList;
          });
          this.loading = false;
        });
      },

      error: (err) => {
        console.error("Erreur complète :", err);
        this.error = "Impossible de charger les dossiers de suivi";
        this.loading = false;
      }
    });
  }

  goBack(): void {
    history.back(); // Adaptez selon votre route
  }

  createNewFollowup(): void {
    this.router.navigate(['/followuprecord']);
  }

  deleteFollowup(followupId: string, event: Event): void {
    console.log('deleteFollowup', followupId);
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

  editFollowup(followupId: string, event: Event): void {
    event.stopPropagation();
    console.log(followupId);
    this.router.navigate(['/followuprecord/', followupId, ]);
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
