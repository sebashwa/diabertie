import { LogEvent } from '../../../models';
import logger from '../../../logger';
import moment from 'moment-timezone';
import polyglot from '../../polyglot';

export default async (datum, user) => {
  try {
    const logEventGroups = await LogEvent.groupInInterval(datum, user);
    const timezone = logEventGroups[0].logEvents[0].timezone || user.timezone;
    const p = polyglot(user.locale);

    const message = logEventGroups.map((logEventGroup) => {
      const dayOfYear = logEventGroup._id.day;
      delete logEventGroup._id.day;

      const time = moment.utc(logEventGroup._id).dayOfYear(dayOfYear).tz(timezone).format('HH:mm');
      const values = logEventGroup.logEvents.
        map((logEvent) => p.t(`logEvents.${logEvent.originalUnit}`, logEvent.originalValue)).join(', ');

      return `${time}\n${values}`
    }).join('\n\n');

    return { message }
  } catch (e) {
    logger.error(e);
    return { error: ['generalErrors.superWrong'] };
  }
};
