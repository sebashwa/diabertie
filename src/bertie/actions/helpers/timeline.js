import moment from 'moment-timezone';

export default (user, start) => {
  const today = moment.utc().tz(user.timezone);
  if (!start) { start = today.clone(); }
  const prevDay = start.clone().subtract(1, 'days');
  const nextDay = start.clone().add(1, 'days');

  return {
    moment: {
      today,
      start,
      prevDay,
      nextDay,
    },
    unix: {
      today:   today.unix(),
      start:   start.unix(),
      prevDay: prevDay.unix(),
      nextDay: nextDay.unix(),
    },
    str: {
      today:   today.format('YYYY-MM-DD'),
      start:   start.format('YYYY-MM-DD'),
      prevDay: prevDay.format('YYYY-MM-DD'),
      nextDay: nextDay.format('YYYY-MM-DD'),
    }
  };
};
