import moment from 'moment-timezone';
import { Note } from '../../../models';

export default async (text, user) => {
  try {
    const { timezone } = user;
    const { data } = user.latestDetectedData;
    const forDate = moment.unix(data.forDate).tz(timezone).toDate();

    await Note.create({ text, user, forDate, timezone });

    return { message: ['notes.added'] };
  } catch (e) {
    console.log(e);
    return { message: ['generalErrors.superWrong'] };
  }
};
