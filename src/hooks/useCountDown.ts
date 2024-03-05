import { useEffect, useState } from "react";

const formatTime = (time: number) => {
  const localTime = time < 0 ? 0 : time;
  return Math.floor(localTime).toString().padStart(2, "0");
};

const getDiff = (timestamp: string) => {
  const endDate = new Date(+timestamp).getTime();
  const currentDate = Date.now();
  return endDate - currentDate;
};

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

/**
 *
 * @param endDate timestamp of endDate
 *
 */
export default function useCountDown(timestamp: string): {
  days: string;
  minutes: string;
  hours: string;
  seconds: string;
  isFinish: boolean;
} {
  const [difftime, setDiff] = useState(() => getDiff(timestamp));

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDiff = getDiff(timestamp);
      if (currentDiff < 1000) clearInterval(timer);
      setDiff(currentDiff);
    }, 1000);
  }, [timestamp]);

  const isFinish = difftime < 1000;
  const days = formatTime(difftime / DAY);
  const hours = formatTime((difftime % DAY) / HOUR);
  const minutes = formatTime((difftime % HOUR) / MINUTE);
  const seconds = formatTime((difftime % MINUTE) / SECOND);

  return {
    days,
    hours,
    minutes,
    seconds,
    isFinish,
  };
}
