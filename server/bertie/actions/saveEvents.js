import { User, Event } from '../../models';
import moment from 'moment-timezone';

export default async (detections, telegramId) => {
  const { date, time, values } = detections;
  const allValues = [].concat(... Object.values(values));

  try {
    const user = await User.findOne({ telegramId });
    const createdAt = moment.utc().tz(user.timezone);
    const setTimestampValues = (values, type) => {
      values.forEach((v) => createdAt.set(v, type[v]));
    };

    if(date) { setTimestampValues(['year', 'month', 'date'], date); }
    if(time) { setTimestampValues(['hour', 'minute'], time); }

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

    await Event.insertMany(events);
    return 'Cool, I saved your data';
  } catch (e) {
    console.log(e);
    return 'Oops, sorry! Something went completely wrong.. Please try again later';
  }
};
