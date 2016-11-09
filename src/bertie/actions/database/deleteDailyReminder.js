import { Reminder } from '../../../models';
import logger from '../../../logger';

export default async (id, user) => {
  try {
    const data = await Reminder.findOneAndRemove({ _id: id, user: user._id });
    return { data };
  } catch (e) {
    logger.error(e);
    return { error: ['generalErrors.superWrong'] };
  }
};
