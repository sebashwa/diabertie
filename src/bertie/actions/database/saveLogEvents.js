import { LogEvent } from '../../../models';
import logger from '../../../logger';
import moment from 'moment-timezone';

export default async (detections, user) => {
  const { date, time, values } = detections;
  const allValues = [].concat(... Object.values(values));

  try {
    const createdAt = moment.utc().tz(user.timezone);
    const setTimestampValues = (values, type) => {
      values.forEach((v) => createdAt.set(v, type[v]));
    };

    if (date) { setTimestampValues(['year', 'month', 'date'], date); }
    if (time) { setTimestampValues(['hours', 'minutes'], time); }

    const events = allValues.map((detection) => {
      const { category, type, subType, value, factor } = detection;
      const normalizedValue = factor ? Math.fround(value * factor) : value;

      return {
        category,
        createdAt,
        originalUnit:  subType || type,
        originalValue: value,
        unit:          type,
        value:         normalizedValue,
        user:          user._id,
        timezone:      user.timezone,
      };
    });

    const data = await LogEvent.insertMany(events);
    const docs = data.map(d => d._doc);

    return { data: docs };
  } catch (e) {
    logger.error(e);
    return { error: ['generalErrors.superWrong'] };
  }
};
