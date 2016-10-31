import moment from 'moment-timezone';
import { getDiaryNavigation, formatters } from '../helpers';
import { fetchLogEvents } from '../../database';
import { btnFactory } from '../../helpers';

export default async (queriedDate, user, p) => {
  const dateObj = moment.utc(queriedDate).tz(user.timezone);
  if (!dateObj.isValid()) { return { message: ['generalErrors.superWrong'] }; };

  const { error, data } = await fetchLogEvents(user, dateObj);
  if (error) { return { message: error }; }

  const date = dateObj.format('ddd, DD.MM.YYYY');
  let message;

  if (!data[0]) {
    message = ['deletion.selectDate.noData', { date }];
  } else {
    const values = formatters.diary(data, user.timezone);
    message = ['deletion.selectDate.data', { date, values }];
  }


  const { buttons: navBtns } = getDiaryNavigation('deletion', dateObj, user);
  const buttons = data[0] ? [navBtns, [btnFactory.deletion.select(dateObj.format('YYYY-MM-DD'), p)]] : [navBtns];

  return { message, buttons };
};
