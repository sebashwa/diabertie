import { saveLogEvents } from '../database';

export default async ({d: savedAt}, user, p, { text: original }) => {
  let newMsg;

  if (!savedAt) {
    newMsg = ['saveLogEvents.abort', { original }];
  } else if (savedAt != user.latestDetectedData.detectedAt){
    newMsg = ['saveLogEvents.oldData', { original }];
  } else {
    const { error } = await saveLogEvents(user.latestDetectedData.data, user);
    newMsg = error ? error : ['saveLogEvents.success', { original }];
  }

  return { message: newMsg };
};
