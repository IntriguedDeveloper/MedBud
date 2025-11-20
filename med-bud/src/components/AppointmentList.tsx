import type { Appointment } from "../models/Appointment";

interface Props {
  appointments: Appointment[];
  onToggle: (id: string) => void;
}

export default function AppointmentList({ appointments, onToggle }: Props) {
  return (
    <div className="mt-4 space-y-2">
      {appointments.map((a) => (
        <div key={a.id} className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-bold">{a.title}</h3>
          <p>📅 {a.date} – {a.time}</p>
          <p>📍 {a.location}</p>
          {a.notes && <p>📝 {a.notes}</p>}

          <button
            className={`btn mt-2 ${a.completed ? "bg-green-600" : "bg-blue-600"}`}
            onClick={() => onToggle(a.id)}
          >
            {a.completed ? "Completed" : "Mark Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}
