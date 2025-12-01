import { Component } from '@angular/core';
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
export class RecordTransition {
  userId: string = "";
  bool: MedicalRecord | null = null;
  userType: string | null = null;
  constructor(private router: Router, private recordService: MedicalRecordService) {}
  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    this.userType = localStorage.getItem('userType') || '';	

    this.recordService.getById(this.userId)
    .subscribe((data: any) => {
      this.bool = data;
      console.log(this.bool);
    });
  }
  goToCreateFollowup() {
    this.router.navigate(['/followuprecord']);
  }

  goToCreateMedical() {
    this.router.navigateByUrl('/record');
  }
  goToConsultFollowup() {
    this.router.navigateByUrl('/followuppage/:id');
  }

goToConsultMedical() {
    this.router.navigateByUrl('/medicalrecord/:id');
  }

  goToConsultPatients(){
    this.router.navigateByUrl('/patientpage/:id');
}
}

