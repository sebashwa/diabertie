import { User } from '../../models';
import logger from '../../logger';

export default async (telegramToken, from) => {
  const telegramId = from.id;

  try {
    const users = await User.find({ $or: [{ telegramToken }, { telegramId }] });

    if (!users.length) {
      return ['generalErrors.userNotFound'];
    } else if (users.length > 1) {
      const { email } = users.filter(u => !!u.telegramId)[0];
      return ['bertieConnect.alreadyConnected', { email } ];
    } else if (!users[0].telegramId) {
      await users[0].update({ telegramId });
      return ['bertieConnect.success', { name: from.first_name, email: users[0].email } ];
    } else {
      return ['bertieConnect.readyToGo', { email: users[0].email }];
    }
  } catch (e) {
    logger.error(e);
    return ['generalErrors.superWrong'];
  }
};
