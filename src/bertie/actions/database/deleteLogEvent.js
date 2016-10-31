import { LogEvent } from '../../../models';
import logger from '../../../logger';

export default async (id, user) => {
  try {
    const data = await LogEvent.findOneAndRemove({ _id: id, user: user._id });
    return { data };
  } catch (e) {
    logger.error(e);
    return { error: ['generalErrors.superWrong'] };
  }
};
