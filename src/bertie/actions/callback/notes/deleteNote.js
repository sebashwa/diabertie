import { deleteNote } from '../../database';

export default async ({n: selectedValue, at: deleteRequestedAt }, user, { text: original }) => {
  let message;

  if (!deleteRequestedAt) {
    message = ['notes.deleteNote.abort', { original }];
  } else if (deleteRequestedAt != user.latestDetectedData.detectedAt) {
    message = ['notes.deleteNote.oldData', { original }];
  } else {
    const id = user.latestDetectedData.data[selectedValue];
    const { error } = await deleteNote(id, user);
    message = error ? error : ['notes.deleteNote.success', { original, number: selectedValue } ];
  }

  return { message };
};
