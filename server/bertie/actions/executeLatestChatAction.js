import * as latestChatActions from './latestChatActions';
import { saveLatestChatAction } from '.';

export default async (user) => {
  const { latestChatAction: { action, data } } = user;

  if (!action || !data) return { message: 'Nothing to do here for me' };

  const { message, error: latestActionError } = await latestChatActions[action](data, user);
  if (latestActionError) return { error: latestActionError };

  const { error: saveLatestChatActionError } = await saveLatestChatAction(null, null, user);
  if (saveLatestChatActionError) return { error: saveLatestChatActionError };

  return { message };
};
