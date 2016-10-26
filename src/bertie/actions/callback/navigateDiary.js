import moment from 'moment-timezone';
import { getDiaryNavigation } from './helpers';
import { fetchLogEvents } from '../database';

export default async ({ d: data }, user, p) => {
  const date = moment.utc(data).tz(user.timezone);
  if (!date.isValid()) { return { message: p.t('generalErrors.superWrong') }; };

  const { buttons } = getDiaryNavigation('navigateDiary', date, user);
  const { message, error } = await fetchLogEvents(user, date);
  if (error) { return { message: p.t(...error) }; }

  return { message, buttons: [ buttons ] };
};
