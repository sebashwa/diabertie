import { btnFactory } from '../../helpers';
import polyglot from '../../../polyglot';

export default async (_, user) => {
  const p = polyglot(user.locale);

  const message = ['reminders.overview'];

  const { manageLog, manageDaily } = btnFactory.reminders;
  const buttons = [[manageLog(p)], [manageDaily(p)]];

  return { message, buttons };
};
