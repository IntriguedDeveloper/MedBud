import { useState, useEffect } from "react";
import type { Reminder } from "../models/Reminder";

interface Props {
  onAdd: (r: Reminder) => void;
  onUpdate: (r: Reminder) => void;
  editing: Reminder | null;
}

export default function ReminderForm({ onAdd, onUpdate, editing }: Props) {
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (editing) {
      setMedicine(editing.medicine);
      setDosage(editing.dosage);
      setTime(editing.time);
    }
  }, [editing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextTrigger = new Date(`2000-01-01T${time}:00`).getTime();

    if (editing) {
      onUpdate({ ...editing, medicine, dosage, time, nextTrigger });
    } else {
      onAdd({
        id: crypto.randomUUID(),
        medicine,
        dosage,
        time,
        nextTrigger,
      });
    }

    setMedicine("");
    setDosage("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <input
        className="input"
        placeholder="Medicine"
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
      />
      <input
        className="input mt-2"
        placeholder="Dosage"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
      />
      <input
        type="time"
        className="input mt-2"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button className="btn mt-3 w-full">
        {editing ? "Update Reminder" : "Add Reminder"}
      </button>
    </form>
  );
}
