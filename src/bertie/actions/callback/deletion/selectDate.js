import moment from 'moment-timezone';
import polyglot from '../../../polyglot';
import { getDiaryNavigation, formatters } from '../helpers';
import { fetchLogEvents } from '../../database';
import { btnFactory } from '../../helpers';

export default async (queriedDate, user) => {
  const dateObj = moment.utc(queriedDate).tz(user.timezone);
  if (!dateObj.isValid()) { return { message: ['generalErrors.superWrong'] }; };

  const { error, data } = await fetchLogEvents(user, dateObj);
  if (error) { return { message: error }; }

  const { buttons: navBtns } = getDiaryNavigation('deletion', dateObj, user);

  let message;
  let buttons;

  const date = dateObj.format('ddd, DD.MM.YYYY');
  if (!data[0]) {
    message = ['deletion.selectDate.noData', { date }];
    buttons = [navBtns];
  } else {
    const values = formatters.diary(data, user.timezone);
    message = ['deletion.selectDate.data', { date, values }];
    buttons = [navBtns, [btnFactory.deletion.select(dateObj.format('YYYY-MM-DD'), polyglot(user.locale))]];
  }

  return { message, buttons };
};
