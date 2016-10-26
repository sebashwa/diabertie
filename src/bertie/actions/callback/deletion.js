import deletionCallbacks from './deletion/';

export default async ({ d: callbackData, s: subType }, user, p, originalMsg) => {
  const { message, buttons } = await deletionCallbacks[subType](callbackData, user, p, originalMsg);

  return { message, buttons };
};
