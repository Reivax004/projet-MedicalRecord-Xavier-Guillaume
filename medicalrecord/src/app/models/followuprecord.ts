export interface MedicalDocument {
  name: string;
  url: string;
}

export interface FollowupRecord {
  id: number;
  pathologie: string;
  dateDebut: Date;
  dateFin: Date | null;
  prescriptions: MedicalDocument[];
  documents_medicaux: MedicalDocument[];
  etat: string; // Exemple : "En cours", "Terminé", "En pause"
}
