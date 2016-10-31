import { LogEvent } from '../../../models';
import logger from '../../../logger';

export default async (user, datum) => {
  try {
    const logEventGroups = await LogEvent.groupInInterval(datum, user);

    return { data: logEventGroups };
  } catch (e) {
    logger.error(e);
    return { error: ['generalErrors.superWrong'] };
  }
};
