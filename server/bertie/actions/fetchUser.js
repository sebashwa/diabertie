import { User } from '../../models';
import logger from '../../logger';

export default async (from) => {
  try {
    const user = await User.findOne({ telegramId: from.id });
    if (!user) return { error: 'Oops! I was not able to find a user. Please sign up at diabertie.com first and connect from there' };
    return { user };
  } catch (e) {
    logger.error(e);
    return { error: 'Oops, sorry! Something went completely wrong.. Please try again later' };
  };
};
