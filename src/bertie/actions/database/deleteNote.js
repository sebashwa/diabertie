import { Note } from '../../../models';
import logger from '../../../logger';

export default async (id, user) => {
  try {
    const data = await Note.findOneAndRemove({ _id: id, user: user._id });
    return { data };
  } catch (e) {
    logger.error(e);
    return { error: ['generalErrors.superWrong'] };
  }
};
