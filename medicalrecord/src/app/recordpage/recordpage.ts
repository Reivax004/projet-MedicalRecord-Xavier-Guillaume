import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalRecordService } from '../services/record';
import { MedicalRecord } from '../models/record';

@Component({
  selector: 'app-record-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recordpage.html',
  styleUrls: ['./recordpage.scss']
})
export class RecordPage implements OnInit {

  record: MedicalRecord[] = [];
  loading: boolean = true;
  error: string = '';
  recordId!: string;
  patientId?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recordService: MedicalRecordService
  ) {}

  ngOnInit(): void {
    this.recordId = String(this.route.snapshot.paramMap.get('id'));
    console.log("ID du dossier récupéré :", this.recordId);
      if (!this.recordId) {
      this.error = "Aucun dossier médical trouvé (ID manquant)";
      this.loading = false;
      return;
    }
    this.patientId = localStorage.getItem('userId') || '';
    this.loadRecordById(this.recordId);
  }

  loadRecordById(id: string): void {
    this.loading = true;

    this.recordService.getById(this.patientId).subscribe({
      next: (data) => {
        console.log("Dossier chargé :", data);
        this.record = [data];  // On stocke dans un tableau comme dans ton HTML
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

  deleteRecord(): void {
    if (confirm("Voulez-vous vraiment supprimer ce dossier ?")) {
      this.recordService.delete(this.recordId).subscribe({
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

editRecord(): void {
    this.router.navigate(['/record/', this.recordId]);
  }

  formatDate(date: any): string {
    if (!date) return 'Non renseignée';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  calculateBMI(record: MedicalRecord): string {
    if (!record?.weight || !record?.height) {
      return 'Non calculable';
    }
    const heightInMeters = record.height / 100;
    const bmi = record.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  }

  getBMICategory(record: MedicalRecord): string {
    const bmi = parseFloat(this.calculateBMI(record));
    if (isNaN(bmi)) return '';

    if (bmi < 18.5) return 'Insuffisance pondérale';
    if (bmi < 25) return 'Poids normal';
    if (bmi < 30) return 'Surpoids';
    return 'Obésité';
  }
}
