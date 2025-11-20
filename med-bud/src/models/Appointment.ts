export interface Appointment {
  id: string;
  title: string;
  date: string; 
  time: string; 
  location: string;
  notes?: string;
  reminderMinutes: number;
  completed: boolean;
}
