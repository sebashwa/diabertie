import { deleteLogEvent } from '../../database';
import polyglot from '../../../polyglot';

export default async ({n: selectedValue, at: deleteRequestedAt }, user, { text: original }) => {
  let message;
  const p = polyglot();

  if (!deleteRequestedAt) {
    message = ['deletion.abort', { original }];
  } else if (deleteRequestedAt != user.latestDetectedData.detectedAt) {
    message = ['deletion.oldData', { original }];
  } else {
    const id = user.latestDetectedData.data[selectedValue];
    const { data, error } = await deleteLogEvent(id, user);
    const value = `${p.t(`icons.${data.category}`)} ${data.originalValue}`;

    message = error ? error : ['deletion.success', { original, selectedValue, value } ];
  }

  return { message };
};
