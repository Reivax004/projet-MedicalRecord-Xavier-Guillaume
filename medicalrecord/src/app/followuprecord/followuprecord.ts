import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {Followuprecord} from '../services/followuprecord';


@Component({
  selector: 'app-dossier-suivi',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './followuprecord.html',
  styleUrls: ['./followuprecord.scss']
})
export class FollowupRecord implements OnInit {

  dossierForm!: FormGroup;

  isEdit: boolean = false;
  followupId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private followupService: Followuprecord,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    /** :id dans l’URL */
    this.followupId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.followupId;

    /** construction formulaire */
    this.dossierForm = this.fb.group({
      patientId: [''],
      pathology: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
      status: ['', Validators.required],
      prescriptions: this.fb.array([]),
      medical_document: this.fb.array([])
    });

    /** Si modification charge les données */
    if (this.isEdit) {
      this.loadFollowup(this.followupId!);
    }
  }

  /** GETTERS */
  get prescriptions(): FormArray {
    return this.dossierForm.get('prescriptions') as FormArray;
  }

  get documentsMedicaux(): FormArray {
    return this.dossierForm.get('medical_document') as FormArray;
  }

  /** -------------------- PRESCRIPTIONS -------------------- */
  addPrescription() {
    const group = this.fb.group({
      drug_name: ['', Validators.required],
      shape: ['', Validators.required],
      quantity: ['', Validators.required],
      frequency: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.prescriptions.push(group);
  }

  removePrescription(index: number) {
    this.prescriptions.removeAt(index);
  }

  /** -------------------- MEDICAL DOCS -------------------- */
  addMedicalDoc() {
    const group = this.fb.group({
      follow_up_file_Id: ['', Validators.required],
      practitioner: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.documentsMedicaux.push(group);
  }

  removeMedicalDoc(index: number) {
    this.documentsMedicaux.removeAt(index);
  }

  /** -------------------- LOAD (GET BY ID) -------------------- */
  loadFollowup(id: string) {
    this.followupService.getById(id).subscribe({
      next: (followup) => {
        console.log("➡ Données chargées :", followup);
        this.dossierForm.patchValue({
          patientId: followup.patientId,
          pathology: followup.pathology,
          start_date: followup.start_date,
          end_date: followup.end_date,
          status: followup.status,
        });

        this.prescriptions.clear();
        followup.prescriptions.forEach((p: any) => {
          const g = this.fb.group({
            drug_name: p.drug_name,
            shape: p.shape,
            quantity: p.quantity,
            frequency: p.frequency,
            start_date: p.start_date,
            end_date: p.end_date,
            status: p.status
          });
          this.prescriptions.push(g);
        });
      /*
        this.documentsMedicaux.clear();
        followup.medical_document.forEach((d: any) => {
          const g = this.fb.group({
            follow_up_file_Id: d.follow_up_file_Id,
            practitioner: d.practitioner,
            type: d.type,
            date: d.date,
            description: d.description
          });
          this.documentsMedicaux.push(g);
        });*/
      },
      error: (err: any) => console.error("Erreur chargement :", err)
    });
  }

  /** -------------------- SUBMIT -------------------- */
  onSubmit() {
    if (this.dossierForm.invalid) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const payload = this.dossierForm.value;

    /** Mode EDIT → UPDATE */
    if (this.isEdit && this.followupId) {
      this.followupService.update(this.followupId, payload).subscribe({
        next: () => {
          alert("Dossier mis à jour !");
          this.router.navigate(['/followup', this.followupId]);
        },
        error: (err: any) => {
          console.error(err);
          alert("Erreur lors de la mise à jour");
        }
      });
      return;
    }

    /** Mode CREATE → CREATE */
    this.followupService.create(payload).subscribe({
      next: (res) => {
        alert("Dossier créé !");
        this.router.navigate(['/followuprecord', res._id]);
      },
      error: (err: any) => {
        console.error(err);
        alert("Erreur lors de la création");
      }
    });
  }
}
