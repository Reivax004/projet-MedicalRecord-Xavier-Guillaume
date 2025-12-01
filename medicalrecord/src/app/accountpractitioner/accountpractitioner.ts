import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Practitioner } from '../models/practitioner';
import { PractitionerService } from '../services/practitioners';

@Component({
  selector: 'app-practitioner-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './accountpractitioner.html',
  styleUrls: ['./accountpractitioner.scss']
})
export class PractitionerForm implements OnInit {

  practitionerForm!: FormGroup;
  isEdit: boolean = false;
  idToEdit: string | null = null;

  constructor(
    private fb: FormBuilder,
    private practitionerService: PractitionerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Récupération de l'ID dans l'URL
    this.idToEdit = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.idToEdit;

    // Formulaire simplifié pour correspondre exactement au HTML fourni
    this.practitionerForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      specialization: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    if (this.isEdit) {
      this.loadPractitioner(this.idToEdit!);
    }
  }

  loadPractitioner(id: string) {
    this.practitionerService.getById(id).subscribe({
      next: (p: Practitioner) => {
        this.practitionerForm.patchValue({
          lastname: p.lastname,
          firstname: p.firstname,
          specialization: p.specialization,
          phone: p.phone,
          email: p.email,
          password: p.password
        });
      },
      error: (err: any) => {
        console.error('Erreur chargement praticien : ', err);
      }
    });
  }

  onSubmit() {
    if (this.practitionerForm.invalid) {
      this.practitionerForm.markAllAsTouched();
      return;
    }

    const payload = this.practitionerForm.value as Practitioner;

    // UPDATE
    if (this.isEdit && this.idToEdit) {
      this.practitionerService.update(this.idToEdit, payload).subscribe({
        next: () => {
          alert('Praticien mis à jour !');
          this.router.navigate(['/practitionerpage']);
        },
        error: () => alert('Erreur mise à jour')
      });
      return;
    }

    // CREATE
    this.practitionerService.create(payload).subscribe({
      next: () => {
        alert('Praticien créé !');
        this.router.navigate(['/practitionerpage']);
      },
      error: () => alert('Erreur création')
    });
  }
}
