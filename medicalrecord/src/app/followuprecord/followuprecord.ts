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
import {FollowuprecordService} from '../services/followuprecord';
import {Medicaldocument} from '../services/medicaldocument';
import {catchError, forkJoin, map, Observable, of, switchMap} from 'rxjs';
import {MedicalDocument} from '../models/medicaldocument';
import {FollowupRecord} from '../models/followuprecord';

@Component({
  selector: 'app-dossier-suivi',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './followuprecord.html',
  styleUrls: ['./followuprecord.scss']
})
export class Followuprecord implements OnInit {

  dossierForm!: FormGroup;

  isEdit: boolean = false;
  followupId: string | null = null;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private followupService: FollowuprecordService,
    private medicalDocumentService: Medicaldocument,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.followupId = this.route.snapshot.paramMap.get('id');
    this.userId = localStorage.getItem('userId') || '';
    console.log(this.followupId);
    console.log(!!this.followupId);
    this.isEdit = !!this.followupId;

    this.dossierForm = this.fb.group({
      patientId: [this.userId],
      pathology: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
      status: ['', Validators.required],
      prescriptions: this.fb.array([]),
      medical_document: this.fb.array([])
    });

    if (this.isEdit) {
      this.loadFollowup(this.followupId!);
    }
  }

  get prescriptions(): FormArray {
    return this.dossierForm.get('prescriptions') as FormArray;
  }

  get documentsMedicaux(): FormArray {
    return this.dossierForm.get('medical_document') as FormArray;
  }

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

  loadFollowup(id: string) {
    this.followupService.getById(id).pipe(
      switchMap((followup) => {
        console.log("➡ Données chargées :", followup);

        this.dossierForm.patchValue({
          patientId: followup.patientId,
          pathology: followup.pathology,
          start_date: followup.start_date ? new Date(followup.start_date).toISOString().substring(0, 10) : '',
          end_date: followup.end_date ? new Date(followup.end_date).toISOString().substring(0, 10) : '',
          status: followup.status,
        });

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

        return this.medicalDocumentService.getByFollowupId(id).pipe(
          map((docs: any) => ({followup, docs})) // On renvoie followup + docs ensemble
        );
      })
    ).subscribe({
      next: ({followup, docs}) => {
        followup.medical_document = docs;

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


  onSubmit() {

    const formValue = this.dossierForm.value;

    const prescriptionsPayload = formValue.prescriptions || [];
    const medicalDocsPayload = formValue.medical_document || [];

    const followupPayload = {
      patientId: formValue.patientId,
      pathology: formValue.pathology,
      start_date: formValue.start_date,
      end_date: formValue.end_date,
      status: formValue.status,
      prescriptions: prescriptionsPayload,
      medical_document: medicalDocsPayload
    };
    if (this.isEdit && this.followupId) {
      console.log(medicalDocsPayload);

      this.followupService.update(this.followupId, followupPayload).pipe(
        switchMap(() => {
          if (medicalDocsPayload.length === 0) return of([]);

          const updates: Observable<any>[] = [];
          const creates: Observable<any>[] = [];

          medicalDocsPayload.forEach((doc: MedicalDocument) => {
            if (this.followupId != null) {
              doc.follow_up_file_Id = this.followupId;
            }

            if (doc._id) {
              updates.push(
                this.medicalDocumentService.update(doc._id, doc).pipe(
                  catchError(err => {
                    console.error("Erreur update doc :", err);
                    return of(null);
                  })
                )
              );

            } else {
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

          return forkJoin([...updates, ...creates]);
        })
      ).subscribe({
        next: () => {
          alert("Dossier et documents mis à jour !");
          window.history.back();
        },
        error: (err: any) => {
          console.error(err);
          alert("Erreur lors de la mise à jour");
        }
      });

      return;
    }

    this.followupService.create(followupPayload).pipe(
      switchMap((res : FollowupRecord) => {
        const followupId = res._id;
        const creates: Observable<any>[] = [];

        if (medicalDocsPayload.length === 0) {
          return of([]);
        }

        const docsToCreate = medicalDocsPayload.map((doc: any) => ({
          ...doc,
          follow_up_file_Id: followupId
        }));

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

        return forkJoin(creates);
      })
    ).subscribe({
      next: () => {
        alert("Dossier et documents médicaux créés !");
        this.router.navigate(['/followuppage']);
      },
      error: (err: any) => {
        console.error(err);
        alert("Erreur lors de la création");
      }
    });
  }
}
