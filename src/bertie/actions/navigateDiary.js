/* eslint-disable camelcase */

import moment from 'moment-timezone';
import { fetchLogEvents } from '.';

export default async (date, user, p) => {
  const queriedDate = moment.utc(date).tz(user.timezone);
  if (!queriedDate.isValid()) { return { error: ['generalErrors.superWrong'] }; };

  const today = moment.utc().tz(user.timezone).format('YYYY-MM-DD');
  const prevDay = queriedDate.clone().subtract(1, 'days').format('YYYY-MM-DD');
  const stringifyData = (data) => JSON.stringify({ type: 'navigateDiary', data });

  const buttons = [{ text: '<<', callback_data: stringifyData(prevDay) }];

  if (today != queriedDate.format('YYYY-MM-DD')) {
    const nextDay = queriedDate.clone().add(1, 'days').format('YYYY-MM-DD');
    buttons.push(
      { text: '>>', callback_data: stringifyData(nextDay) },
      { text: p.t('dateTime.today'), callback_data: stringifyData(today) }
    );
  }

  const { message, error } = await fetchLogEvents(user, queriedDate);
  if (error) { return { error }; };

  return { buttons, message };
};
