// 📄 src/hooks/useMedicineReminders.js
import { useEffect } from 'react';

export function useMedicineReminders(medicineList) {
  useEffect(() => {
    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    const timers = [];

    medicineList.forEach((med) => {
      const times = [];

      if (med.frequency.includes("Morning")) times.push("05:00");
      if (med.frequency.includes("Night")) times.push("17:00");

      times.forEach((timeStr) => {
        const [h, m] = timeStr.split(":").map(Number);
        const now = new Date();
        const next = new Date();
        next.setHours(h, m, 0, 0);
        if (next < now) next.setDate(next.getDate() + 1);

        const timeout = next.getTime() - now.getTime();

        const timerId = setTimeout(() => {
          new Notification(`💊 Time to take your medicine: ${med.name}`);
        }, timeout);

        timers.push(timerId);
      });
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [JSON.stringify(medicineList)]);
}
