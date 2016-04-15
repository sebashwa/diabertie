import { User } from '../../models';
import logger from '../../logger';

export default async (from) => {
  try {
    const user = await User.findOne({ telegramId: from.id });
    if (!user) return { error: ['generalErrors.userNotFound'] };
    return { user };
  } catch (e) {
    logger.error(e);
    return { error: ['generalErrors.superWrong'] };
  };
};
