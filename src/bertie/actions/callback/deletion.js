import moment from 'moment-timezone';
import { getDiaryNavigation } from './helpers';
import { fetchLogEvents } from '../database';
import { btnFactory } from '../helpers';

export default async ({ data, subType }, user, p) => {
  const date = moment.utc(data).tz(user.timezone);
  if (!date.isValid()) { return { message: p.t('generalErrors.superWrong')}; };
  let newMsg, newBtns;

  switch (subType) {
    case 'selectDate': {
      const { message, error } = await fetchLogEvents(user, date);
      if (error) { return { message: p.t(...error) }; }
      newMsg = `${p.t('deletion.selectDate')}${message}`;

      const { buttons: navBtns } = getDiaryNavigation('deletion', date, user);
      const selectBtn = btnFactory.deletion.select(date.format('YYYY-MM-DD'), p);
      newBtns = [navBtns, [selectBtn]];

      break;
    }
    case 'selectValue': {
      const { message, error } = await fetchLogEvents(user, date, 'deletion');
      if (error) { return { message: p.t(...error) }; }
      newMsg = `${p.t('deletion.selectValue')}${message}`;

      break;
    }
  }

  return { message: newMsg, buttons: newBtns };
};
