import moment from 'moment-timezone';
import polyglot from '../../../polyglot';
import { getDiaryNavigation } from '../helpers';
import { fetchNotes } from '../../database';
import { btnFactory } from '../../helpers';

export default async (d, user) => {
  const dateObj = moment.unix(d);
  if (!dateObj.isValid()) { return { message: ['generalErrors.superWrong'] }; };

  const { data, error } = await fetchNotes(user, dateObj);
  if (error) { return { message: error }; }

  const { buttons: navBtns } = getDiaryNavigation('notes', dateObj, user);

  let message;
  let buttons;

  const date = dateObj.tz(user.timezone).format('ddd, DD.MM.YYYY');
  const dUnix = dateObj.unix();
  const { addNote, delNote } = btnFactory.notes;
  const p = polyglot(user.locale);

  if (!data[0]) {
    message = ['notes.selectDate.noData', { date }];
    buttons = [navBtns, [addNote(dUnix, p)]];
  } else {
    const notes = data.map((n) => n.text).join('\n');

    message = ['notes.selectDate.data', { date, notes }];
    buttons = [navBtns, [addNote(dUnix, p), delNote(dUnix, p)]];
  }

  return { message, buttons };
};
