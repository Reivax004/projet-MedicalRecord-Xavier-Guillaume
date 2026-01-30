import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MedicalRecordService } from '../services/record';
import { MedicalRecord } from '../models/record';

@Component({
  selector: 'app-transition-record',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recordtransition.html',
  styleUrls: ['./recordtransition.scss']
})
export class RecordTransition implements OnInit {
  public userId: string = "";
  public record: MedicalRecord | null = null;
  public userType: string | null = null;
  constructor(private router: Router, private recordService: MedicalRecordService) {}
  public ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.userType = localStorage.getItem('userType');

    this.recordService.getById(this.userId).subscribe({
      next: (data: MedicalRecord) => {
        this.record = data;
      },
      error: () => {
        this.record = null;
      }
    });
  }
  public goToCreateFollowup(): void {
    this.router.navigate(['/followuprecord']);
  }

  public goToCreateMedical(): void {
    this.router.navigateByUrl('/record');
  }
  public goToConsultFollowup(): void {
    this.router.navigate(['/followuppage', this.userId]);
  }

public goToConsultMedical(): void {
  this.router.navigate(['/medicalrecord', this.userId]);
  }

  public goToConsultPatients(): void{
    this.router.navigate([' /patientpage', this.userId]);
}
}

