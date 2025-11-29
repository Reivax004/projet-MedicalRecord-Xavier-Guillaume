import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {FollowupRecord} from '../models/followuprecord';
import {Followuprecord} from '../services/followuprecord';

@Component({
  selector: 'app-record-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './followuppage.html',
  styleUrls: ['./followuppage.scss']
})
export class Followuppage implements OnInit {

  followup: FollowupRecord[] = [];
  loading: boolean = true;
  error: string = '';
  recordId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private followuprecordService: Followuprecord
  ) {}

  ngOnInit(): void {
    this.recordId = String(this.route.snapshot.paramMap.get('id'));
    console.log("ID du dossier récupéré :", this.recordId);

    if (!this.recordId) {
      this.error = "Aucun dossier de suivi trouvé (ID manquant)";
      this.loading = false;
      return;
    }

    this.loadRecordById(this.recordId);
  }

  loadRecordById(id: string): void {
    this.loading = true;

    this.followuprecordService.getById(id).subscribe({
      next: (data) => {
        console.log("Dossier chargé :", data);
        this.followup = [data];  // On stocke dans un tableau comme dans ton HTML
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur :", err);
        this.error = "Impossible de charger le dossier médical";
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/recordtransition']); // adapte selon ta route
  }

  deleteFollowup(): void {
    if (confirm("Voulez-vous vraiment supprimer ce dossier ?")) {
      this.followuprecordService.delete(this.recordId).subscribe({
        next: () => {
          alert("Dossier supprimé");
          this.router.navigate(['/record']);
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la suppression du dossier");
        }
      });
    }
  }

  editFollowup(): void {
    this.router.navigate(['/followuprecord/692adb4e250391d42c7656e2']);
  }

  formatDate(date: any): string {
    if (!date) return 'Non renseignée';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

}
