import { useEffect, useState } from "react";
import type { Reminder } from "../models/Reminder.ts";

interface Props {
  onAdd: (r: Reminder) => void;
  editing: Reminder | null;
  onUpdate: (r: Reminder) => void;
}

export default function ReminderForm({ onAdd, editing, onUpdate }: Props) {
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");
  const [dosage, setDosage] = useState("");

  useEffect(() => {
    if (editing) {
      setMedicine(editing.medicine);
      setTime(editing.time);
      setDosage(editing.dosage);
    }
  }, [editing]);

  const submit = (e: any) => {
    e.preventDefault();

    if (editing) {
      onUpdate({ ...editing, medicine, time, dosage });
    } else {
      onAdd({
        id: crypto.randomUUID(),
        medicine,
        time,
        dosage,
      });
    }

    setMedicine("");
    setTime("");
    setDosage("");
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-xl mx-auto mt-8 bg-white shadow p-6 rounded-xl"
    >
      <h2 className="text-xl font-bold mb-4">
        {editing ? "Edit Reminder" : "Add Medicine Reminder"}
      </h2>

      <label className="font-medium">Medicine Name</label>
      <input
        className="w-full p-3 border rounded-lg mb-3"
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
      />

      <label className="font-medium">Time</label>
      <input
        type="time"
        className="w-full p-3 border rounded-lg mb-3"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <label className="font-medium">Dosage</label>
      <input
        className="w-full p-3 border rounded-lg mb-4"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
      />

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
        {editing ? "Update Reminder" : "Add Reminder"}
      </button>
    </form>
  );
}
