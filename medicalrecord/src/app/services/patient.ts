import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:3000/api/patients';

  async getPatients() {
    const res = await axios.get(this.baseUrl);
    return res.data;
  }

  async addPatient(patient: any) {
    const res = await axios.post(this.baseUrl, patient);
    return res.data;
  }

  async updatePatient(id: string, patient: any) {
    const res = await axios.put(`${this.baseUrl}/${id}`, patient);
    return res.data;
  }

  async deletePatient(id: string) {
    const res = await axios.delete(`${this.baseUrl}/${id}`);
    return res.data;
  }


  async registerPatient(data: any) {        // <-- ICI : any
    const res = await axios.post(`${this.baseUrl}/register`, data);
    return res.data;
  }

}
