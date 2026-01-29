import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PatientService } from '../services/patient';
import { Account } from '../models/account';
import { AppointmentService } from '../services/appointments';
import { totalMeetings } from '../models/totalMeetings';

@Component({
  selector: 'app-patient-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patientpage.html',
  styleUrls: ['./patientpage.scss']
})
export class PatientPage implements OnInit {

  public current!: Account;
  public loading: boolean = true;
  public error: string | null = null;
  public userType: string | null = "";
  public users: Account[] = [];
  private userId: string = '';
  private meetings: totalMeetings[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private AppointmentService: AppointmentService
  ) {}

  public ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.userType = localStorage.getItem('userType');

    if (!this.userId) {
      this.error = "Identifiant patient invalide.";
      this.loading = false;
      return;
    }

    if (this.userType === 'patient') {
      this.loadPatient();
    } else {
      this.loadPatientsForPractitioner();
      this.loadNumberPatientsForPractioner();
    }
  }

  private mergeProperties(): void {
    this.users = this.users.map(user => {
      const match = this.meetings.find(meeting =>
        meeting._id?.toString() === user._id?.toString()
      );
      return {
        ...user,
        totalMeetings: match ? match.totalMeetings : 0
      };
    });
  }

  private loadPatient(): void {
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

  private loadNumberPatientsForPractioner(): void {
    this.AppointmentService.getNumberPatientsForPractitioner(this.userId).subscribe({
      next: (result: any) => {
        this.meetings = result;
        console.log("Nombre de rencontres chargées :", this.meetings);
        this.mergeProperties();
      },
      error: () => {
        this.error = "Erreur lors du chargement du nombre de rencontres.";
        this.loading = false;
      }
    });
  }


  private loadPatientsForPractitioner(): void {
    console.log("ID du praticien récupéré :", this.userId);

    this.patientService.getPatients(this.userId).subscribe({
      next: (patients: Account[]) => {
        if (patients.length > 0) {
          this.users = patients;
          this.mergeProperties();
        } else {
          this.error = "Aucun patient trouvé pour ce praticien.";
          this.loading = false;
        }
      },
      error: () => {
        this.error = "Erreur lors du chargement des patients.";
        this.loading = false;
      }
    });
  }



  public onEdit(): void {
    if (!this.current || !this.current._id) return;
    this.router.navigate(['/register/', this.current._id]);
  }

  public onDelete(): void {

    if (!this.current || !this.current._id) return;

    const confirmDelete = confirm(
      `Es-tu sûr de vouloir supprimer le patient ${this.current.firstname} ${this.current.lastname} ?`
    );

    if (!confirmDelete) return;

    this.patientService.deletePatient(this.current._id).subscribe({
      next: () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        localStorage.removeItem('userFirstname');
        localStorage.removeItem('userLastname');
        this.router.navigate(['/home']).then(() => {
          alert('Patient supprimé avec succès.');
          window.location.reload();
        });
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de la suppression du patient.");
      }
    });
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('userFirstname');
    localStorage.removeItem('userLastname');
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  protected readonly history = history;
  viewPatient(id: string) {
    this.router.navigate(['/medicalrecord', id]);
  }

  public viewFollowedFiles(id: string): void {
    this.router.navigate(['/followuppage', id]);
  }

}
