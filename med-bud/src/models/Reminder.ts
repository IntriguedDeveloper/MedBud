export interface Reminder {
  id: string;        // crypto.randomUUID() returns a string
  medicine: string;  // you used "medicine" everywhere
  dosage: string;    // you used "dosage"
  time: string;
  nextTrigger?: number;
}
