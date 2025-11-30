export interface Prescription {
  _id?: string;
  drug_name: string;
  shape: string;
  quantity: number;
  frequency: number;
  start_date: Date;
  end_date: Date;
  status: string;
}
