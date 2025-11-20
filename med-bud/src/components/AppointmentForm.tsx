import { useState, useEffect } from "react";
import type { Appointment } from "../models/Appointment";

interface Props {
  onAdd: (a: Appointment) => void;
}

export default function AppointmentForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [reminderMinutes, setReminderMinutes] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd({
      id: crypto.randomUUID(),
      title,
      date,
      time,
      location,
      notes,
      reminderMinutes,
      completed: false,
    });

    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <input className="input" placeholder="Appointment Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="date" className="input mt-2" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" className="input mt-2" value={time} onChange={(e) => setTime(e.target.value)} />
      <input className="input mt-2" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <textarea className="input mt-2" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <input type="number" className="input mt-2" placeholder="Reminder (minutes before)" value={reminderMinutes} onChange={(e) => setReminderMinutes(Number(e.target.value))} />

      <button className="btn mt-3 w-full">Add Appointment</button>
    </form>
  );
}
