import { LogEvent } from '../../../models';
import logger from '../../../logger';

export default async (selected, user, p) => {
  try {
    const logEventId = user.latestDetectedData.data[selected];
    const le = await LogEvent.findOneAndRemove({ _id: logEventId, user: user._id });

    const value = `${p.t(`icons.${le.category}`)} ${le.originalValue}`;
    const message = [ 'deletion.success', { selected, value } ];

    return { message };
  } catch (e) {
    logger.error(e);
    return { error: ['generalErrors.superWrong'] };
  }
};
