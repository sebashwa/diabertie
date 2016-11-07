import remindersCallbacks from './reminders/';

export default async ({ d: callbackData, s: subType }, user, originalMsg) => {
  const { message, buttons } = await remindersCallbacks[subType](callbackData, user, originalMsg);
  return { message, buttons };
};
