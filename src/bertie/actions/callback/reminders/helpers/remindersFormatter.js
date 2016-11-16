import moment from 'moment-timezone';

const localMinutes = (utcMinutes, tz) => {
  const hours = Math.floor(utcMinutes / 60);
  const minutes = utcMinutes - hours * 60;
  const localTime = moment.utc({ hours, minutes }).tz(tz);
  return localTime.hours() * 60 + localTime.minutes();
};

const timeStringFromMinutes = (min) => {
  let hours = `${Math.floor(min / 60)}`;
  let minutes = `${min - hours * 60}`;
  hours = (hours.length == 1) ? `0${hours}` : hours;
  minutes = (minutes.length == 1) ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`;
};

function sortReminders(r, tz) {
  return r.sort((first, second) =>  {
    const a = localMinutes(first.atMinute, tz);
    const b = localMinutes(second.atMinute, tz);

    if (a > b) { return 1; }
    if (a < b) { return -1; }
    return 0;
  });
};

const formatLogReminders = (r, p, tz) => {
  return sortReminders(r, tz).map(({ text }) => `${p.t(`reminders.icons.${text}`)} - ${p.t(`reminders.logReminders.${text}`)}`).join('\n');
};

const formatDailyReminders = (r, tz) => {
  return sortReminders(r, tz).map(({ text, atMinute }) => {
    return `*${timeStringFromMinutes(localMinutes(atMinute, tz))}* - ${text}`;
  }).join('\n');
};

export { formatLogReminders, formatDailyReminders, localMinutes, timeStringFromMinutes };
