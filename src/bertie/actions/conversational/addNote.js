import moment from 'moment-timezone';
import logger from '../../../logger';
import { Note } from '../../../models';

export default async (text, user) => {
  try {
    const { timezone } = user;
    const { data } = user.latestDetectedData;
    const forDate = moment.unix(data.forDate).tz(timezone).toDate();

    await Note.create({ text, user, forDate, timezone });
    await user.update({ latestDetectedData: { data: null, detectedAt: null } });

    return { message: ['notes.added'] };
  } catch (e) {
    logger.error(e);
    return { message: ['generalErrors.superWrong'] };
  }
};
