export interface MedicalRecord {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: 'Homme' | 'Femme' | 'Autre';
  weight?: number;           // Poids en kg
  height?: number;           // Taille en cm
  bloodType: string;
  allergies?: string;
  chronicDiseases?: string;
  currentMedications?: string;
  pastSurgeries?: string;
  emergencyContact: string;
}
