import moment from 'moment-timezone';
import { getDiaryNavigation, formatters } from './helpers';
import { fetchNotes, fetchLogEvents } from '../database';

export default async ({ d }, user) => {
  const datum = moment.unix(d);
  if (!datum.isValid()) { return { message: ['generalErrors.superWrong'] }; };

  const { buttons } = getDiaryNavigation('navigateDiary', datum);

  const { data: logEventsData, error: logEventsError } = await fetchLogEvents(user, datum);
  if (logEventsError) { return { message: logEventsError }; }
  const { data: notesData, error: notesError } = await fetchNotes(user, datum);
  if (notesError) { return { message: notesError }; }

  const date = datum.tz(user.timezone).format('ddd, DD.MM.YYYY');
  let message;

  if (!logEventsData[0] && !notesData[0]) {
    message = ['navigateDiary.noData', { date }];
  } else {
    const logEvents = formatters.diary(logEventsData, user.timezone);
    const notes = notesData[0] ? `${notesData.map((n) => n.text).join('\n')}\n\n` : '';

    message = ['navigateDiary.data', { date, logEvents, notes }];
  }

  return {
    message,
    buttons: [ buttons ]
  };
};
