import logger from '../../logger';

export default async (action, data, user) => {
  try {
    await user.update({ latestChatAction: { action, data } });
    return { user };
  } catch (e) {
    logger.error(e);
    return { error: 'Oops, sorry! Something went completely wrong.. Please try again later' };
  }
};
