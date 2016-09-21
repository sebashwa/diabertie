import { User } from '../../models';
import logger from '../../logger';

export default async (from) => {
  const telegramId = from.id;
  const name = from.first_name;

  try {
    const users = await User.find({ telegramId });

    if (!users.length) {
      await User.create({ telegramId });
      return ['bertieStart.success', { name } ];
    } else {
      return ['bertieStart.readyToGo', { name }];
    }
  } catch (e) {
    logger.error(e);
    return ['generalErrors.superWrong'];
  }
};
