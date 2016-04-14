import { User } from '../../models';
import logger from '../../logger';

export default async (telegramToken, from) => {
  const telegramId = from.id;

  try {
    const users = await User.find({ $or: [{ telegramToken }, { telegramId }] });

    if (!users.length) {
      return 'Oops! I was not able to find a user. Please sign up at diabertie.com first and connect from there';
    } else if (users.length > 1) {
      const connectedUser = users.filter(u => !!u.telegramId)[0];
      return `Sorry, you are already connected with the account \`${connectedUser.email}\``;
    } else if (!users[0].telegramId) {
      await users[0].update({ telegramId });
      return `Hey ${from.first_name}, I connected you with your diabertie account \`${users[0].email}\` Glad to have you on board!`;
    } else {
      return `Your account \`${users[0].email}\` is already connected. Just go ahead and log some values!`;
    }
  } catch (e) {
    logger.error(e);
    return 'Oops, sorry! Something went completely wrong.. Please try again later';
  }
};
