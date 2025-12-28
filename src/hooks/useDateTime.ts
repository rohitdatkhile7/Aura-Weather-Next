import { useEffect, useState } from "react";

interface DateTimeState {
  date: string;
  time: string;
  fullDate: Date;
}

export function useDateTime(updateInterval: number = 60000) {
  const [dateTime, setDateTime] = useState<DateTimeState>({
    date: "",
    time: "",
    fullDate: new Date(),
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime({
        date: now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        time: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        fullDate: now,
      });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, updateInterval);
    return () => clearInterval(interval);
  }, [updateInterval]);

  return dateTime;
}
