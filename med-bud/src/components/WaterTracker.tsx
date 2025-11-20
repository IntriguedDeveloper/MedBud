import { useState } from "react";
import type { WaterLog } from "../models/WaterLog";

interface Props {
  waterLogs: WaterLog[];
  setWaterLogs: (logs: WaterLog[]) => void;
}

export default function WaterTracker({ waterLogs, setWaterLogs }: Props) {
  const [custom, setCustom] = useState("");

  const add = (amount: number) => {
    setWaterLogs([
      ...waterLogs,
      { id: crypto.randomUUID(), amount, time: new Date().toLocaleTimeString() },
    ]);
  };

  const total = waterLogs.reduce((x, y) => x + y.amount, 0);
  const percent = Math.min((total / 3000) * 100, 100);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-3">Water Intake</h2>

      <div className="flex space-x-2">
        {[100, 250, 500].map((n) => (
          <button key={n} className="btn" onClick={() => add(n)}>
            +{n}ml
          </button>
        ))}
      </div>

      <div className="mt-3">
        <input type="number" className="input" placeholder="Custom ml" value={custom} onChange={(e) => setCustom(e.target.value)} />
        <button className="btn mt-2 w-full" onClick={() => { if (custom) { add(Number(custom)); setCustom(""); } }}>
          Add
        </button>
      </div>

      <div className="w-full bg-gray-200 h-4 rounded mt-4">
        <div className="bg-blue-500 h-full rounded" style={{ width: percent + "%" }} />
      </div>

      <p className="text-sm mt-1">{total} / 3000ml</p>

      <h3 className="font-semibold mt-3">Logs</h3>
      <ul>
        {waterLogs.map((w) => (
          <li key={w.id}>{w.amount}ml – {w.time}</li>
        ))}
      </ul>
    </div>
  );
}
