import moment from 'moment-timezone';
import polyglot from '../../../polyglot';
import { getDiaryNavigation, formatters } from '../helpers';
import { fetchLogEvents } from '../../database';
import { btnFactory } from '../../helpers';

export default async (d, user) => {
  const dateObj = moment.unix(d);
  if (!dateObj.isValid()) { return { message: ['generalErrors.superWrong'] }; };

  const { error, data } = await fetchLogEvents(user, dateObj);
  if (error) { return { message: error }; }

  const { buttons: navBtns } = getDiaryNavigation('deletion', dateObj, user);

  let message;
  let buttons;

  const date = dateObj.tz(user.timezone).format('ddd, DD.MM.YYYY');
  if (!data[0]) {
    message = ['deletion.selectDate.noData', { date }];
    buttons = [navBtns];
  } else {
    const values = formatters.diary(data, user.timezone);
    message = ['deletion.selectDate.data', { date, values }];
    buttons = [navBtns, [btnFactory.deletion.select(dateObj.unix(), polyglot(user.locale))]];
  }

  return { message, buttons };
};
