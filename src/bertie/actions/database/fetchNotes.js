import { Note } from '../../../models';
import logger from '../../../logger';

export default async (user, date) => {
  try {
    const start = date.clone().tz(user.timezone).startOf('day');
    const end = date.clone().tz(user.timezone).endOf('day');

    const data = await Note.find({ forDate: { $lt: end, $gt: start }, user: user.id });

    return { data };
  } catch (e) {
    logger.error(e);
    return { error: ['generalErrors.superWrong'] };
  };
};
