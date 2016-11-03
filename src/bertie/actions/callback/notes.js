import notesCallbacks from './notes/';

export default async ({ d: callbackData, s: subType }, user, originalMsg) => {
  const { message, buttons } = await notesCallbacks[subType](callbackData, user, originalMsg);
  return { message, buttons };
};
