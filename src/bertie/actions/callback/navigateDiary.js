import moment from 'moment-timezone';
import { getDiaryNavigation, formatters } from './helpers';
import { fetchLogEvents } from '../database';

export default async ({ d }, user) => {
  const datum = moment.utc(d).tz(user.timezone);
  if (!datum.isValid()) { return { message: ['generalErrors.superWrong'] }; };

  const { buttons } = getDiaryNavigation('navigateDiary', datum, user);
  const { data, error } = await fetchLogEvents(user, datum);
  if (error) { return { message: error }; }

  const date = datum.format('ddd, DD.MM.YYYY');
  let message;

  if (!data[0]) {
    message = ['navigateDiary.noData', { date }];
  } else {
    const values = formatters.diary(data, user);
    message = ['navigateDiary.data', { date, values }];
  }

  return {
    message,
    buttons: [ buttons ]
  };
};
