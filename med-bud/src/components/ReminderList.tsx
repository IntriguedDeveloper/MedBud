import type { Reminder } from "../models/Reminder.ts";

interface Props {
  reminders: Reminder[];
  onDelete: (id: string) => void;
  onEdit: (r: Reminder) => void;
}

export default function ReminderList({ reminders, onDelete, onEdit }: Props) {
  const isUpcoming = (time: string) => {
    const now = new Date();
    const reminderTime = new Date();
    const [h, m] = time.split(":").map(Number);
    reminderTime.setHours(h, m, 0);
    return reminderTime.getTime() - now.getTime() <= 3600000 && reminderTime > now;
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Your Reminders</h2>

      {reminders.map((r) => (
        <div
          key={r.id}
          className={`flex justify-between items-center p-4 mb-3 rounded-xl shadow ${
            isUpcoming(r.time) ? "bg-yellow-100 border-l-4 border-yellow-500" : "bg-white"
          }`}
        >
          <div>
            <h3 className="text-lg font-semibold">{r.medicine}</h3>
            <p className="text-gray-700">🕒 {r.time}</p>
            <p className="text-gray-700">💊 {r.dosage}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(r)}
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(r.id)}
              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
