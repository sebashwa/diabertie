import { LogEvent } from '../../../models';
import logger from '../../../logger';
import polyglot from '../../polyglot';
import formatters from './fetchLogEvents/formatters';

export default async (user, datum, format='diary') => {
  try {
    const p = polyglot(user.locale);
    const logEventGroups = await LogEvent.groupInInterval(datum, user);
    if (!logEventGroups[0]) { return { message: p.t('diary.noData', { datum: datum.format('ddd, DD.MM.YYYY') }) }; };
    const timezone = logEventGroups[0].logEvents[0].timezone || user.timezone;

    const valuesString = formatters[format](logEventGroups, p, timezone);
    const message = `${datum.format('ddd, DD.MM.YYYY')}\n\n${valuesString}`;

    return { message };
  } catch (e) {
    logger.error(e);
    return { error: ['generalErrors.superWrong'] };
  }
};
