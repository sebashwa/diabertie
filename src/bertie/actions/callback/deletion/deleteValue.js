import { deleteLogEvent } from '../../database';

export default async ({n: selectedValue, at: deleteRequestedAt }, user, p, originalMsg) => {
  let message;

  if (!deleteRequestedAt) {
    message = `${originalMsg.text}\n\n${p.t('deletion.abort')}`;
  } else if (deleteRequestedAt != user.latestDetectedData.detectedAt) {
    message = `${originalMsg.text}\n\n${p.t('deletion.oldData')}`;
  } else {
    const { message: delMsg, error } = await deleteLogEvent(selectedValue, user, p);
    message = error ? error : `${originalMsg.text}\n\n${p.t(...delMsg)}`;
  }

  return { message };
};
