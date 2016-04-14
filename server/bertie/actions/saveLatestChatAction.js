import { fetchUser } from '.';
import logger from '../../logger';

export default async (action, data, from) => {
  const { user, error } = await fetchUser(from);
  if (error) return { error };

  try {
    await user.update({ latestChatAction: { action, data } });
    return { user };
  } catch (e) {
    logger.error(e);
    return { error: 'Oops, sorry! Something went completely wrong.. Please try again later' };
  }
};
