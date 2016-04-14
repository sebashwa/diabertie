import { LogEvent } from '../../models';
import logger from '../../logger';
import { fetchUser } from '.';
import moment from 'moment-timezone';

export default async (detections, from) => {
  const { date, time, values } = detections;
  const allValues = [].concat(... Object.values(values));

  try {
    const { user, error } = await fetchUser(from);
    if (error) return error;

    const createdAt = moment.utc().tz(user.timezone);
    const setTimestampValues = (values, type) => {
      values.forEach((v) => createdAt.set(v, type[v]));
    };

    if(date) { setTimestampValues(['year', 'month', 'date'], date); }
    if(time) { setTimestampValues(['hours', 'minutes'], time); }

    const events = allValues.map((detection) => {
      const { category, type, subType, value, factor } = detection;
      const normalizedValue = factor ? Math.fround(value * factor) : value;

      return {
        category,
        createdAt,
        user:          user._id,
        unit:          type,
        value:         normalizedValue,
        originalUnit:  subType || type,
        originalValue: value,
      };
    });

    await LogEvent.insertMany(events);
    return 'Cool, I saved your data';
  } catch (e) {
    logger.error(e);
    return 'Oops, sorry! Something went completely wrong.. Please try again later';
  }
};
