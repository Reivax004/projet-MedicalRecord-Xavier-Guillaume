import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PractitionerService } from '../services/practitioners';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-practitioner-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './practitioner.html',
  styleUrls: ['./practitioner.scss']
})
export class PractitionerForm implements OnInit {

  practitionerForm!: FormGroup;
  isEdit: boolean = false;
  practitionerId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private practitionerService: PractitionerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // 🔎 Récupérer l’ID dans l’URL
    this.practitionerId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.practitionerId;

    // 🧱 Création du Formulaire
    this.practitionerForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''], // Optionnel si mode EDIT
      specialization: ['', Validators.required],
      phone: [''],
      establishment: this.fb.group({
        establishmentId: [''],
        name: ['']
      })
    });

    // ✏ Mode EDIT → charger les données
    if (this.isEdit) {
      this.loadPractitioner(this.practitionerId!);
    }
  }

  // -----------------------------------------------------
  // 🟦 Charger données du praticien (EDIT)
  // -----------------------------------------------------
  loadPractitioner(id: string) {
    this.practitionerService.getOne(id).subscribe({
      next: (practitioner) => {
        this.practitionerForm.patchValue({
          lastname: practitioner.lastname,
          firstname: practitioner.firstname,
          email: practitioner.email,
          specialization: practitioner.specialization,
          phone: practitioner.phone,
          establishment: {
            establishmentId: practitioner.establishment?.establishmentId || '',
            name: practitioner.establishment?.name || ''
          }
        });

        // ⚠️ On ne patch PAS le mot de passe (jamais renvoyé par le backend)
      },
      error: (err) => {
        console.error("Erreur récupération praticien :", err);
      }
    });
  }

  // -----------------------------------------------------
  // 🟩 Soumission du formulaire
  // -----------------------------------------------------
  submitForm() {
    if (this.practitionerForm.invalid) {
      return;
    }

    const payload = this.practitionerForm.value;

    // Si mode EDIT → UPDATE
    if (this.isEdit && this.practitionerId) {
      this.practitionerService.update(this.practitionerId, payload).subscribe({
        next: () => {
          alert("Praticien mis à jour !");
          this.router.navigate(['/practitioners', this.practitionerId]);
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la mise à jour");
        }
      });
      return;
    }

    // Si mode CREATE → CREATE
    this.practitionerService.create(payload).subscribe({
      next: (response: any) => {
        alert("Praticien créé !");
        this.router.navigate(['/practitioners', response._id]);
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de la création");
      }
    });
  }
}
