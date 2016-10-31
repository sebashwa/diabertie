import deletionCallbacks from './deletion/';

export default async ({ d: callbackData, s: subType }, user, originalMsg) => {
  const { message, buttons } = await deletionCallbacks[subType](callbackData, user, originalMsg);

  return { message, buttons };
};
