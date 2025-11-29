import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicalRecordService } from '../services/record';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medical-record',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './record.html',
  styleUrls: ['./record.scss']
})
export class Record implements OnInit {

  medicalForm!: FormGroup;
  isEdit: boolean = false;
  recordId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private recordService: MedicalRecordService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID dans l'URL
    this.recordId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.recordId;

    // Création du formulaire
    this.medicalForm = this.fb.group({
      weight: [''],
      height: [''],
      blood_pressure: ['', Validators.required],
      blood_group: ['', Validators.required],
      allergies: [''],
      vaccine: this.fb.array([])
    });

    // Si mode EDIT → charger les données
    if (this.isEdit) {
      this.loadRecord(this.recordId!);
    }
  }

  // Getter du FormArray
  get vaccineArray(): FormArray {
    return this.medicalForm.get('vaccine') as FormArray;
  }

  // FormGroup vaccin
  createVaccineGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      injection_date: [''],
      vaccination_type: [''],
      vaccinator_name: ['']
    });
  }

  // Chargement des données
  loadRecord(id: string) {
    this.recordService.getById(id).subscribe({
      next: (record) => {
        // remplir le formulaire
        this.medicalForm.patchValue({
          weight: record.weight,
          height: record.height,
          blood_pressure: record.blood_pressure,
          blood_group: record.blood_group,
          allergies: record.allergies.join(', ')
        });

        // remplir les vaccins
        record.vaccine.forEach((v: any) => {
          const group = this.createVaccineGroup();
          group.patchValue(v);
          this.vaccineArray.push(group);
        });
      },
      error: (err) => {
        console.error('Erreur récupération dossier :', err);
      }
    });
  }

  addVaccine() {
    this.vaccineArray.push(this.createVaccineGroup());
  }

  removeVaccine(index: number) {
    this.vaccineArray.removeAt(index);
  }

  submitForm() {
    if (this.medicalForm.invalid) {
      return;
    }

    const formValue = this.medicalForm.value;

    const payload = {
      ...formValue,
      allergies: formValue.allergies
        ? formValue.allergies.split(',').map((a: string) => a.trim())
        : []
    };

    // MODE EDIT → UPDATE
    if (this.isEdit && this.recordId) {
      this.recordService.update(this.recordId, payload).subscribe({
        next: () => {
          alert("Dossier mis à jour !");
          this.router.navigate(['/medicalrecord', this.recordId]);
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la mise à jour");
        }
      });
      return;
    }

    // MODE CREATE → CREATE
    this.recordService.create(payload).subscribe({
      next: (response) => {
        alert("Dossier créé !");
        this.router.navigate(['/medicalrecord', response._id]);
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de la création");
      }
    });
  }
}
