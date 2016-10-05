import moment from 'moment-timezone';

export default (date, user, p) => {
  console.log(date);
  const today = moment.utc().tz(user.timezone).format('YYYY-MM-DD');
  const prevDay = date.clone().subtract(1, 'days').format('YYYY-MM-DD');
  const stringifyData = (data) => JSON.stringify({ type: 'navigateDiary', data });

  const buttons = [{ text: '<<', callback_data: stringifyData(prevDay) }];

  if (today != date.format('YYYY-MM-DD')) {
    const nextDay = date.clone().add(1, 'days').format('YYYY-MM-DD');
    buttons.push(
      { text: '>>', callback_data: stringifyData(nextDay) },
      { text: p.t('dateTime.today'), callback_data: stringifyData(today) }
    );
  }

  return { buttons };
};
