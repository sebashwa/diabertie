import * as latestChatActions from './latestChatActions';
import { saveLatestChatAction } from '.';
import { fetchUser } from '.';

export default async (from) => {
  const { user, error: userError } = await fetchUser(from);
  if (userError) return { error: userError };

  const { latestChatAction: { action, data } } = user;

  if (!action || !data) return { message: 'Nothing to do here for me' };


  const { message, error: latestActionError } = await latestChatActions[action](data, user);
  if (latestActionError) return { error: latestActionError };

  const { error: saveLatestChatActionError } = await saveLatestChatAction(null, null, from);
  if (saveLatestChatActionError) return { error: saveLatestChatActionError };


  return { message };
};
