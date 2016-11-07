function sortReminders(r) {
  return r.sort((a, b) =>  {
    if (a.atMinute > b.atMinute) { return 1; }
    if (a.atMinute < b.atMinute) { return -1; }
    return 0;
  });
};

const formatLogReminders = (r, p) => {
  return sortReminders(r).map(({ text }) => `${p.t(`reminders.icons.${text}`)} - ${p.t(`reminders.logReminders.${text}`)}`).join('\n');
};

const formatDailyReminders = (r) => {
  return sortReminders(r).map(({ text, atMinute }) => {
    const hours = `${Math.floor(atMinute / 60)}`;
    let minutes = `${atMinute - hours * 60}`;
    minutes = (minutes.length == 1) ? `0${minutes}` : minutes;
    return `*${hours}:${minutes}* - \"${text}\"`;
  }).join('\n');
};

export { formatLogReminders, formatDailyReminders };
