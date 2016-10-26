import { saveLogEvents } from '../database';

export default async ({d: savedAt}, user, p, originalMsg) => {
  let newMsg;

  if (!savedAt) {
    newMsg = `${originalMsg.text}\n\n${p.t('saveLogEvents.abort')}`;
  } else if (savedAt != user.latestDetectedData.detectedAt){
    newMsg = `${originalMsg.text}\n\n${p.t('saveLogEvents.oldData')}`;
  } else {
    const { message, error } = await saveLogEvents(user.latestDetectedData.data, user);
    newMsg = error ? error : `${originalMsg.text}\n\n${p.t(...message)}`;
  }

  return { message: newMsg };
};
