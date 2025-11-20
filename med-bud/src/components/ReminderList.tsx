import type { Reminder } from "../models/Reminder";

interface Props {
  reminders: Reminder[];
  onDelete: (id: string) => void;
  onEdit: (r: Reminder) => void;
}

export default function ReminderList({ reminders, onDelete, onEdit }: Props) {
  return (
    <div className="mt-4 space-y-2">
      {reminders.map((r) => (
        <div key={r.id} className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-bold">{r.medicine}</h3>
          <p>{r.dosage}</p>
          <p>⏰ {r.time}</p>

          <div className="flex space-x-2 mt-2">
            <button className="btn" onClick={() => onEdit(r)}>
              Edit
            </button>
            <button className="btn bg-red-500" onClick={() => onDelete(r.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
