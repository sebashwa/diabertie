import { LogEvent } from '../../models';
import logger from '../../logger';
import moment from 'moment-timezone';
import polyglot from '../polyglot';

export default async (user, datum) => {
  try {
    const p = polyglot(user.locale);
    const logEventGroups = await LogEvent.groupInInterval(datum, user);
    if (!logEventGroups[0]) { return { message: p.t(['diary.noData']) }; };

    const timezone = logEventGroups[0].logEvents[0].timezone || user.timezone;

    const valuesString = logEventGroups.map((logEventGroup) => {
      const dayOfYear = logEventGroup._id.day;
      delete logEventGroup._id.day;

      const time = moment.utc(logEventGroup._id).dayOfYear(dayOfYear).tz(timezone).format('HH:mm');
      const values = logEventGroup.logEvents.
        map((logEvent) => `${p.t(`icons.${logEvent.category}`)} ${logEvent.originalValue}`).join(' ');

      return `*${time}* \n ${values}`;
    }).join('\n\n');

    const message = `${datum.format('ddd, DD.MM.YYYY')}\n\n${valuesString}`;

    return { message };
  } catch (e) {
    logger.error(e);
    return { error: ['generalErrors.superWrong'] };
  }
};
