import dayjs from "dayjs";

export function whenShouldHappen(date: dayjs.Dayjs): string {
  return dayjs().isBefore(date) ? "should happen" : "should have happened";
}

export function minutesToHours(minutes: number): string {
  const minutesRemainder = minutes % 60;
  const minutesText = `${minutesRemainder} ${minutesRemainder === 1 ? "minute" : "minutes"}`;
  if (minutes < 60) {
    return minutesText;
  } else {
    const hours = Math.floor(minutes / 60);
    const hoursText = `${hours} ${hours === 1 ? "hour" : "hours"}`;
    if (minutesRemainder === 0) {
      return hoursText;
    }
    return `${hoursText} ${minutesText}`;
  }
}
