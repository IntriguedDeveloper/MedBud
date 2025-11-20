import { useState } from "react";
import TabNavigation from "./components/TabNavigation";

import ReminderForm from "./components/ReminderForm";
import ReminderList from "./components/ReminderList";

import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

import WaterTracker from "./components/WaterTracker";

import type { Reminder } from "./models/Reminder";
import type { Appointment } from "./models/Appointment";
import type { WaterLog } from "./models/WaterLog";

export default function App() {
  const [tab, setTab] = useState("reminders");

  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [editing, setEditing] = useState<Reminder | null>(null);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>([]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        Health Assistant App
      </h1>

      <TabNavigation tab={tab} setTab={setTab} />

      {tab === "reminders" && (
        <>
          <ReminderForm
            onAdd={(r) => setReminders([...reminders, r])}
            onUpdate={(r) =>
              setReminders(reminders.map((x) => (x.id === r.id ? r : x)))
            }
            editing={editing}
          />
          <ReminderList
            reminders={reminders}
            onDelete={(id) => setReminders(reminders.filter((r) => r.id !== id))}
            onEdit={setEditing}
          />
        </>
      )}

      {tab === "appointments" && (
        <>
          <AppointmentForm
            onAdd={(a) => setAppointments([...appointments, a])}
          />
          <AppointmentList
            appointments={appointments}
            onToggle={(id) =>
              setAppointments(
                appointments.map((a) =>
                  a.id === id ? { ...a, completed: !a.completed } : a
                )
              )
            }
          />
        </>
      )}

      {tab === "water" && (
        <WaterTracker waterLogs={waterLogs} setWaterLogs={setWaterLogs} />
      )}
    </div>
  );
}
