import moment from 'moment-timezone';

function getLocalMinutes(utcMinutes, tz) {
  const hours = Math.floor(utcMinutes / 60);
  const minutes = utcMinutes - hours * 60;
  const localTime = moment.utc({ hours, minutes }).tz(tz);
  return localTime.hours() * 60 + localTime.minutes();
}

function sortReminders(r, tz) {
  const glm = getLocalMinutes;

  return r.sort((first, second) =>  {
    const a = glm(first.atMinute, tz);
    const b = glm(second.atMinute, tz);

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
    const localMinutes = getLocalMinutes(atMinute, tz);
    const hours = `${Math.floor(localMinutes / 60)}`;
    let minutes = `${localMinutes - hours * 60}`;
    minutes = (minutes.length == 1) ? `0${minutes}` : minutes;
    return `*${hours}:${minutes}* - \"${text}\"`;
  }).join('\n');
};

export { formatLogReminders, formatDailyReminders };
