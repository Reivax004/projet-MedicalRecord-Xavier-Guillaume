export type Role = 'Patient' | 'Médecin' | 'Secrétaire';

export interface Account {
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
