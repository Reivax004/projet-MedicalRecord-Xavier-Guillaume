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
import {Prescription} from '../models/prescription';
import {Medicaldocument} from '../services/medicaldocument';
import {catchError, forkJoin, map, Observable, of, switchMap} from 'rxjs';
import {MedicalDocument} from '../models/medicaldocument';


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
    private medicalDocumentService: Medicaldocument,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    /** :id dans l’URL */
    this.followupId = this.route.snapshot.paramMap.get('id');
    console.log(!!this.followupId);
    this.isEdit = !!this.followupId;

    /** construction formulaire */
    this.dossierForm = this.fb.group({
      //patientId: [''],
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
      //practitioner: ['', Validators.required],
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
    this.followupService.getById(id).pipe(
      switchMap((followup) => {
        console.log("➡ Données chargées :", followup);

        // Patch des champs du formulaire principal
        this.dossierForm.patchValue({
          //patientId: followup.patientId,
          pathology: followup.pathology,
          start_date: followup.start_date ? new Date(followup.start_date).toISOString().substring(0, 10) : '',
          end_date: followup.end_date ? new Date(followup.end_date).toISOString().substring(0, 10) : '',
          status: followup.status,
        });

        // Prescriptions
        this.prescriptions.clear();
        followup.prescriptions.forEach((p: any) => {
          const g = this.fb.group({
            drug_name: p.drug_name,
            shape: p.shape,
            quantity: p.quantity,
            frequency: p.frequency,
            start_date: p.start_date ? p.start_date.substring(0, 10) : '',
            end_date: p.end_date ? p.end_date.substring(0, 10) : '',
            status: p.status,
          });
          this.prescriptions.push(g);
        });

        // Requête pour récupérer les documents médicaux
        return this.medicalDocumentService.getByFollowupId(id).pipe(
          map((docs: any) => ({followup, docs})) // On renvoie followup + docs ensemble
        );
      })
    ).subscribe({
      next: ({followup, docs}) => {
        // On ajoute les documents médicaux au followup pour pouvoir récupérer leur _id
        followup.medical_document = docs;

        // Documents médicaux → ajout au FormArray
        this.documentsMedicaux.clear();
        docs.forEach((d: any) => {
          const g = this.fb.group({
            _id: d._id ?? null,
            follow_up_file_Id: d.follow_up_file_Id,
            type: d.type,
            date: d.date ? new Date(d.date).toISOString().substring(0, 10) : '',
            description: d.description
          });
          this.documentsMedicaux.push(g);
        });

        console.log("➡ Followup avec documents :", followup);
      },
      error: (err) => console.error("Erreur chargement followup :", err)
    });
  }


  /** -------------------- SUBMIT -------------------- */
  onSubmit() {
    /*
    if (this.dossierForm.invalid) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }*/

    const formValue = this.dossierForm.value;

    // Séparer prescriptions et documents médicaux
    const prescriptionsPayload = formValue.prescriptions || [];
    const medicalDocsPayload = formValue.medical_document || [];

    // Préparer le payload du followup sans les documents médicaux
    const followupPayload = {
      //patientId: formValue.patientId,
      pathology: formValue.pathology,
      start_date: formValue.start_date,
      end_date: formValue.end_date,
      status: formValue.status,
      prescriptions: prescriptionsPayload,
      medical_document: medicalDocsPayload
    };
    /** Mode EDIT → UPDATE */
    if (this.isEdit && this.followupId) {
      console.log(medicalDocsPayload);

      this.followupService.update(this.followupId, followupPayload).pipe(
        switchMap(() => {
          if (medicalDocsPayload.length === 0) return of([]);

          const updates: Observable<any>[] = [];
          const creates: Observable<any>[] = [];

          medicalDocsPayload.forEach((doc: MedicalDocument) => {
            // Ajouter l'id du followup si nécessaire
            if (this.followupId != null) {
              doc.follow_up_file_Id = this.followupId;
            }

            if (doc._id) {
              // 🔹 Document EXISTANT → UPDATE
              updates.push(
                this.medicalDocumentService.update(doc._id, doc).pipe(
                  catchError(err => {
                    console.error("Erreur update doc :", err);
                    return of(null);
                  })
                )
              );

            } else {
              // 🔹 Nouveau document → CREATE
              creates.push(
                this.medicalDocumentService.create(doc).pipe(
                  catchError(err => {
                    console.error("Erreur create doc :", err);
                    return of(null);
                  })
                )
              );
            }
          });

          // Combiner updates + creates
          return forkJoin([...updates, ...creates]);
        })
      ).subscribe({
        next: () => {
          alert("Dossier et documents mis à jour !");
          this.router.navigate(['/followuppage', this.followupId]);
        },
        error: (err: any) => {
          console.error(err);
          alert("Erreur lors de la mise à jour");
        }
      });

      return;
    }

    /** Mode CREATE → CREATE */
    this.followupService.create(followupPayload).pipe(
      switchMap((res) => {
        const followupId = res._id;
        const creates: Observable<any>[] = [];

        if (medicalDocsPayload.length === 0) {
          return of([]); // aucun doc médical : on renvoie un observable vide
        }

        // Associer l'ID du followup à chaque document
        const docsToCreate = medicalDocsPayload.map((doc: any) => ({
          ...doc,
          follow_up_file_Id: followupId
        }));

        // Créer réellement chaque document
        docsToCreate.forEach((doc: MedicalDocument) => {
          creates.push(
            this.medicalDocumentService.create(doc).pipe(
              catchError(err => {
                console.error("Erreur création document médical :", err);
                return of(null);
              })
            )
          );
        });

        return forkJoin(creates); // attendre que tous les documents soient créés
      })
    ).subscribe({
      next: () => {
        alert("Dossier et documents médicaux créés !");
        this.router.navigate(['/followuppage', this.followupId]);
      },
      error: (err: any) => {
        console.error(err);
        alert("Erreur lors de la création");
      }
    });
  }
}
