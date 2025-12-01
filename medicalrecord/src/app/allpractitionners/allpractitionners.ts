import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PractitionerService } from '../services/practitioners';
import { Practitioner } from '../models/practitioner';

@Component({
  selector: 'app-allpractitionners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allpractitionners.html',
  styleUrls: ['./allpractitionners.scss']
})
export class AllPractitionners implements OnInit {

  practitioners: Practitioner[] = [];
  loading = true;
  error: string | null = null;

  constructor(private practitionerService: PractitionerService) {}

  ngOnInit(): void {
    this.practitionerService.getPractitioners().subscribe({
      next: (data) => {
        this.practitioners = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les praticiens.';
        this.loading = false;
      }
    });
  }
}
