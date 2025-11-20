import { useEffect, useState } from "react";
import type { Reminder } from "./models/Reminder.ts";
import Header from "./components/Header.tsx";
import ReminderForm from "./components/ReminderForm";
import ReminderList from "./components/ReminderList";

export default function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [search, setSearch] = useState("");
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("reminders");
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (r: Reminder) => {
    setReminders([...reminders, r]);
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const updateReminder = (updated: Reminder) => {
    setReminders(reminders.map((r) => (r.id === updated.id ? updated : r)));
    setEditingReminder(null);
  };

  const filtered = reminders.filter((r) =>
    r.medicine.toLowerCase().includes(search.toLowerCase())
  );

  const nextReminder = [...reminders].sort(
    (a, b) => Number(new Date(`2000-01-01 ${a.time}`)) - Number(new Date(`2000-01-01 ${b.time}`))
  )[0];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Dashboard */}
      <div className="max-w-4xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h3 className="text-gray-600">Total Reminders</h3>
          <p className="text-3xl font-bold">{reminders.length}</p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h3 className="text-gray-600">Next Reminder</h3>
          <p className="text-lg font-semibold">
            {nextReminder ? `${nextReminder.medicine} @ ${nextReminder.time}` : "None"}
          </p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h3 className="text-gray-600">Today's Reminders</h3>
          <p className="text-3xl font-bold">{reminders.length}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto px-4 mt-6">
        <input
          type="text"
          placeholder="Search medicine..."
          className="w-full p-3 rounded-xl border border-gray-300 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ReminderForm
        onAdd={addReminder}
        editing={editingReminder}
        onUpdate={updateReminder}
      />

      <ReminderList
        reminders={filtered}
        onDelete={deleteReminder}
        onEdit={(r) => setEditingReminder(r)}
      />
    </div>
  );
}
