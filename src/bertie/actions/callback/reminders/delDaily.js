import { btnFactory } from '../../helpers';
import { localMinutes, timeStringFromMinutes } from './helpers/remindersFormatter';
import { deleteDailyReminder } from '../../database';
import polyglot from '../../../polyglot';

export default async ({ n: selectedValue, at: deleteRequestedAt }, user, { text: original }) => {
  const p = polyglot(user.locale);

  let message;

  if (!deleteRequestedAt) {
    message = ['reminders.delDaily.abort', { original }];
  } else if (deleteRequestedAt != user.latestDetectedData.detectedAt) {
    message = ['reminders.delDaily.oldData', { original }];
  } else {
    const id = user.latestDetectedData.data[selectedValue];
    const { data, error } = await deleteDailyReminder(id, user);
    const time = timeStringFromMinutes(localMinutes(data.atMinute, user.timezone));
    const value = `${time} - ${data.text}`;

    message = error ? error : ['reminders.delDaily.success', { original, selectedValue, value } ];
  }

  const buttons = [[btnFactory.reminders.back(p, 'mngDaily')]];

  return { message, buttons };
};
