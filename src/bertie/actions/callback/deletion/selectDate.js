import moment from 'moment-timezone';
import { getDiaryNavigation } from '../helpers';
import { fetchLogEvents } from '../../database';
import { btnFactory } from '../../helpers';

export default async (date, user, p) => {
  date = moment.utc(date).tz(user.timezone);
  if (!date.isValid()) { return { message: p.t('generalErrors.superWrong')}; };

  const { message: eventsMsg, error, data } = await fetchLogEvents(user, date);
  if (error) { return { message: p.t(...error) }; }

  const message = `${p.t('deletion.selectDate')}${eventsMsg}`;

  const { buttons: navBtns } = getDiaryNavigation('deletion', date, user);
  const buttons = data ? [navBtns, [btnFactory.deletion.select(date.format('YYYY-MM-DD'), p)]] : [navBtns];

  return { message, buttons };
};
