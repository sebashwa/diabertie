import { User } from '../../models';
import logger from '../../logger';
import moment from 'moment-timezone';

export default async (from) => {
  const telegramId = from.id;
  const name = from.first_name;

  try {
    const users = await User.find({ telegramId });

    if (!users.length) {
      const user = await User.create({ telegramId });
      const data = { type: 'setTimezone' };
      await user.update({ latestDetectedData: { data, detectedAt: moment().unix() } });

      return ['bertieStart.success', { name } ];
    } else {
      return ['bertieStart.readyToGo', { name }];
    }
  } catch (e) {
    logger.error(e);
    return ['generalErrors.superWrong'];
  }
};
